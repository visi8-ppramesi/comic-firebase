<template>
    <div class="h-full w-full">
        <div class="md:col-span-1 text-white">
            <div class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5">Your Transaction History</div>
        </div>
        <table class="rounded" role="table">
            <thead role="rowgroup">
                <tr role="row">
                    <th role="columnheader">Id</th>
                    <th role="columnheader">Name</th>
                    <th role="columnheader">Description</th>
                    <th role="columnheader">Price</th>
                    <th role="columnheader">Currency</th>
                    <th role="columnheader">Payment</th>
                    <th role="columnheader">Transaction Time</th>
                </tr>
            </thead>
            <tbody v-for="item in transactions" :key="item.div" role="rowgroup">
                <tr role="row">
                    <td role="cell">{{item.id}}</td>
                    <td v-for="items in item.items" :key="items.id" role="cell">{{items.name}}</td>
                    <td v-for="items in item.items" :key="items.id" role="cell">{{items.description}}</td>
                    <td v-for="items in item.items" :key="items.id" role="cell">{{items.price}}</td>
                    <td role="cell">{{item.notification_response.currency}}</td>
                    <td role="cell">{{item.notification_response.payment_type}}</td>
                    <td role="cell">{{item.created_date.toDate().toLocaleTimeString('id-ID', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { mapState } from 'pinia'

const text = {
  en: {
    message: {
        title: 'Your Transaction History',
        id: 'Id',
        name: 'Name',
        description: 'Description',
        price: 'Price',
        currency: 'Currency',
        payment: 'Payment',
        transaction: 'Transaction Time'
    }
  }
}
export default {
    data(){
        return {
            transactions: [],
            item: {
                notification_response: {}
            }
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
@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px)  {
    table, thead, tbody, th, td, tr {
        display: block;
    }

    thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    tr {
        margin: 0.2rem 1rem 0.5rem 1rem;
    }
    
    tr:nth-child(odd) {
        background: rgb(255, 255, 255);
        border-radius: 6px;
    }

    td {
        border: none;
        position: relative;
        padding-left: 50%;
    }

    td:before {
        position: absolute;
        top: 0;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
    }

    td:nth-of-type(1):before { content: "Id"; }
    td:nth-of-type(2):before { content: "Name"; }
    td:nth-of-type(3):before { content: "Description"; }
    td:nth-of-type(4):before { content: "Price"; }
    td:nth-of-type(5):before { content: "Currency"; }
    td:nth-of-type(6):before { content: "Payment"; }
    td:nth-of-type(7):before { content: "Transaction Time"; }
}
</style>