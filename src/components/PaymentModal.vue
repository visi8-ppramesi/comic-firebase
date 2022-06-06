<template>
    <vue-final-modal 
        v-model="showModal"
        classes="flex justify-center items-center"
        content-class="max-h-screen-4-y overflow-y-auto relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
        <stepper-component ref="stepper" :steps="steps" :initial-state="{ chapter, comic, price, selectedPayment: null }">
            <template #fatal-error="{ errorMsg }">{{ errorMsg }}</template>
            <template #action-buttons>
                <button 
                    class="text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="showModal = false"
                >Close</button>
            </template>
        </stepper-component>
    </vue-final-modal>
</template>

<script>
import StepperComponent from './stepper/StepperComponent.vue'
import StepOne from './stepper/StepOne.vue'
import StepTwo from './stepper/StepTwo.vue'
import StepThree from './stepper/StepThree.vue'
export default {
    name: 'payment-modal',
    components: {
        StepperComponent
    },
    props: [
        'chapter',
        'comic',
        'price',
    ],
    methods: {
        openModal(){
            this.showModal = true
        },
        closeModal(){
            this.$refs.stepper.resetState()
            this.showModal = false
        }
    },
    data(){
        return {
            showModal: false,
            steps: [
                {
                    name: "Step 1",
                    desc: "Select Payment Method",
                    icon: "fas fa-car",
                    disabled: false,
                    active: true,
                    component: StepOne
                },
                {
                    name: "Step 2",
                    desc: "Enter Payment Information",
                    disabled: false,
                    active: false,
                    component: StepTwo
                },
                {
                    name: "Confirm",
                    desc: "Review Payment Info",
                    icon: "fas fa-check",
                    disabled: false,
                    active: false,
                    component: StepThree,
                    confirm: "Confirm"
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>