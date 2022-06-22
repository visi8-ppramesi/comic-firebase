<template>
    <div class="bg-cover bg-no-repeat bg-center overflow-y-scroll" :style="'background-image: linear-gradient(rgba(23,167,105,0.3) 50%, rgb(49 46 129)), url(' + karaBackground +');'">
        <div class="h-screen">
            <div class="w-full md:w-96 md:mx-auto min-h-screen flex flex-col p-5 justify-end">
                <div class="mb-4">
                    <input name="email" for="email" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" v-model="email" id="email" type="text" placeholder="Email">
                </div>
                <div class="pass-form">
                    <input name="password" for="password" class="shadow appearance-none border border-red rounded-full w-full py-2 px-3 text-grey-darker mb-3" v-model="password" id="password" type="password" placeholder="Password">
                </div>
                <div class="text-sm text-center text-white mb-10">
                    <router-link to="#">Forgot Password?</router-link>
                </div>
                <div v-if="loginFailed" class="text-red-400 mb-2">Wrong password or email</div>
                <div class="flex items-center justify-between">
                    <button @click="login" class="bg-green-400 w-full hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full" type="button">
                        LOG IN
                    </button>
                </div>
                <div class="text-m text-center mt-6 text-white">
                    <p>Dont have an account yet? <router-link :to="routeResolver('Register')" class="text-blue-200">Sign up</router-link></p>
                </div>
                <div class="flex flex-row items-center justify-center pt-5">
                    <img class="w-10" :src="facebookIcon" />
                    <img class="w-10" :src="instagramIcon" />
                    <img class="w-10" :src="twitterIcon" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../store/auth.js'
export default {
    name:'login',
    data(){
        return {
            email: '',
            password: '',
            loginFailed: false,
            facebookIcon: require('../assets/icons/facebook.png'),
            instagramIcon: require('../assets/icons/instagram.png'),
            twitterIcon: require('../assets/icons/twitter.png'),
            karaBackground: require('../assets/kara_bg.jpg'),
        }
    },
    inject: [
        'routeResolver',
        'emitter'
    ],
    mounted(){
        this.emitter.on('loginError', () => {
            this.loginFailed = true
            this.email = ''
            this.password = ''
        })
    },
    setup(){
        const authStore = useAuthStore()

        return {
            authStore
        }
    },
    methods:{
        loginWithGoogle(){
            this.authStore.loginWithGoogle(
                () => {
                    const fromRouteStr = localStorage.getItem('fromRoute')
                    const fromRoute = fromRouteStr ? JSON.parse(fromRouteStr) : { name: 'Dashboard' }
                    this.$router.push(fromRoute)
                },
                (err) => {
                    //error function
                    console.error(err)
                    this.loginFailed = true
                    this.email = ''
                    this.password = ''
                }
            )
        },
        login(){
            this.authStore.login(this.email, this.password, 
                () => {
                    const fromRouteStr = localStorage.getItem('fromRoute')
                    const fromRoute = fromRouteStr ? JSON.parse(fromRouteStr) : { name: 'Dashboard' }
                    this.$router.push(fromRoute)
                },
                () => {
                    //error function
                    console.log('error')
                    this.loginFailed = true
                    this.email = ''
                    this.password = ''
                }
            )
            // this.$store.dispatch('login', {
            //     email: this.email,
            //     password: this.password,
            // })
            // .then(response => {
            //     this.$router.push({ name: 'dashboard' })
            // })
            // .catch(error => {
            //     this.loginFailed = true
            // })
        },
    }
}
</script>

<style scoped>

</style>