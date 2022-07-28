<template>
    <div class="h-full w-full">
        <div class="md:col-span-1 text-white">
            <div id="my-transactions-title" class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5">{{ $t("title") }}</div>
        </div>
        <table class="rounded" role="table">
            <thead role="rowgroup">
                <tr role="row">
                    <th id="my-transactions-id" role="columnheader">{{ $t("id") }}</th>
                    <th id="my-transactions-name" role="columnheader">{{ $t("name") }}</th>
                    <th id="my-transactions-description" role="columnheader">{{ $t("description") }}</th>
                    <th id="my-transactions-price" role="columnheader">{{ $t("price") }}</th>
                    <th id="my-transactions-currency" role="columnheader">{{ $t("currency") }}</th>
                    <th id="my-transactions-payment" role="columnheader">{{ $t("payment") }}</th>
                    <th id="my-transactions-transaction" role="columnheader">{{ $t("transaction") }}</th>
                </tr>
            </thead>
            <tbody v-for="item in transactions" :key="item.div" role="rowgroup">
                <tr role="row">
                    <td class="my-transaction-data-id" role="cell">{{item.id}}</td>
                    <td class="my-transaction-data-name" v-for="items in item.items" :key="items.id" role="cell">{{items.name}}</td>
                    <td class="my-transaction-data-description" v-for="items in item.items" :key="items.id" role="cell">{{items.description}}</td>
                    <td class="my-transaction-data-price" v-for="items in item.items" :key="items.id" role="cell">{{items.price}}</td>
                    <td class="my-transaction-data-currency" role="cell">{{item.notification_response.currency}}</td>
                    <td class="my-transaction-data-payment" role="cell">{{item.notification_response.payment_type}}</td>
                    <td class="my-transaction-data-transaction" role="cell">{{item.created_date.toDate().toLocaleTimeString('id-ID', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { mapState } from 'pinia'

const i18Texts = {
  messages: {
    en: {
        title: 'Your Transaction History',
        id: 'Id',
        name: 'Name',
        description: 'Description',
        price: 'Price',
        currency: 'Currency',
        payment: 'Payment',
        transaction: 'Transaction Time'
    },
    id: {
        title: 'Riwayat Transaksi Anda',
        id: 'Id',
        name: 'Nama',
        description: 'Deskripsi',
        price: 'Harga',
        currency: 'Mata Uang',
        payment: 'Tipe Pembayaran',
        transaction: 'Waktu Transaksi'
    }
  }
}
export default {
    i18n: i18Texts,
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