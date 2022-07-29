import router from '../../src/router/index.js'
import helpers from '../../src/utils/helpers'
import DRM from '../../src/utils/DRM.js'
import emitter from '../../src/utils/emitter.js'
import routeResolver from '../../src/utils/routeResolver';
import detectMobile from '../../src/utils/detectMobile'
import fbAnalytics from '../../src/utils/analytics.js'
import asyncComponentLoader from '../../src/utils/asyncComponentLoader.js'
import { Vue3Mq, MqResponsive } from "vue3-mq"
import Toaster from '../../src/utils/toaster.js'
import { createPinia } from 'pinia';
import VueLoading from 'vue-loading-overlay';
import { vfmPlugin } from 'vue-final-modal'
import { createI18n } from 'vue-i18n'

const locale = localStorage.getItem('locale') || 'en';
const VueI18n = createI18n({
    locale,
    fallbackLocale: 'id'
})

const vuePropertySetter = (app, name, instance) => {
    app.provide(name, instance)
    app.config.globalProperties[name] = instance
}
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
        vuePropertySetter(app, 'asyncComponentLoader', asyncComponentLoader)
        vuePropertySetter(app, '$toast', Toaster)
        vuePropertySetter(app, '$loading', {
            show: () => ({
                hide: () => {}
            }),
        })
        // app.provide('swal', Swal)
        // app.provide('emitter', emitter)
        // app.config.globalProperties.emitter = emitter
        // app.provide('DRM', DRM)
        // app.provide('helpers', helpers)
        // app.provide('routeResolver', routeResolver)
        // app.provide('qrCode', QRCode)
    }
}

export default {
    plugins: {
        vfmPlugin,
        injector,
        router,
        // VueLoading,
        VueI18n,
        Vue3Mq,
        pinia: createPinia()
    },
    components: {
        MqResponsive
    }
}