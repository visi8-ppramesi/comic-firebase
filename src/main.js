import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './index.css'
import Swal from "sweetalert2";
import helpers from './utils/helpers'
import DRM from './utils/DRM.js'
import emitter from './utils/emitter.js'
import routeResolver from './utils/routeResolver';
import { Vue3Mq, MqResponsive } from "vue3-mq"
import VueToast from 'vue-toast-notification';
import { createPinia } from 'pinia';
import 'vue-toast-notification/dist/theme-sugar.css';


const app = createApp(App)
// const emitter = mitt()
const injector = {
    install(app){
        app.provide('swal', Swal)
        app.provide('emitter', emitter)
        app.provide('DRM', DRM)
        app.provide('helpers', helpers)
        app.provide('routeResolver', routeResolver)
    }
}

app.use(injector)
app.use(router)
app.use(VueToast)
app.use(Vue3Mq, {preset: 'tailwind'})
app.use(createPinia())
app.component('mq-responsive', MqResponsive)

app.mount('#app')
