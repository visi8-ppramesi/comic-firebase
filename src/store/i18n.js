import { defineStore } from "pinia";

const selectedLocale = localStorage.getItem('locale') || 'en';

export const useI18nStore = defineStore('i18n', {
    state: () => ({
        locale: selectedLocale,
        locales: ['en', 'id']
    }),
    getters: {},
    actions: {
        changeLocale(locale){
            if(this.locales.includes(locale)){
                this.locale = locale
                localStorage.setItem('locale', locale)
                if(this._p._a._instance.proxy.$i18n?.locale){
                    this._p._a._instance.proxy.$i18n.locale = locale
                }
            }
        }
    },
})