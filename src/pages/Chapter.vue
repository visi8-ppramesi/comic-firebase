<template>
    <div class="w-full bg-gradient-to-t to-indigo-900 from-purple-900">
        <div class="w-full px-5 py-2 text-center">
            <label for="chapter" class="text-white">Select chapter</label>
            <div class="flex">
                <select class="rounded-lg form-select block w-full mt-1" @change="changeChapter(selectedChapter)" v-model="selectedChapter">
                    <option v-for="(chapter, idx) in chapters" :value="chapter.id" :key="'cpt-' + idx">Episode {{chapter.chapter}}</option>
                </select>
            </div>
        </div>

        <template v-for="page in pages" :key="page.index">
            <div>
                <router-link to="route('web.scene', {page: page.id})">
                    <img class="w-full lg:object-fill lg:w-full" :src="page.image_url">
                </router-link>
            </div>
        </template>

        <div class="flex justify-center mt-8 pb-5">
            <button @click="prevChapter" class="flex bg-indigo-900 h-8 w-20 text-white rounded-lg justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-1 mr-1" fill="none" viewBox="0 0 24 24" :stroke="prevEnabled ? '#919191' : '#2f2f2f'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <div class="mt-1" :class="!prevEnabled ? 'text-gray-500' : ''">Prev</div>
            </button>
            <button @click="nextChapter" class="ml-5 flex bg-indigo-900 h-8 w-20 text-white rounded-lg justify-center">
                <div class="mt-1" :class="!nextEnabled ? 'text-gray-500' : ''">Next</div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-1 ml-1" fill="none" viewBox="0 0 24 24" :stroke="nextEnabled ? '#919191' : '#2f2f2f'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import comic from "../assets/comic.jpeg";
import Chapter from '../firebase/comics/Chapter.js'
export default {
    name: 'chapter',
    data(){
        return {
            comics: comic,
            pages:[{image_url: comic}],
            chapters: [
                {image_url: comic, chapter: '1', release_date: '17/05/2022', favorites_count: '20', views: 1000},
            ]
        }
    },
    created(){
        Chapter.getDocument(['comics', this.$route.params.comicId, 'chapters'], this.$route.params.chapterId).then((cpt) => {
            cpt.getPages().then(console.log)
        })
    },
}
</script>

<style>

</style>