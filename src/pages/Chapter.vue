<template>
    <div class="md:mx-32 xl:mx-72 2xl:mx-xl">
        <div class="w-full">
            <div class="flex items-center pt-5 pb-3 justify-center">
                 <div class="h-96 container y mandatory-scroll-snapping">
                    <template v-for="page in pages" :key="page.index">
                        <div>
                            <router-link to="route('web.scene', {page: page.id})">
                                <img class="w-full h-full lg:object-fill lg:w-full" :src="page.image_url">
                            </router-link>
                        </div>
                    </template>
                </div>
            </div>

            <div class="w-full px-5 text-center">
                <div class="flex pb-3 pt-2">
                    <select class="rounded-lg form-select block w-full mt-1 xl:text-xl" @change="changeChapter(selectedChapter)" v-model="selectedChapter">
                        <option v-for="(chapter, idx) in chapters" :value="chapter.id" :key="'cpt-' + idx">Episode {{chapter.chapter}}</option>
                    </select>
                </div>
                <label for="chapter" class="text-white xl:text-2xl">Select chapter</label>
            </div>

            <div class="flex justify-center text-white mt-8 pb-5">
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
    </div>
</template>

<script>
import comic1 from "../assets/2.jpg";
import comic2 from "../assets/3.jpg";
import comic3 from "../assets/4.jpg";
import comic4 from "../assets/5.jpg";
import comic5 from "../assets/comic.png";
export default {
    name: 'page-show',
    data(){
        return {
            comics: comic1,
            pages:[
                {image_url: comic1},
                {image_url: comic2},
                {image_url: comic3},
                {image_url: comic4},
                {image_url: comic5},
            ],
            chapters: [
                {image_url: comic1, chapter: '1', release_date: '17/05/2022', favorites_count: '20', views: 1000},
            ]
        }
    }
}
</script>

<style>
.container {
  display: flex;
  overflow: auto;
  flex: none;
}

.container.y {
  width: 380px;
  height: 650px;
  flex-flow: column nowrap;
}

.y.mandatory-scroll-snapping {
  scroll-snap-type: y mandatory;
}

.container > div {
  text-align: center;
  scroll-snap-align: center;
  flex: none;
}

.y.container > div {
  line-height: 256px;
  font-size: 128px;
  width: 100%;
  height: 100%;
}
/* appearance fixes */
.y.container > div:first-child {
  line-height: 1.3;
  font-size: 64px;
}

@media only screen and (min-width: 768px) and (max-width: 959px){
    .container.y {
        width: 457px;
        height: 650px;
        flex-flow: column nowrap;
    }
}

@media only screen and (min-width: 1024px) and (max-width: 1240px){
    .container.y {
        width: 720px;
        height: 1000px;
        flex-flow: column nowrap;
    }
}

@media only screen and (min-width: 1440px) and (max-width: 1560px){
    .container.y {
        width: 820px;
        height: 1150px;
        flex-flow: column nowrap;
    }
}

@media only screen and (min-width: 1920px) and (max-width: 2560px){
    .container.y {
        width: 900px;
        height: 1150px;
        flex-flow: column nowrap;
    }
}

</style>