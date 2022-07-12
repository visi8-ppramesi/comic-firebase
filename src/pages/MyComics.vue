<template>

    <div class="h-full w-full">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1 text-white">
                <div class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5">Your Purchased Comics</div>
            </div>

            <div v-for="(comic, idx) in purchasedComics" :key="idx + '-comic'" class="md:col-span-2">
                <div class="p-3">
                    <div class="bg-slate-100 rounded border-2">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                {{ comic.purchased }}
                                <img :src="comic.cover_image_url" />
                            </div>
                        </div>
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
export default {
    data(){
        return {
            purchasedComics: [],
            count: 0,
            loaded: false
        }
    },
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
                        }, [])
                    })
                })
            })
        }
    },
}
</script>

<style scoped>

</style>