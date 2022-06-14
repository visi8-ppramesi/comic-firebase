<template>
    <KeepAlive>
        <component 
            :store="store" 
            :is="paymentComponents[store.state.selectedPayment]" 
            ref="paymentComponent"
            @loading="loadingAction"
        ></component>
    </KeepAlive>
</template>

<script>
import CreditCard from '../payments/CreditCard.vue'
import Gopay from '../payments/Gopay.vue'
import QrCode from '../payments/QrCode.vue'
import { markRaw } from 'vue'
export default {
    name: 'step-two',
    props: ['store'],
    data(){
        return {
            paymentComponents: {
                creditCard: markRaw(CreditCard),
                gopay: markRaw(Gopay),
                qrCode: markRaw(QrCode)
            }
        }
    },
    mounted(){
        console.log(this.store)
        this.$emit('loading', true)
    },
    methods: {
        loadingAction(status){
            this.$emit('loading', status)
        }
        // nextStep(){
        //     const paymentData = this.$refs.paymentComponent.getPaymentInfo()
        //     this.store.setState('paymentData', paymentData)
        //     console.log(paymentData)
        //     return true
        // }
    }
}
</script>

<style scoped>

</style>