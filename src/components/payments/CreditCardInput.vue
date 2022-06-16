<template>
    <div>Credit Card</div>
    <div class="flex flex-col">
        <input type="text" placeholder="Name" v-model="name">
        <input type="text" placeholder="Card Number" v-model="cardNumber">
    </div>
</template>

<script>
export default {
    name: 'credit-card-input',
    props: ['store'],
    data(){
        return {
            name: '',
            cardNumber: ''
        }
    },
    mounted(){
        console.log('credit card')
    },
    methods: {
        getPaymentInfo(){
            return {
                name: this.name,
                cardNumber: this.cardNumber
            }
        }
    }
}
</script>

<style scoped>

</style>