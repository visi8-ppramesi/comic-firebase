<template>
    <div class="text-2xl font-normal leading-normal">Gopay</div>
    <div v-if="detectMobile()" class="text-md font-normal leading-normal">
        **insert instruction here**
    </div>
    <div v-else class="text-md font-normal leading-normal">Please scan the QR code with GoPay App:</div>
    <div class="flex flex-col">
        <img :src="midtransQrCode" class="max-h-screen">
    </div>
    <div class="flex w-full items-center justify-center">
        <button @click="downloadQrCode" class="disabled:bg-purple-300 disabled:text-gray-500 text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">Download QR Code</button>
    </div>
</template>

<script>
import { httpsCallable } from 'firebase/functions'
import Comic from '../../firebase/comics/Comic.js'
import fb from '../../firebase/firebase.js'
import { useAuthStore } from '../../store/auth.js'
import { mapState } from 'pinia'
export default {
    data(){
        return {
            something: '',
            midtransQrCode: null
        }
    },
    props: ['store'],
    inject: ['detectMobile'],
    computed: {
        ...mapState(useAuthStore, ['uid', 'user'])
    },
    mounted(){
        const createGopayCharge = httpsCallable(fb.functions, 'createChapterGopayCharge-createChapterGopayCharge');
        Comic.getDocument(this.store.state.comic)
            .then((cmc) => {
                const cptDetails = cmc.chapters_data.find(v => v.id == this.store.state.chapter)
                const taxRate = 0.11 //change later into settings
                const tax = this.store.state.price * taxRate
                const fee = 0 //change later into settings
                const total = this.store.state.price + tax + fee
                const param = {
                    transactionDetails: {
                        grossAmount: total,
                        tax, fee
                    },
                    itemsDetails: [{
                        chapterId: this.store.state.chapter,
                        comicId: this.store.state.comic,
                        chapterNum: cptDetails.chapter_number, 
                        comicName: cmc.title,
                        itemPrice: this.store.state.price
                    }],
                    customerDetails: {
                        userId: this.uid,
                        email: this.user.email,
                        fullName: this.user.full_name
                    }
                }
                createGopayCharge(param).then(({data}) => {
                    console.log(data)
                    this.midtransQrCode = data.actions.find(v => v.name == 'generate-qr-code').url
                    this.$emit('loading', false)
                })
            })
    },
    methods: {
        downloadQrCode(){
            window.open(this.midtransQrCode, '_blank')
        },
        getPaymentInfo(){
            return {
                something: this.something
            }
        }
    }
}
</script>

<style scoped>

</style>