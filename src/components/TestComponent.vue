<template>
    <div>
        {{test}}
    </div>
</template>

<script>
export default {
    name: 'test-component',
    props: {
        test: {
            type: String,
            default: 'test'
        }
    }
}
</script>

<style scoped>

</style>