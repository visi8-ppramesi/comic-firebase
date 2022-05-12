import { defineStore } from "pinia";
import User from "@/firebase/users/User";
import router from "@/router";

const authErrorHandler = () => {}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        uid: localStorage.getItem('uid'),
        user: null,
        error: null,
        status: {loggingIn: false}
    }),

    getters: {},

    actions: {
        async login(email, password, errorFunc = () => {}){
            this.status.loggingIn = true
            return User.login(email, password).then((cred) => {
                this.user = cred.user
                this.uid = cred.user.uid
                localStorage.setItem('uid', cred.user.uid)
                router.push('/')
                this.status.loggingIn = false
            })
            .catch((error) => {
                authErrorHandler(error)
                this.status.loggingIn = false
                this.error = error.message
                errorFunc(error)
            })
        },
        async logout(errorFunc = () => {}){
            return User.logout().then(() => {
                this.$reset()
                localStorage.removeItem('uid')
                router.push('/')
            })
            .catch((error) => {
                authErrorHandler(error)
                this.error = error.message
                errorFunc(error)
            })
        },
        async register(email, password, data, errorFunc = () => {}){
            this.status.loggingIn = true
            // eslint-disable-next-line no-unused-vars
            return User.register(email, password, data).then(({profile, cred}) => {
                this.user = cred.user
                this.uid = cred.user.uid
                localStorage.setItem('uid', cred.user.uid)
                this.status.loggingIn = false
                router.push('/')
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