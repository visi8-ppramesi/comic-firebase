import { defineStore } from "pinia";
import User from "@/firebase/users/User";

const authErrorHandler = () => {}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        uid: localStorage.getItem('uid'),
        user: null,
        error: null,
        status: {loggingIn: false},
        profile_image_url: null
    }),

    getters: {},

    actions: {
        async login(email, password, successFunc = () => {}, errorFunc = () => {}){
            this.status.loggingIn = true
            return User.login(email, password).then((user) => {
                this.uid = user.id
                user.getProfileImage().then((imageUrl) => {
                    console.log('profile')
                    this.profile_image_url = imageUrl
                })
                this.user = user.toJSON()
                localStorage.setItem('uid', user.uid)
                this.status.loggingIn = false
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
                    this.profile_image_url = imageUrl
                })
                this.user = user.toJSON()
                localStorage.setItem('uid', user.uid)
                this.status.loggingIn = false
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
                    this.user = user
                    this.uid = user.uid
                    localStorage.setItem('uid', user.uid)
                } else {
                    this.$reset()
                    localStorage.removeItem('uid')
                }
            });
        },
    }
})