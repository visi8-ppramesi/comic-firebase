<template>
    <div class="lg:mx-20 xl:mx-32">
        <div v-if="!loading">
            <div class="md:grid md:grid-cols-2 md:rounded-b-lg shadow-md overflow-hidden">
                <div class="md:grid md:grid-cols-1">
                    <div class="min-h-screen-navbar md:min-h-screen/2 md:max-h-full bg-cover md:w-full max-h-screen text-left pt-64 description-block text-white flex flex-col justify-end p-5" :style="'background-image:linear-gradient(to bottom, rgba(245, 246, 252, 0), rgb(0 0 0 / 73%)), url(' + comic.cover_image_url + ');'"><!-- top block -->
                        <div>
                            <div id="categories" class="lg:text-md xl:text-lg">{{categories}}</div>
                        </div>

                        <div class="flex flex-row justify-between">
                            <div id="title" class="text-2xl lg:text-3xl xl:text-4xl font-bold w-2/3">{{ comic.title }}</div>
                            <!-- <button :class="{'bg-transparent ring-white ring-inset ring-2': subscribed, 'bg-green-400': !subscribed}" class="animated w-fit-content h-fit-content inline-flex items-center justify-center px-2 py-1 rounded-full text-gray-50 bg-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                Subscribe
                            </button> -->
                        </div>

                        <div>
                            <template v-for="(author, idx) in comic.authors_data" :key="'author-' + idx">
                                <router-link :to="routeResolver('Author', {id: author.id.id ?? author.id})">
                                    <div  class="lg:text-lg xl:text-xl font-semibold">{{author.name}}</div>
                                </router-link>
                            </template>
                        </div>

                        <div class="text-sm lg:text-md xl:text-lg" v-html="comic.description"></div>

                        <div class="flex mt-2">
                            <svg class="lg:h-7 lg:w-7 xl:h-8 xl:h-8" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            <div class="text-sm px-2 lg:text-md xl:text-lg">{{ $t("views", {view_count: comic.view_count}) }}</div>
                            <div class="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-7 lg:w-7 xl:h-8 xl:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <div class="text-sm px-2 lg:text-md xl:text-lg">{{ comic.favorite_count }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row content-center justify-between">
                            <div class="flex flex-row">
                                <button id="subscribe-button" :disabled="subscribeDisabled" class="lg:text-md xl:text-lg text-sm mt-3 inline-flex items-center justify-center px-2 py-1 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="toggleSubscribeComic">{{ subscribed ? 'Unsubscribe' : 'Subscribe' }}</button>
                                <button v-if="!comicFullyPurchased && !isNilWrapper(comic.price) && comic.price > 0" class="ml-1 lg:text-sm xl:text-md text-xxs mt-3 inline-flex items-center justify-center px-2 py-1 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white max-w-[125px]" @click="purchaseComic">{{ $t("purchase", {price: comic.price}) }}</button>
                            </div>
                            <!-- <template v-if="purchased">
                                <button class="text-sm mt-3 inline-flex items-center justify-center px-2 py-2 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="continueReading(true)">View with AR</button>
                                <button class="text-sm mt-3 inline-flex items-center justify-center px-2 py-2 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" v-if="isEmpty(bookmark)" @click="startReading">Start Reading</button>
                                <button class="text-sm mt-3 inline-flex items-center justify-center px-2 py-2 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" v-else @click="continueReading(false)">Continue Reading</button>
                            </template> -->
                            <template>
                                <button class="mt-3 inline-flex items-center justify-center px-2 py-1 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="openModal">{{ $t("buy") }}</button>
                            </template>
                            <button id="favorite-button" :disabled="favoriteDisabled" class="mt-3 inline-flex items-center justify-center px-2 py-2 rounded-full text-gray-50 bg-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="toggleFavoriteComic">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path class="animated" :class="favorited ? 'fill-white' : 'fill-none'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="md:grid md:grid-cols-1">
                    <div class="divide-y divide-black">
                        <div class="md:bg-indigo-900 md:w-full md:h-full">
                            <div class="flex flex-row h-24 md:w-full bg-indigo-800 text-white border-t border-[#39348f]" v-for="(chapter, idx) in chapters" :key="'chapter-'+idx">
                                <div class="flex-none w-1/5 md:w-24 lg:w-24">
                                    <img class="h-full w-full object-cover" :src="chapter.chapter_preview_url" alt="">
                                </div>
                                <!-- <div class="flex-grow flex flex-col p-3 w-2/5 lg:w-2" @click="goToChapter(chapter.id)"> -->
                                <div class="flex-grow text-left flex flex-col py-3 pl-3 w-2/5 lg:w-96">
                                    <div class="w-100">
                                        <span class="text-sm lg:text-md xl:text-lg">{{ $t("episode", {chapter_number: chapter.chapter_number}) }}</span>
                                        <span class="text-xs lg:text-md xl:text-lg ml-2">{{chapter.release_date}}</span>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-7 lg:w-7 xl:h-7 xl:w-7" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                            <div class="text-xs lg:text-xl xl:text-xl lg:mx-2 xl:mx-2 px-0.5">{{chapter.view_count}}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-2/5 md:w-36 lg:w-96 flex justify-end items-center pr-5" >
                                    <div v-if="purchasedChapterIds.includes(chapter.id) || comicFullyPurchased">
                                        <button class="read-button text-xs lg:text-lg items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="goToChapter(chapter.id)">
                                            {{ $t("read", {chapter_number: chapter.chapter_number}) }}
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button class="buy-button text-xs lg:text-md xl:text-lg items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="purchaseChapter(chapter.id)">
                                            {{ $t("buyComic", {chapter_number: chapter.chapter_number}) }}
                                        </button>
                                    </div>
                                    <!-- <button @click="openModal(preview.chapter)">Buy Episode</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-5" :class="comments.length > 0 ? 'pb-3' : 'pb-0'">
                <div v-if="isLoggedIn" class="flex mx-auto items-center mb-5 max-w-xl">
                    <div class="w-full bg-white rounded-md px-4 pt-2 drop-shadow-md">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">{{ $t("commentTitle") }}</h2>
                            <div class="w-full md:w-full px-3 mb-2 mt-2">
                                <textarea v-model="newComment" class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
                            </div>
                            <div class="w-full md:w-full flex md:w-full px-3">
                                <!-- <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                                    <svg fill="none" class="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div> -->
                                <div class="-mr-1">
                                    <input type="button" @click="submitComment" class="text-center w-40 bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="comments.length > 0" class="max-w-xl w-full mx-auto text-white text-lg lg:text-lg xl:text-xl">{{ $t("comment") }}</div>
                <div v-for="(comment, idx) in comments" :key="idx">
                    <comment-component
                        @deleteComment="onCommentDelete"
                        :commentObject="comment"
                        :allowDelete="canUserDelete(comment.user)"
                        :commentMessage="comment.message"
                        :userName="comment.user_data.name"
                        :postDate="comment.created_date"
                        :profilePicture="comment.user_data.profile_image_url"
                    />
                    <!-- <img :src="comment.user_data.profile_image_url" /> -->
                </div>
            </div>
        </div>
        <div v-else class="min-h-screen-navbar min-w-screen">

        </div>
    </div>
    <Teleport to="#modal">
        <payment-modal
            v-if="enablePaymentModal"
            ref="paymentModal"
            :chapter-data="selectedChapterData"
            :comic-data="comic"
        />
    </Teleport>
