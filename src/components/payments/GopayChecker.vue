<template>
    <div class="text-2xl font-normal leading-normal">Payment Status</div>
    <div class="w-10 h-10 flex justify-center items-center">
        <div class="text-xl">{{status}}</div>
    </div>
    <div class="flex w-full justify-center items-center">
        <button @click="checkStatus" class="disabled:bg-purple-300 disabled:text-gray-500 text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">Check Status</button>
    </div>
</template>

<script>
import Order from '../../firebase/users/Order.js'
import { useAuthStore } from '../../store/auth.js'
import { mapState } from 'pinia'

export default{
    name: 'gopay-checker',
    props: ['store'],
    computed: {
        ...mapState(useAuthStore, ['uid', 'user'])
    },
    data(){
        return {
            status: 'Waiting payment'
        }
    },
    mounted(){
        this.$emit('disableNext')
        this.checkStatus()
    },
    methods: {
        async checkStatus(){
            const order = await Order.getDocument(['users', this.user.id, 'orders'], this.store.state.responseData.chargeResponse.order_id)
            if(!order.empty){
                switch(order.status){
                    case 'closed':
                        this.emitter.emit('chapterPurchased', [this.store.state.chapterData.id])
                        this.$emit('enableNext')
                        this.status = 'Payment successful'
                        break;
                    case 'open':
                        this.status = 'Waiting payment'
                        break;
                    default:
                        this.status = 'Payment failed'
                        break;
                }
            }
        }
    }
}
</script>

<style>

</style>