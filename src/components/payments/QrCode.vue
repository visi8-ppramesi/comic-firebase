<template>
    <div>Qr Code</div>
    <div class="flex flex-col">
        <input type="text" placeholder="code" v-model="code">
    </div>
</template>

<script>
export default {
    data(){
        return {
            code: ''
        }
    },
    methods: {
        getPaymentInfo(){
            return {
                code: this.code
            }
        }
    }
}
</script>

<style scoped>

</style>