import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './index.css'
import Swal from "sweetalert2";
import helpers from './utils/helpers'
import DRM from './utils/DRM.js'
import mitt from 'mitt'
import routeResolver from './utils/routeResolver';

const app = createApp(App)
const emitter = mitt()
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

app.mount('#app')
