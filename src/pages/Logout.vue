<template>
    <div>Logging out...</div>
</template>

<script>
import { useAuthStore } from '../store/auth.js'

const i18Texts = {
  messages: {
    en: {
        log-out: 'Logging out...'
    }
  }
}

export default {
    i18n: i18Texts,
    setup(){
        const authStore = useAuthStore()

        return {
            authStore
        }
    },
    mounted() {
        this.authStore.logout(() => {
            this.$router.push({ name: 'Login' })
        }, () => {})
    }
}
</script>
