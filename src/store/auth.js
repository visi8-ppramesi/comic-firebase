import { defineStore } from "pinia";
import User from "@/firebase/users/User";
import { getDoc, doc } from "firebase/firestore";  

const authErrorHandler = () => {}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        uid: localStorage.getItem('uid'),
        user: null,
        userInstance: null,
        error: null,
        status: {loggingIn: false},
        profile_picture_url: null,
        isLoggedIn: false,
    }),

    getters: {},

    actions: {
        async login(email, password, successFunc = () => {}, errorFunc = () => {}){
            this.status.loggingIn = true
            return User.login(email, password).then((user) => {
                this.uid = user.id
                user.getProfileImage().then((imageUrl) => {
                    console.log('profile')
                    this.profile_picture_url = imageUrl
                })
                this.userInstance = user
                this.user = user.toJSON()
                localStorage.setItem('uid', this.uid)
                this.status.loggingIn = false
                this.isLoggedIn = true
                successFunc()
            })
            .catch((error) => {
                authErrorHandler(error)
                this.status.loggingIn = false
                this.error = error.message
                errorFunc(error)
            })
        },
        async logout(successFunc = () => {}, errorFunc = () => {}){
            return User.logout().then(() => {
                this.$reset()
                localStorage.removeItem('uid')
                successFunc()
            })
            .catch((error) => {
                authErrorHandler(error)
                this.error = error.message
                errorFunc(error)
            })
        },
        async register(email, password, data, successFunc = () => {}, errorFunc = () => {}){
            this.status.loggingIn = true
            return User.register(email, password, data).then((user) => {
                this.uid = user.id
                user.getProfileImage().then((imageUrl) => {
                    this.profile_picture_url = imageUrl
                })
                this.userInstance = user
                this.user = user.toJSON()
                localStorage.setItem('uid', this.uid)
                this.status.loggingIn = false
                this.isLoggedIn = true
                successFunc()
            })
            .catch((error) => {
                authErrorHandler(error)
                this.error = error.message
                this.status.loggingIn = false
                errorFunc(error)
            })
        },
        authAction(){
            User.onAuthStateChanged(user => {
                if (user) {
                    const newUserDocRef = doc(User.db, 'users', user.uid)
                    getDoc(newUserDocRef).then((doc) => {
                        const newUser = new User()
                        newUser.setData(user.uid, doc.data(), newUserDocRef)
                        this.uid = newUser.id
                        newUser.getProfileImage().then((imageUrl) => {
                            this.profile_picture_url = imageUrl
                        })
                        this.userInstance = newUser
                        this.user = newUser.toJSON()
                        this.isLoggedIn = true
                        localStorage.setItem('uid', this.uid)
                    })
                    // const newUser = new User()
                    // newUser.setData(user.uid, )
                    // this.uid = user.id
                    // user.getProfileImage().then((imageUrl) => {
                    //     this.profile_picture_url = imageUrl
                    // })
                    // this.user = user.toJSON()
                    // localStorage.setItem('uid', user.uid)
                } else {
                    this.$reset()
                    localStorage.removeItem('uid')
                }
            });
        },
    }
})