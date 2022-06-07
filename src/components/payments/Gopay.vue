<template>
    <div>Gopay</div>
    <div class="flex flex-col">
        <input type="text" placeholder="Something" v-model="something">
    </div>
</template>

<script>
export default {
    data(){
        return {
            something: ''
        }
    },
    mounted(){
        console.log('gopay')
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