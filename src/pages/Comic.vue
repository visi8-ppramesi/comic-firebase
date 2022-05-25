<template>
    <div v-if="!loading">
        <div class="min-h-screen-navbar bg-cover text-left pt-64 description-block text-white flex flex-col justify-end p-5 bg-center" :style="'background-image:linear-gradient(to bottom, rgba(245, 246, 252, 0), rgb(0 0 0 / 73%)), url(' + comic.cover_image_url + ');'"><!-- top block -->
            <div>
                <div>{{categories}}</div>
            </div>

            <div class="flex flex-row justify-between">
                <div class="text-2xl font-bold w-2/3">{{ comic.title }}</div>
                <!-- <button :class="{'bg-transparent ring-white ring-inset ring-2': subscribed, 'bg-green-400': !subscribed}" class="animated w-fit-content h-fit-content inline-flex items-center justify-center px-2 py-1 rounded-full text-gray-50 bg-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    Subscribe
                </button> -->
            </div>

            <div>
                <template v-for="(author, idx) in comic.authors_data" :key="'author-' + idx">
                    <div>{{author.name}}</div>
                </template>
            </div>

            <div class="text-sm" v-html="comic.description"></div>

            <div class="flex mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <div class="text-sm px-2">{{ comic.view_count }} views</div>
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <div class="text-sm px-2">{{ comic.favorite_count }}</div>
                </div>
            </div>

            <div class="flex flex-row content-center justify-between">
                <button class="text-sm mt-3 inline-flex items-center justify-center px-2 py-1 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="toggleSubscribeComic">{{ subscribed ? 'Unsubscribe' : 'Subscribe' }}</button>
                <!-- <template v-if="purchased">
                    <button class="text-sm mt-3 inline-flex items-center justify-center px-2 py-2 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="continueReading(true)">View with AR</button>
                    <button class="text-sm mt-3 inline-flex items-center justify-center px-2 py-2 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" v-if="isEmpty(bookmark)" @click="startReading">Start Reading</button>
                    <button class="text-sm mt-3 inline-flex items-center justify-center px-2 py-2 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" v-else @click="continueReading(false)">Continue Reading</button>
                </template> -->
                <template>
                    <button class="mt-3 inline-flex items-center justify-center px-2 py-1 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="openModal">Buy Comic</button>
                </template>
                <button class="mt-3 inline-flex items-center justify-center px-2 py-2 rounded-full text-gray-50 bg-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="toggleFavoriteComic">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path class="animated" :class="favorited ? 'fill-white' : 'fill-none'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="divide-y divide-black">
            <div class="flex flex-row h-20 bg-indigo-800 text-white" v-for="(chapter, idx) in chapters" :key="'chapter-'+idx">
                <div class="flex-none w-1/5 lg:w-24">
                    <img class="h-full w-full object-cover" :src="chapter.chapter_preview_url" alt="">
                </div>
                <!-- <div class="flex-grow flex flex-col p-3 w-2/5 lg:w-2" @click="goToChapter(chapter.id)"> -->
                <div class="flex-grow text-left flex flex-col py-3 pl-3 w-2/5 lg:w-2">
                    <div class="w-100">
                        <span class="text-sm">Ep. {{chapter.chapter_number}}</span>
                        <span class="text-xs ml-2">{{chapter.release_date}}</span>
                    </div>
                    <div class="flex flex-row mt-2">
                        <!-- <div class="flex flex-row">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" class="animated h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <div class="text-xs px-0.5">{{chapter.favorites_count}}</div>
                        </div> -->
                        <div class="flex flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            <div class="text-xs px-0.5">{{chapter.view_count}}</div>
                        </div>
                    </div>
                </div>

                <div class="w-2/5 flex justify-end items-center pr-5" >
                    <div v-if="!purchasedChapterIds.includes(chapter.id)">
                        <button class="text-xs items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="purchaseChapter(chapter.id)">
                            Buy Ep. {{chapter.chapter_number}}
                        </button>
                    </div>
                    <div v-else>
                        <button class="text-xs items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="goToChapter(chapter.id)">
                            Read Ep. {{chapter.chapter_number}}
                        </button>
                    </div>
                    <!-- <button @click="openModal(preview.chapter)">Buy Episode</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Comic from '@/firebase/comics/Comic';
