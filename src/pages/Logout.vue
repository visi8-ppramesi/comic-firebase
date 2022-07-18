<template>
    <div>Logging out...</div>
</template>

<script>
import { useAuthStore } from '../store/auth.js'

const text = {
  en: {
    message: {
        'Logging out...'
    }
  }
}
export default {
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
