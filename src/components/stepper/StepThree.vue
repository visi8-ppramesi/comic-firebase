<template>
    <KeepAlive>
        <component 
            :store="store" 
            :is="paymentComponents[store.state.selectedPayment]" 
            ref="paymentComponent"
            @loading="loadingAction"
            @disable-next="disableNext"
            @enable-next="enableNext"
        ></component>
    </KeepAlive>
</template>

<script>
import CreditCard from '../payments/CreditCardConfirm.vue'
import Gopay from '../payments/GopayChecker.vue'
import { markRaw } from 'vue'

export default {
    name: 'step-three',
    props: ['store'],
    data(){
        return {
            paymentComponents: {
                gopay: markRaw(Gopay),
                creditCard: markRaw(CreditCard)
            }
        }
    },
    mounted(){
        switch(this.store.state.selectedPayment){
            case 'creditCard':
                this.$emit('renameNextButton', 'Charge')
                break;
            case 'gopay':
                this.$emit('renameNextButton', 'Read Comic')
                break;
            case 'qrCode':
                this.$emit('renameNextButton', 'Confirm')
                break;
        }
    },
    methods: {
        disableNext(){
            this.$emit('disableNext')
        },
        enableNext(){
            this.$emit('enableNext')
        },
    }
}
</script>

<style scoped>

</style>