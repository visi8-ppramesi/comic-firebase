<template>

    <div class="h-full w-full">
        <div>
            <div class="md:col-span-1 text-white">
                <div class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5">Your Purchased Comics</div>
            </div>

            <div class="mt-5 mx-3">
                <div class="md:grid md:grid-cols-2 md:gap-2">
                    <div v-for="(comic, idx) in purchasedComics" :key="idx + '-comic'" class="md:w-full md:h-full">
                        <router-link :to="{name: 'Comic', params: { id: comic.id}}">
                            <div class="mb-1 w-full flex flex-row h-24 md:w-full bg-white md:rounded-none rounded-md">
                                <div class="flex-none w-1/5 md:w-16 lg:w-24">
                                    <img class="h-full w-full object-cover rounded-tl-md rounded-bl-md" :src="comic.cover_image_url" alt="">
                                </div>
                                <div class="flex-grow text-left flex flex-col py-3 pl-3 w-2/5 lg:w-96">
                                    <div class="w-100">
                                        <span class="text-sm lg:text-md xl:text-lg">{{comic.title}}</span>
                                    </div>
                                    <div class="flex flex-row mt-2">
                                        <div class="mr-2 md:text-sm flex items-center justify-center">Chapter</div>
                                        <div class="flex flex-row items-center justify-center" v-for="(item, index) in comic.purchased.sort()" :key="index.id">
                                            <span class="text-md md:text-sm lg:text-xl xl:text-xl lg:mx-2 xl:mx-2 px-0.5">{{item}}</span>
                                            <span v-if="index + 1 < comic.purchased.length">, </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- centered load more button -->
            <div v-if="loaded && count >= 10" class="md:col-span-1">
                <div class="p-3 flex justify-center align-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="loadMore">Load More</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { mapState } from 'pinia'
import Comic from '@/firebase/comics/Comic.js'

const i18Texts = {
  messages: {
    en: {
        title: 'Your Purchased Comics',
        chapter: 'Chapter',
        load: 'Load More'
    },
    id: {
        title: 'Comic yang Anda Beli',
        chapter: 'Chapter',
        load: 'Load More'
    }
  }
}
export default {
    data(){
        return {
            purchasedComics: [],
            count: 0,
            loaded: false
        }
    },
    i18n: i18Texts,
    computed: {
        ...mapState(useAuthStore, ['userInstance'])
    },
    watch: {
        userInstance(){
            this.fetchPurchasedComics()
        }
    },
    mounted(){
        if(this.userInstance){
            this.fetchPurchasedComics()
        }
    },
    methods: {
        loadMore(){
            this.fetchPurchasedComics(true)
        },
        async fetchPurchasedComics(loadMore = false){
            let purchasedComics
            if(loadMore && !this.purchasedComics.length === 0){
                purchasedComics = await this.userInstance.getPurchasedComics(this.purchasedComics[this.purchasedComics.length - 1].doc)
            }else{
                purchasedComics = await this.userInstance.getPurchasedComics()
            }
            
            this.count = Object.keys(purchasedComics).length

            Object.keys(purchasedComics).forEach(key => {
                Comic.getDocumentWithStorageResourceUrl(key, ['cover_image_url']).then(comic => {
                    this.loaded = true
                    this.purchasedComics.push({
                        ...comic,
                        purchased: purchasedComics[key].reduce((acc, purchasedChapter) => {
                            if(acc === 'all' || purchasedChapter === 'all'){
                                acc = 'all'
                                return acc
                            }
                            acc.push(comic.chapters_data.find(chapter => chapter.id === purchasedChapter.id).chapter_number)
                            return acc
                        },[])
                    })
                })
            })
        }
    },
}
</script>

<style scoped>

</style>