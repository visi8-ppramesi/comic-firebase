<template>
    <div>Credit Card</div>

    <div class="flex flex-col">
        <div class="flex flex-col w-full">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Name
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" v-model="name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="cardNumber">
                    Card Number
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cardNumber" type="text" placeholder="Card Number" v-model="cardNumber">
            </div>
            <div class="flex flex-row items-end">
                <div class="mb-4 h-full basis-1/4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="expMonth">
                        Expiration Month
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expMonth" type="text" placeholder="Expiration Month" v-model="expMonth">
                </div>
                <div class="mb-4 h-full basis-1/4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="expYear">
                        Expiration Year
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expYear" type="text" placeholder="Expiration Year" v-model="expYear">
                </div>
                <div class="mb-4 h-full basis-2/4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="ccv">
                        CCV
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ccv" type="text" placeholder="CCV" v-model="ccv">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'credit-card-input',
    props: ['store'],
    data(){
        return {
            name: '',
            cardNumber: '',
            expMonth: '',
            expYear: '',
            ccv: '',
        }
    },
    mounted(){
        console.log('credit card')
    },
    methods: {
        getPaymentInfo(){
            return {
                name: this.name,
                card_number: this.cardNumber,
                card_exp_month: this.expMonth,
                card_exp_year: this.expYear,
                card_cvv: this.ccv,
            }
        }
    }
}
</script>

<style scoped>

</style>