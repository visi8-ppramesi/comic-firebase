import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './index.css'
// import Swal from "sweetalert2";
import helpers from './utils/helpers'
import DRM from './utils/DRM.js'
import emitter from './utils/emitter.js'
import routeResolver from './utils/routeResolver';
import detectMobile from './utils/detectMobile'
import fbAnalytics from './utils/analytics.js'
import extrasLoader from './utils/extrasLoader.js'
import { Vue3Mq, MqResponsive } from "vue3-mq"
import VueToast from 'vue-toast-notification';
import { createPinia } from 'pinia';
import VueLoading from 'vue-loading-overlay';
import { vfmPlugin } from 'vue-final-modal'
// import QRCode from 'qrcode'
import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue-toast-notification/dist/theme-sugar.css';
// import _ from 'lodash'
import './registerServiceWorker'

// _.mixin({
//     pipeline: function(){
//         const args = (_.isArray(arguments[0])) ? arguments[0] : arguments;
//         return function(seed){
//             return _.reduce(
//                 args,
//                 function(l,r) { return r(l); },
//                 seed
//             )
//         }
//     }
// })

const vuePropertySetter = (app, name, instance) => {
    app.provide(name, instance)
    app.config.globalProperties[name] = instance
}
const app = createApp(App)
// const emitter = mitt()
const injector = {
    install(app){
        vuePropertySetter(app, 'emitter', emitter)
        vuePropertySetter(app, 'DRM', DRM)
        vuePropertySetter(app, 'helpers', helpers)
        vuePropertySetter(app, 'routeResolver', routeResolver)
        // vuePropertySetter(app, 'qrCode', QRCode)
        vuePropertySetter(app, 'detectMobile', detectMobile)
        vuePropertySetter(app, 'fbAnalytics', fbAnalytics)
        vuePropertySetter(app, 'extrasLoader', extrasLoader)
        // app.provide('swal', Swal)
        // app.provide('emitter', emitter)
        // app.config.globalProperties.emitter = emitter
        // app.provide('DRM', DRM)
        // app.provide('helpers', helpers)
        // app.provide('routeResolver', routeResolver)
        // app.provide('qrCode', QRCode)
    }
}

app.directive('loading', (el, binding) => {
    if (binding.value || typeof binding.value === "undefined") {
        el.classList.add("state-loading");
        el.setAttribute("disabled", "disabled");
    } else {
        el.classList.remove("state-loading");
        el.removeAttribute("disabled");
    }
})

app.use(vfmPlugin)
app.use(injector)
app.use(router)
app.use(VueToast)
app.use(Vue3Mq, {preset: 'tailwind'})
app.use(VueLoading);
app.use(createPinia())
app.component('mq-responsive', MqResponsive)

app.mount('#app')

export default app