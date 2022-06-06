<template>
    <div>asdfasdf</div>
    <KeepAlive>
        <!-- <component :is="paymentComponents[store.state.selectedPayment]" ref="paymentComponent"></component> -->
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
    methods: {
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