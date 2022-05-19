<template>
    <div class="bg-cover bg-no-repeat bg-center" :style="'background-image: linear-gradient(rgba(23,167,105,0.3) 50%, rgb(49 46 129)), url(' + karaBackground +');'">
        <div class="flex items-end h-screen">
            <div class="w-full p-5">
                <form autocomplete="off">
                    <div class="mb-4">
                        <input name="username" for="username" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" v-model="username" id="username" type="text" placeholder="Username">
                    </div>
                    <div class="mb-4">
                        <input name="email" for="email" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" v-model="email" id="email" type="text" placeholder="Email">
                    </div>
                    <div class="mb-4">
                        <input name="full_name" for="full_name" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" v-model="full_name" id="full_name" type="text" placeholder="Full Name">
                    </div>
                    <div class="pass-form">
                        <input name="password" for="password" class="shadow appearance-none border border-red rounded-full w-full py-2 px-3 text-grey-darker mb-3" v-model="password" id="password" type="password" placeholder="Password">
                    </div>
                </form>
                <div class="flex flex-col items-center justify-between">
                    <button @click="register" class="bg-green-400 w-full hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full" type="button">
                        Register
                    </button>
                    <router-link :to="routeResolver('Login')" class="text-blue-200 mt-4">
                        Go Back
                    </router-link>
                </div>
                <div class="flex flex-row items-center justify-center mt-3">
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
    name: 'register',
    inject: ['routeResolver'],
    data(){
        return {
            email: '',
            password: '',
            username: '',
            full_name: '',
            loginFailed: false,
            facebookIcon: require('../assets/icons/facebook.png'),
            instagramIcon: require('../assets/icons/instagram.png'),
            twitterIcon: require('../assets/icons/twitter.png'),
            karaBackground: require('../assets/kara_bg.jpg'),
        }
    },
    setup(){
        const authStore = useAuthStore()
        return {
            authStore
        }
    },
    methods:{
        register(){
            this.authStore.register(this.email, this.password, {name: this.name, full_name: this.full_name}, 
                () => {
                    this.$router.push({ name: 'Dashboard' })
                },
                () => {
                    this.loginFailed = true
                    this.email = ''
                    this.password = ''
                    this.name = ''
                    this.full_name = ''
                })
            // this.$store.dispatch('register', {
            //     email: this.email,
            //     password: this.password,
            //     name: this.username,
            //     full_name: this.full_name
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