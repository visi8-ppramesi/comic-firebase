<template>
    <div class="h-screen w-full p-5 flex justify-center items-center">
        <h1 class="text-7xl text-white">
            Page Not Found
        </h1>
    </div>
</template>

<script>
const i18Texts = {
  messages: {
    en: {
        'not-found': 'Page Not Found'
    },
    id: {
        'not-found': 'Halaman Tidak Ditemukan'
    }
  }
}
export default {
    i18n: i18Texts,
}
</script>

<style scoped>

</style>