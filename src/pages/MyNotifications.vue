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
        if(this.userInstance){
            this.getNotifications().then(this.clearUnread)
        }
    },
    watch: {
        userInstance(){
            this.getNotifications().then(this.clearUnread)
        }
    },
    data(){
        return {
            notifs: []
        }
    },
    computed: {
        ...mapState(useAuthStore, ['userInstance', 'unreadCount'])
    },
    methods: {
        async getNotifications(){
            this.notifs = await this.userInstance.getNotifications()
            console.log(this.notifs)
        },
        async clearUnread(){
            if(this.unreadCount > 0 || this.notifs.filter(v => v.unread).length > 0){
                await this.userInstance.clearNotificationCount(this.notifs)
            }
        }
    }
}
</script>

<style>

</style>