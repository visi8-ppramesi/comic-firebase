<template>
    <div></div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { mapState } from 'pinia'
export default {
    data(){
        return {
            transactions: [],
        }
    },
    computed: {
        ...mapState(useAuthStore, ['userInstance'])
    },
    watch: {
        userInstance(){
            this.fetchTransactions()
        }
    },
    mounted(){
        if(this.userInstance){
            this.fetchTransactions()
        }
    },
    methods: {
        fetchTransactions(){
            this.userInstance.getOrders().then(orders => {
                this.transactions = orders
                console.log(this.transactions)
            })
        }
    }
}
</script>

<style scoped>

</style>