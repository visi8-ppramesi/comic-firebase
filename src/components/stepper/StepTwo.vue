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
import CreditCard from '../payments/CreditCardInput.vue'
import Gopay from '../payments/GopayCharger.vue'
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
        switch(this.store.state.selectedPayment){
            case 'creditCard':
                this.$emit('renameNextButton', 'Charge')
                break;
            case 'gopay':
                this.$emit('renameNextButton', 'Check Status')
                break;
            case 'qrCode':
                this.$emit('renameNextButton', 'Confirm')
                break;
        }
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