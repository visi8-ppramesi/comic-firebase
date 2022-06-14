<template>
    <div class="text-2xl font-normal leading-normal">Gopay</div>
    <div class="text-md font-normal leading-normal">Please scan the QR code with GoPay App:</div>
    <div class="flex flex-col">
        <img :src="midtransQrCode" class="max-h-screen">
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
    computed: {
        ...mapState(useAuthStore, ['uid', 'user'])
    },
    mounted(){
        const createGopayCharge = httpsCallable(fb.functions, 'createChapterGopayCharge-createChapterGopayCharge');
        Comic.getDocument(this.store.state.comic)
            .then((cmc) => {
                const cptDetails = cmc.chapters_data.find(v => v.id == this.store.state.chapter)
                const param = {
                    transactionDetails: {
                        grossAmount: this.store.state.price,
                        userId: this.uid
                    },
                    chapterDetails: {
                        chapterId: this.store.state.chapter,
                        comicId: this.store.state.comic,
                        chapterNum: cptDetails.chapter_number, 
                        comicName: cmc.title
                    },
                    customerDetails: {
                        email: this.user.email,
                        fullName: this.user.full_name
                    }
                }
                createGopayCharge(param).then(({data}) => {
                    console.log(data)
                    this.midtransQrCode = data.actions.find(v => v.name == 'generate-qr-code').url
                })
            })
    },
    methods: {
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