</template>

<script>
import PaymentModal from '../components/PaymentModal.vue'
import CommentComponent from '../components/Comment.vue'
import Comic from '@/firebase/comics/Comic.js';
import Comment from '@/firebase/comics/Comment.js';
import { orderByDateDesc } from '@/firebase/utils/queries.js'
// import Comment from '@/firebase/comics/Comment.js';
// import comic from "../assets/comic.jpeg";
// import _ from 'lodash'
import isNil from 'lodash/isNil'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'
import capitalize from 'lodash/capitalize'
import remove from 'lodash/remove'
import findIndex from 'lodash/findIndex'
import { useViewStore } from '../store/view.js'
import { useAuthStore } from '../store/auth.js'
import { mapState } from 'pinia'
import utils from '../firebase/utils/index.js'

const i18Texts = {
  messages: {
    en: {
        views: '{ view_count } views',
        purchase: 'Purchase Comic (Rp. {price})',
        buy: 'buy comic',
        episode: 'Ep. {chapter_number}',
        read: 'Read Ep. {chapter_number}',
        buyComic: 'Buy Ep. {chapter_number}',
        commentTitle: 'Add a new comment',
        comment: 'Comments'
    },
    id: {
        views: 'Dilihat { view_count } kali',
        purchase: 'Beli Komik sebesar (Rp. {price})',
        buy: 'beli komik',
        episode: 'Ep. {chapter_number}',
        read: 'Baca Ep. {chapter_number}',
        buyComic: 'Beli Ep. {chapter_number}',
        commentTitle: 'Tambahkan komentar',
        comment: 'Komentar'
    }
  }
}
export default {
    name: 'comic-show',
    i18n: i18Texts,
    inject: ['routeResolver'],
    components: {
        CommentComponent,
        PaymentModal
    },
    data(){
        return {
            enablePaymentModal: false,
            selectedPrice: null,
            selectedChapter: null,
            loading: true,
            comic: {},
            genres: [
                {title: 'adventure'}
            ],
            authors: [
                {name: 'Andrew White'}
            ],
            chapters: [],
            favorited: false,
            subscribed: false,
            purchasedChapterIds: [],
            comments: [],
            newComment: '',
            comicFullyPurchased: false,
            selectedChapterData: null,
            subscribeDisabled: false,
            favoriteDisabled: false
            // categories: ''
        }
    },
    created(){
        this.emitter.on('chapterPurchased', (chapters) => {
            this.purchasedChapterIds = [...new Set([...this.purchasedChapterIds, ...chapters])]
            this.enablePaymentModal = this.purchasedChapterIds.length != this.chapters.length
        })
        let loader = this.$loading.show({
            loader: 'dots'
        });
        const viewStore = useViewStore()
        // const authStore = useAuthStore()
        this.fetchComic().then(() => {
            viewStore.viewComic(this.comic)
            this.fbAnalytics.logEvent('comic_viewed', { comic_id: this.$route.params.id })
        })
        .catch((err) => {
            console.error(err)
            this.$router.push(this.routeResolver('NotFound'))
        })
        .finally(() => {
            this.loading = false
            loader.hide()
        })
        if(!isNil(this.userData)){
            const favComicIds = this.userData.favorites.map((comicRef) => {
                return comicRef.id
            })
            this.favorited = includes(favComicIds, this.$route.params.id)

            const subComicIds = this.userData.comic_subscriptions.map((comicRef) => {
                return comicRef.id
            })
            this.subscribed = includes(subComicIds, this.$route.params.id)

            this.userInstance.getPurchasedComicStatus(this.$route.params.id).then((cpts) => {
                if(cpts.chapters.includes('all')){
                    this.comicFullyPurchased = true
                    this.enablePaymentModal = false
                }else{
                    this.purchasedChapterIds = [...new Set([...this.purchasedChapterIds, ...cpts.chapters.map((v) => v.id)])]
                    this.enablePaymentModal = this.purchasedChapterIds.length != this.chapters.length
                }
            })
        }
    },
    watch: {
        userData(){
            if(!isNil(this.userData)){
                const favComicIds = this.userData.favorites.map((comicRef) => {
                    return comicRef.id
                })
                this.favorited = includes(favComicIds, this.$route.params.id)

                const subComicIds = this.userData.comic_subscriptions.map((comicRef) => {
                    return comicRef.id
                })
                this.subscribed = includes(subComicIds, this.$route.params.id)

                this.userInstance.getPurchasedComicStatus(this.$route.params.id).then((cpts) => {
                    if(cpts.chapters.includes('all')){
                        this.comicFullyPurchased = true
                        this.enablePaymentModal = false
                    }else{
                        this.purchasedChapterIds = [...new Set([...this.purchasedChapterIds, ...cpts.chapters.map((v) => v.id)])]
                        this.enablePaymentModal = this.purchasedChapterIds.length != this.chapters.length
                    }
                })
            }
        }
    },
    computed:{
        categories(){
            if(!isEmpty(this.comic)){
                return this.comic.categories.map(capitalize).join(', ')
            }else{
                return ''
            }
        },
        ...mapState(useAuthStore, {
            userData: 'user',
            userInstance: 'userInstance',
            isLoggedIn: 'isLoggedIn'
        })
    },
    methods: {
        isNilWrapper(v){
            return isNil(v)
        },
        insertPurchase(cptId){
            this.purchasedChapterIds.push(cptId)
        },
        onCommentDelete(id){
            this.comments = remove(this.comments, (comment) => {
                return comment.id != id
            })
        },
        canUserDelete(userRef){
            if(!this.userData){
                return false
            }
            return userRef.id == this.userData.id
        },
        goToChapter(chapterId){
            this.$router.push(this.routeResolver('Chapter', {comicId: this.$route.params.id, chapterId: chapterId}))
        },
        async purchaseComic(){
            if(!isNil(this.userData)){
                this.selectedChapterData = 'all'
                this.$refs.paymentModal.setState('chapterData', 'all')
                this.$refs.paymentModal.setState('comicData', this.comic)
                this.$refs.paymentModal.openModal()
            }else{
                this.$router.push(this.routeResolver('Login'))
            }
        },
        async purchaseChapter(chapterId){
            if(!isNil(this.userData)){
                this.selectedChapterData = this.chapters.find(c => c.id == chapterId)
                this.$refs.paymentModal.setState('chapterData', this.selectedChapterData)
                this.$refs.paymentModal.setState('comicData', this.comic)
                this.$refs.paymentModal.openModal()
            }else{
                this.$router.push(this.routeResolver('Login'))
            }
        },
        async toggleSubscribeComic(){
            this.subscribeDisabled = true
            if(this.userInstance){
                if(this.subscribed){
                    await this.userInstance.unsubscribeComic(this.$route.params.id)
                    this.subscribed = false
                    this.subscribeDisabled = true
                }else{
                    await this.userInstance.subscribeComic(this.$route.params.id)
                    this.subscribed = true
                    this.subscribeDisabled = true
                }
            }else{
                this.subscribeDisabled = true
                this.$router.push({name: 'Login'})
            }
        },
        async toggleFavoriteComic(){
            this.favoriteDisabled = true
            if(this.userInstance){
                if(this.favorited){
                    await this.userInstance.unfavoriteComic(this.$route.params.id)
                    this.favoriteDisabled = false
                    this.favorited = false
                    this.fbAnalytics.logEvent('comic_unfavorited', { comic_id: this.$route.params.id })
                }else{
                    console.log('unfavorited')
                    await this.userInstance.favoriteComic(this.$route.params.id)
                    this.favoriteDisabled = false
                    this.fbAnalytics.logEvent('comic_favorited', { comic_id: this.$route.params.id })
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
            this.comic = await Comic.getDocumentWithStorageResource(this.$route.params.id, ['cover_image_url'], true)
            this.comic.getComments(orderByDateDesc()).then((comments) => {
                this.comments = comments
            }).then(() => {
                let firstRun = this.comments == 0
                this.comic.createNewCommentListener((newCommInstance) => {
                    if(firstRun){
                        const foundId = findIndex(this.comments, (com) => {
                            return com.id == newCommInstance.id
                        })
                        if(foundId < 0){
                            utils.getDataUrlFromStorage(newCommInstance.user_data.profile_image_url).then((image) => {
                                newCommInstance.user_data.profile_image_url = image
                                this.comments.unshift(newCommInstance)
                            })
                        }
                    }else{
                        firstRun = true
                    }
                })
            })
            this.chapters = this.comic.chapters_data.map(this.formatChapter)//(await this.comic.getChaptersWithStorageResource()).map(this.formatChapter)
                .sort((a, b) => {
                    if(a.chapter_number > b.chapter_number){
                        return 1
                    }
                    if(a.chapter_number < b.chapter_number){
                        return -1
                    }
                    return 0
                })
            // for(let i = 0; i < tempChapters.length; i++){
            //     tempChapters[i].chapter_preview_url = await utils.getDataUrlFromStorage(tempChapters[i].chapter_preview_url)
            //     this.chapters.push(tempChapters[i])
            // }

            this.purchasedChapterIds.push(...this.chapters.filter((cpt) => cpt.price == 0).map(cpt => cpt.id))
            return this.comic
        },
        async submitComment(){
            await Comment.addComment(this.$route.params.id, this.newComment, this.userData)
            this.newComment = ''
        }
    }
}
</script>

<style>

</style>