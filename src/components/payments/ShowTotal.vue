<template>
    <div class="flex flex-col md:flex-row">
        <template v-if="this.chapterData == 'all'">
            <img class="h-full w-full object-cover max-w-24" :src="comicData.cover_image_url" alt="">
            <div class="flex flex-col">
                <div>
                    {{this.comicData.title}}
                </div>
                <div>
                    Rp. {{this.comicData.price}}
                </div>
            </div>
        </template>
        <template v-else>
            <img class="h-full w-full object-cover max-w-24" :src="chapterData.chapter_preview_url" alt="">
            <div class="flex flex-col">
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

        </template>
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