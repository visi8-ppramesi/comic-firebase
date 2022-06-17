<template>
    <KeepAlive>
        <credit-card 
            :store="store" 
            ref="creditCardInput"
            @loading="loadingAction"
        ></credit-card>
    </KeepAlive>
</template>

<script>
import CreditCard from '../../payments/creditCard/CreditCardInput.vue'
import CreditCardCharger from '../../../midtrans/CreditCard.js'
import { useAuthStore } from '@/store/auth'
import { mapState } from 'pinia'

export default {
    name: 'step-two',
    props: ['store'],
    components: {
        CreditCard
    },
    data(){
        return {
        }
    },
    computed: {
        ...mapState(useAuthStore, ['uid', 'user'])
    },
    mounted(){
        this.$emit('loading', false)
        this.$emit('renameNextButton', 'Purchase')
    },
    methods: {
        async nextStep(){
            this.$emit('loading', true)
            const ccData = this.$refs.creditCardInput.getPaymentInfo()
            const ccCharger = new CreditCardCharger(process.env.VUE_APP_MIDTRANS_CLIENT_KEY, process.env.VUE_APP_MIDTRANS_ENV)
            try{
                const { data } = await ccCharger.createCharge({
                    chapterData: this.store.state.chapterData,
                    comicData: this.store.state.comicData,
                    user: this.user
                }, ccData)
                this.store.setState('responseData', data)
                this.$emit('loading', false)
                return true
            }catch(err){
                this.$emit('loading', false)
                return false
            }
        },
        loadingAction(status){
            this.$emit('loading', status)
        }
    }
}
</script>

<style scoped>

</style>