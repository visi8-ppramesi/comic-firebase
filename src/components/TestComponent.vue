<template>
    <div>
        <div v-for="(item, idx) in items" :key="idx">
            <img :src="item" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'test-component',
    props: ['items']
}
</script>

<style scoped>

</style>