import comic from "../assets/comic.jpeg";
import _ from 'lodash'
import { useViewStore } from '../store/view.js'
import { useAuthStore } from '../store/auth.js'
import { mapState } from 'pinia'
export default {
    name: 'comic-show',
    inject: ['routeResolver'],
    data(){
        return {
            loading: true,
            comic: {},
            genres: [
                {title: 'adventure'}
            ],
            authors: [
                {name: 'Andrew White'}
            ],
            chapters: [
                {chapter_preview_url: comic, chapter_number: '1', release_date: '17/05/2022', view_count: '20'},
            ],
            favorited: false,
            subscribed: false,
            purchasedChapterIds: [],
            // categories: ''
        }
    },
    created(){
        console.log('comic created')
        const viewStore = useViewStore()
        // const authStore = useAuthStore()
        this.fetchComic().then(() => {
            viewStore.viewComic(this.comic)
            this.loading = false
        })
        if(!_.isNil(this.userData)){
            const favComicIds = this.userData.favorites.map((comicRef) => {
                return comicRef.id
            })
            this.favorited = _.includes(favComicIds, this.$route.params.id)

            const subComicIds = this.userData.comic_subscriptions.map((comicRef) => {
                return comicRef.id
            })
            this.subscribed = _.includes(subComicIds, this.$route.params.id)

            this.userInstance.getPurchasedComicStatus(this.$route.params.id).then((cpts) => {
                this.purchasedChapterIds = [...new Set([...this.purchasedChapterIds, ...cpts.chapters.map((v) => v.id)])]
                console.log(this.purchasedChapterIds)
            })
        }
    },
    watch: {
        userData(){
            if(!_.isNil(this.userData)){
                const favComicIds = this.userData.favorites.map((comicRef) => {
                    return comicRef.id
                })
                this.favorited = _.includes(favComicIds, this.$route.params.id)

                const subComicIds = this.userData.comic_subscriptions.map((comicRef) => {
                    return comicRef.id
                })
                this.subscribed = _.includes(subComicIds, this.$route.params.id)

                this.userInstance.getPurchasedComicStatus(this.$route.params.id).then((cpt) => {
                this.purchasedChapterIds = [...new Set([...this.purchasedChapterIds, ...cpt.chapters.map((v) => v.id)])]
                    console.log(this.purchasedChapterIds)
                })
            }
        }
    },
    computed:{
        categories(){
            if(!_.isEmpty(this.comic)){
                return this.comic.categories.map(_.capitalize).join(', ')
            }else{
                return ''
            }
        },
        ...mapState(useAuthStore, {
            userData: 'user',
            userInstance: 'userInstance'
        })
    },
    methods: {
        goToChapter(chapterId){
            this.$router.push(this.routeResolver('Chapter', {comicId: this.$route.params.id, chapterId: chapterId}))
        },
        async purchaseChapter(chapterId){
            const purchase = await this.userInstance.purchaseChapter(this.$route.params.id, chapterId)
            console.log(purchase)
        },
        async toggleSubscribeComic(){
            if(this.userInstance){
                if(this.subscribed){
                    await this.userInstance.unsubscribeComic(this.$route.params.id)
                    this.subscribed = false
                }else{
                    await this.userInstance.subscribeComic(this.$route.params.id)
                    this.subscribed = true
                }
            }else{
                this.$router.push({name: 'Login'})
            }
        },
        async toggleFavoriteComic(){
            if(this.userInstance){
                if(this.favorited){
                    await this.userInstance.unfavoriteComic(this.$route.params.id)
                    this.favorited = false
                }else{
                    await this.userInstance.favoriteComic(this.$route.params.id)
                    this.favorited = true
                }
            }else{
                this.$router.push({name: 'Login'})
            }
        },
        formatChapter(cpt){
            cpt.release_date = cpt.release_date.toDate().toLocaleDateString('id-ID')
            return cpt
        },
        async fetchComic(){
            this.comic = await Comic.getDocumentWithStorageResource(this.$route.params.id, ['cover_image_url'])
            this.chapters = (await this.comic.getChaptersWithStorageResource()).map(this.formatChapter)
            this.purchasedChapterIds.push(...this.chapters.filter((cpt) => cpt.price == 0).map(cpt => cpt.id))
            return this.comic
        }
    }
}
</script>

<style>

</style>