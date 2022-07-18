<template>
    <div class="bg-cover bg-no-repeat bg-center overflow-y-scroll" :style="'background-image: linear-gradient(rgba(23,167,105,0.3) 50%, rgb(49 46 129)), url(' + karaBackground +');'">
        <div class="h-screen">
            <div class="w-full md:w-96 md:mx-auto min-h-screen flex flex-col p-5 justify-end">
                <div class="mb-4">
                    <input name="email" for="email" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" v-model="email" id="email" type="text" placeholder="Email">
                </div>
                <div class="pass-form">
                    <input @keyup.enter="login" name="password" for="password" class="shadow appearance-none border border-red rounded-full w-full py-2 px-3 text-grey-darker mb-3" v-model="password" id="password" type="password" placeholder="Password">
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
                <div class="strike mt-4">
                    <span class="text-m text-white">Or Login With</span>
                </div>
                <div class="flex flex-row items-center justify-center pt-5">
                    <img class="w-10" :src="googleIcon" @click="loginWithGoogle" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../store/auth.js'

const i18Texts = {
  en: {
    message: {
      forgot: 'Forgot Password?',
      wrong: 'Wrong password or email',
      login: 'Log In',
      account: 'Dont have an account yet?',
      signup: 'Sign Up',
      option: 'Or Login With'
    }
  }
}
export default {
    name:'login',
    i18n: i18Texts,
    data(){
        return {
            email: '',
            password: '',
            loginFailed: false,
            facebookIcon: require('../assets/icons/facebook.png'),
            instagramIcon: require('../assets/icons/instagram.png'),
            twitterIcon: require('../assets/icons/twitter.png'),
            googleIcon: require('../assets/icons/google.png'),
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
.strike {
    display: block;
    text-align: center;
    overflow: hidden;
    white-space: nowrap; 
}

.strike > span {
    position: relative;
    display: inline-block;
}

.strike > span:before,
.strike > span:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 9999px;
    height: 1px;
    background: white;
}

.strike > span:before {
    right: 100%;
    margin-right: 15px;
}

.strike > span:after {
    left: 100%;
    margin-left: 15px;
}
</style>