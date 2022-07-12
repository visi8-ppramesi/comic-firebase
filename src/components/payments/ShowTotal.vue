<template>
    <div class="flex flex-col md:flex-row">
        <img class="h-full w-full object-cover max-w-24" :src="chapterData.chapter_preview_url" alt="">
        <div v-if="this.chapterData == 'all'" class="flex flex-col">
            <div>
                {{this.comicData.title}}
            </div>
            <div>
                Rp. {{this.comicData.price}}
            </div>
        </div>
        <div v-else class="flex flex-col">
            <div>
                {{this.comicData.title}}
            </div>
            <div>
                Chapter {{this.chapterData.chapter_number}}
            </div>
            <div>
                Rp. {{this.chapterData.price}}
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'show-total',
    props: [
        'comicData',
        'chapterData'
    ],
    mounted(){
        console.log([this.comicData, this.chapterData])
    }
}
</script>

<style>

</style>