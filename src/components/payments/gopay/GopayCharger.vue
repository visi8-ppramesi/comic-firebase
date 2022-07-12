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
import GopayCharger from '../../../midtrans/Gopay.js'
// import Comic from '../../firebase/comics/Comic.js'
import { useAuthStore } from '../../../store/auth.js'
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
        console.log('testestest')
        const gopayCharger = new GopayCharger(process.env.VUE_APP_MIDTRANS_CLIENT_KEY, process.env.VUE_APP_MIDTRANS_ENV)
        gopayCharger.createChapterCharge({
            chapterData: this.store.state.chapterData,
            comicData: this.store.state.comicData,
            user: this.user
        }).then(({data}) => {
            this.midtransQrCode = data.chargeResponse.actions.find(v => v.name == 'generate-qr-code').url
            this.store.setState('responseData', data)
            this.$emit('loading', false)
        }).catch((err) => {
            this.$emit('loading', false)
            console.error(err)
            this.$toast.open({
                message: "Create charge error",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
        })

        // const createGopayCharge = httpsCallable(fb.functions, 'createChapterGopayCharge-createChapterGopayCharge');
        // /*
        //     chapterData
        //     comicData
        //     user
        // */
        // const cptDetails = this.store.state.chapterData//cmc.chapters_data.find(v => v.id == this.store.state.chapter)
        // const taxRate = 0.11 //change later into settings
        // const tax = Math.round(this.store.state.price * taxRate)
        // const fee = 0 //change later into settings
        // const total = Math.round(this.store.state.price + tax + fee)
        // const param = {
        //     transactionDetails: {
        //         grossAmount: total,
        //         tax, fee
        //     },
        //     itemsDetails: [{
        //         chapterId: this.store.state.chapter,
        //         comicId: this.store.state.comic,
        //         chapterNum: cptDetails.chapter_number, 
        //         comicName: this.store.state.comicData.title,
        //         itemPrice: this.store.state.price
        //     }],
        //     customerDetails: {
        //         userId: this.uid,
        //         email: this.user.email,
        //         fullName: this.user.full_name
        //     }
        // }
        // createGopayCharge(param).then(({data}) => {
        //     this.midtransQrCode = data.chargeResponse.actions.find(v => v.name == 'generate-qr-code').url
        //     this.$emit('loading', false)
        // }).catch((err) => {
        //     this.$emit('loading', false)
        //     console.error(err)
        //     this.$toast.open({
        //         message: "Create charge error",
        //         type: "error",
        //         duration: 5000,
        //         dismissible: true,
        //         position: 'bottom'
        //     })
        // })
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