<template>
    <div class="h-full w-full px-3 pt-3">

    </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { mapState } from 'pinia'
export default{
    name: 'my-notifications',
    mounted(){
        this.userInstance.getNotifications().then(console.log)
    },
    computed: {
        ...mapState(useAuthStore, ['userInstance'])
    },
}
</script>

<style>

</style>