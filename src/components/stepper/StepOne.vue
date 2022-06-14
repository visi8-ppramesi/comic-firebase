<template>
    <div>Please select your payment method:</div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div class="p-4 mb-4 bg-slate-100/50 rounded-lg mx-auto flex flex-col justify-center justify-items-center content-center items-center">
            <label class="label-container flex gopay" for="gopay">
                <img :src="gopay" class="w-full h-fit">
            </label>
            <input id="gopay-selector" v-model="selectedPayment" @change="paymentChange" type="radio" name="credit-card" class="group mt-auto" value="gopay" />
        </div>
        <div class="p-4 mb-4 bg-slate-100/50 rounded-lg mx-auto flex flex-col justify-center justify-items-center content-center items-center">
            <label class="label-container flex qrcode" for="qrcode">
                <img :src="qrcodeImage" class="w-full h-fit">
            </label>
            <input id="qrcode-selector" v-model="selectedPayment" @change="paymentChange" type="radio" name="credit-card" class="group mt-auto" value="qrCode" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'step-one',
    props: ['store'],
    data(){
        return {
            selectedPayment: null,
            gopay: require('../../assets/icons/gopay.svg'),
            qrcodeImage: require('../../assets/icons/qris.png'),
        }
    },
    methods: {
        paymentChange(){
            if(this.selectedPayment){
                console.log('payment enabled')
                this.$emit('enableNext')
            }else{
                console.log('payment disabled')
                this.$emit('disableNext')
            }
        },
        nextStep(){
            this.store.setState('selectedPayment', this.selectedPayment)
            return true
        }
    }
}
</script>

<style scoped>
.label-container{
    min-height: calc(100% - 20px);
}
</style>