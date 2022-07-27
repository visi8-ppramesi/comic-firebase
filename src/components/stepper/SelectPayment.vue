<template>
    <div id="select-payment-title">Please select your payment method:</div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div class="p-4 mb-4 bg-slate-100/50 rounded-lg mx-auto flex flex-col justify-center justify-items-center content-center items-center">
            <label class="label-container flex gopay" for="gopay">
                <img :src="gopay" class="w-full h-fit">
            </label>
            <input id="gopay-selector" v-model="selectedPayment" @change="paymentChange" type="radio" name="payment" class="group mt-auto" value="gopay" />
        </div>
        <!-- <div class="p-4 mb-4 bg-slate-100/50 rounded-lg mx-auto flex flex-col justify-center justify-items-center content-center items-center">
            <label class="label-container flex qrcode" for="qrcode">
                <img :src="qrcodeImage" class="w-full h-fit">
            </label>
            <input id="qrcode-selector" v-model="selectedPayment" @change="paymentChange" type="radio" name="payment" class="group mt-auto" value="qrCode" />
        </div> -->
        <div class="p-4 mb-4 bg-slate-100/50 rounded-lg mx-auto flex flex-col justify-center justify-items-center content-center items-center">
            <label class="label-container flex qrcode" for="qrcode">
                <img :src="cc" class="w-full h-fit">
            </label>
            <input id="qrcode-selector" v-model="selectedPayment" @change="paymentChange" type="radio" name="payment" class="group mt-auto" value="cc" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'step-one',
    props: ['store'],
    emits: ['changePayment'],
    data(){
        return {
            selectedPayment: 'gopay',
            gopay: require('../../assets/icons/gopay.svg'),
            qrcodeImage: require('../../assets/icons/qris.png'),
            cc: require('../../assets/icons/cc.png'),
        }
    },
    methods: {
        paymentChange(){
            this.$emit('changePayment', this.selectedPayment)
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