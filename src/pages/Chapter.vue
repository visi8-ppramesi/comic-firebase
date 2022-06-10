<template>
    <div v-if="!loading" class="md:mx-32 xl:mx-72 2xl:mx-xl">
        <div class="w-full">
            <div class="bg-black w-full">
                <template v-for="(page, idx) in pages" :key="'item-' + idx">
                    <div v-if="page.media_type == 'image'">
                        <image-viewer :link="page.page_image_url" :idx="idx" :ref="'mediaViewer' + idx"></image-viewer>
                    </div>
                    <div v-else-if="page.media_type == 'video'">
                        <video-player 
                            :show-ar-button-timing="page.ar_button_show_time"
                            :ar-link="getArLink(page)"
                            :link="page.page_image_url"
                            :idx="idx"
                            :ref="'mediaViewer' + idx"
                            @playClicked="playClicked"
                        ></video-player>
                    </div>
                </template>
            </div>
            <!-- <div class="flex items-center pt-5 pb-3 justify-center">
                 <div class="container y mandatory-scroll-snapping">
                    <template v-for="(page, idx) in pages" :key="'item-' + idx">
                        <div v-if="page.media_type == 'image'">
                            <router-link :to="routeResolver('Scene', {page: page.id})">
                                <img class="w-full h-full lg:object-fill lg:w-full" :src="page.image_url">
                            </router-link>
                        </div>
                        <div v-else-if="page.media_type == 'video'">
                            <video-player :link="page.page_image_url" :idx="idx" :ref="'videoPlayer' + idx" :key="'video-' + idx"></video-player>
                        </div>
                    </template>
                </div>
            </div> -->

            <div class="w-full px-5 text-center">
                <div class="flex pb-3 pt-2">
                    <select class="rounded-lg form-select block w-full mt-1 xl:text-xl" @change="changeChapter(selectedChapter)" v-model="selectedChapter">
                        <option v-for="(chapter, idx) in chapters" :value="chapter.id" :key="'cpt-' + idx">Episode {{chapter.chapter_number}}</option>
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
    <div v-else class="min-h-screen-navbar min-w-screen">

    </div>
</template>

<script>

// import comic1 from "../assets/2.jpg";
// import comic2 from "../assets/3.jpg";
// import comic3 from "../assets/4.jpg";
// import comic4 from "../assets/5.jpg";
// import comic5 from "../assets/comic.png";
import Chapter from '../firebase/comics/Chapter.js'
import VideoPlayer from '../components/VideoPlayer.vue'
import ImageViewer from '../components/ImageViewer.vue'
import { orderBy } from 'firebase/firestore'
import { useViewStore } from '../store/view.js'
import _ from 'lodash'
import Comic from '@/firebase/comics/Comic';

export default {
    name: 'chapter',
    inject: ['routeResolver'],
    components: {
        ImageViewer,
        VideoPlayer
    },
    data(){
        return {
            prevEnabled: true,
            nextEnabled: true,
            loading: true,
            comic: null,
            // pages:[
            //     {image_url: comic1},
            //     {image_url: comic2},
            //     {image_url: comic3},
            //     {image_url: comic4},
            //     {image_url: comic5},
            // ],
            chapters: [],
            chapter: null,
            pages: [],
            chapterPromise: null,
            scrollFunc: null,
            selectedChapter: null
        }
    },
    watch: {
        comic(){
            this.chapters = this.comic.chapters_data.sort((a, b) => {
                if(a.chapter_number < b.chapter_number){
                    return -1
                }else if(a.chapter_number > b.chapter_number){
                    return 1
                }

                return 0
            })

            const findCpt = this.chapters.findIndex((cpt) => cpt.id == this.$route.params.chapterId)
            if(findCpt == 0){
                this.prevEnabled = false
            }
            if(findCpt == this.chapters.length - 1){
                this.nextEnabled = false
            }
        }
    },
    created(){
        const viewStore = useViewStore()
        this.chapterPromise = this.fetchChapter().then(() => {
            viewStore.viewChapter(this.chapter)
            this.loading = false
            return true
        })
        .catch((err) => {
            console.error(err)
            this.$router.push(this.routeResolver('NotFound'))
        })
    },
    mounted(){
        let loader = this.$loading.show({
            loader: 'dots'
        });
        this.selectedChapter = this.$route.params.chapterId
        this.chapterPromise.then(() => {
            const loaders = []
            Object.keys(this.$refs).forEach((el) => {
                loaders.push(this.$refs[el][0].getLoader())
            })
            

            const pagesDupe = [...this.pages]
            pagesDupe.pop()

            pagesDupe.forEach((page, idx) => {
                if(page.media_type == 'video'){
                    const containerIndex = 'mediaViewer' + (idx + 1)
                    const play = _.once(this.$refs[containerIndex][0].playVideo)
                    loaders[idx].elem.addEventListener('ended', () => {
                        loaders[idx + 1].loader()
                        loaders[idx + 1].scroller()
                        play()
                    })
                }
            })

            loaders[0].loader()
            loaders[0].scroller()

            this.scrollFunc = () => {
                _.debounce(() => {
                    for(let i = 1; i < this.pages.length; i++){
                        const containerIndex = 'mediaViewer' + i
                        const myRect = this.$refs[containerIndex][0].$el.getBoundingClientRect()
                        if(myRect.top - window.innerHeight < 1){
                            loaders[i].loader()
                        }
                        // if(!_.isEmpty(this.$refs[containerIndex][0])){
                        // }
                    }
                }, 100)()
            }

            document.addEventListener('scroll', this.scrollFunc)
            
            loader.hide()
        })
        .catch(() => {
            loader.hide()
        })
    },
    beforeUnmount(){
        if(this.scrollFunc){
            document.removeEventListener('scroll', this.scrollFunc)
        }
    },
    methods: {
        playClicked(idx){
            console.log(idx)
            this.pages.forEach((page, pIdx) => {
                if(page.media_type == 'video' && idx !== pIdx){
                    const containerIndex = 'mediaViewer' + pIdx
                    this.$refs[containerIndex][0].pauseVideo()
                }
            })
        },
        getArLink(page){
            if(_.isArray(page.scenes_data)){
                const routeResolved = this.routeResolver('Scene', {
                    comicId: this.$route.params.comicId,
                    chapterId: this.$route.params.chapterId,
                    pageId: page.id,
                    sceneId: page.scenes_data[0]
                })
                return routeResolved
            }else{
                return {}
            }
        },
        changeChapter(chapterId){
            this.$router.push(this.routeResolver('Chapter', {comicId: this.$route.params.comicId, chapterId: chapterId}))
        },
        prevChapter(){
            const findCpt = this.chapters.findIndex((cpt) => cpt.id == this.$route.params.chapterId)
            const prevCpt = this.chapters[findCpt - 1]
            this.$router.push(this.routeResolver('Chapter', {comicId: this.$route.params.comicId, chapterId: prevCpt.id}))
        },
        nextChapter(){
            const findCpt = this.chapters.findIndex((cpt) => cpt.id == this.$route.params.chapterId)
            const nextCpt = this.chapters[findCpt + 1]
            this.$router.push(this.routeResolver('Chapter', {comicId: this.$route.params.comicId, chapterId: nextCpt.id}))
        },
        async fetchChapter(){
            this.chapter = await Chapter.getDocument(['comics', this.$route.params.comicId, 'chapters'], this.$route.params.chapterId)
            this.comic = await Comic.getDocument(this.$route.params.comicId)
            this.pages = await this.chapter.getPages([orderBy('page_number')])
            return true
        }
    }
}
</script>

<style>
.container {
    display: flex;
    overflow-y: auto;
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