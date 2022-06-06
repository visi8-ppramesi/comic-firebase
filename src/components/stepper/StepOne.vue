<template>
    <div>
        asdfasdf asdfasd asdfadsf asdfasdf
        <select v-model="selectedPayment">
            <option></option>
            <option value="gopay">Gopay</option>
            <option value="creditCard">Credit Card</option>
            <option value="qrCode">QR Code</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'step-one',
    props: ['store'],
    data(){
        return {
            selectedPayment: null,
        }
    },
    methods: {
        paymentChange(){
            // if(this.selectedPayment){
            //     this.$emit('loadingAction', false)
            // }else{
            //     this.$emit('loadingAction', true)
            // }
        },
        nextStep(){
            // this.store.setState('selectedPayment', this.selectedPayment)
            return true
        }
    }
}
</script>

<style scoped>

</style>