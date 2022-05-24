<template>
        <div class="rounded-xl m-5 bg-gray-200 bg-opacity-70 border border-indigo-600">
            <div class="flex flex-col md:flex-row p-5">
                <div>
                    <img class="w-full md:w-24 md:h-36" :src="author.profile_picture_url" />
                </div>
                <div class="mt-2 md:mt-0">
                    <div class="md:ml-4 text-2xl font-bold">
                        {{author.name}}
                    </div>
                    <div class="md:ml-4 text-lg mt-3">
                        {{author.email}}
                    </div>
                    <div class="md:ml-4">
                        <div class="mt-3 text-sm">
                            Social Media :
                        </div>
                        <div class="flex w-8">
                            <div class="w-10"></div>
                            <img class="" :src="facebookIcon" />
                            <img class="ml-5" :src="instagramIcon" />
                            <img class="ml-5" :src="twitterIcon" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-5">
                <div class="text-xl font-bold">About Author :</div>
                <div>{{author.description}}</div>
            </div>
            <div class="p-5">
                <div class="text-xl font-bold">Author Books :</div>
                <div class="mb-3">
                    <div>
                        <horizontal-slider :items="comics"
                                        :config="config"
                                        objectCategory="all"
                                        @nextPage="nextPage"></horizontal-slider>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import Author from '@/firebase/Author'
import HorizontalSlider from '../components/HorizontalSlider.vue'
import { authorComicsQuery } from '../firebase/utils/queries.js'
import Comic from '@/firebase/comics/Comic'
export default {
    name: 'author',
    components: {
        HorizontalSlider,
    },
    data() {
        return {
            author: {},
            comics: [],
            facebookIcon: require('../assets/icons/facebook.png'),
            instagramIcon: require('../assets/icons/instagram.png'),
            twitterIcon: require('../assets/icons/twitter.png'),
            shownTags: [
                'asdf',
                'lorem'
            ],
            query: {
                paginate: 5,
                page: 1
            },
            config: {
                linkName: 'Comic',
                title: 'title',
                image: 'cover_image_url',
            }
        }
    },
    created() {
        this.fetchAuthor()
        this.fetchAuthorComics()
        // this.shownTags.forEach((elem) => {
        //     this.comics[elem] = {}
        //     this.comics[elem].comics = []
        //     this.getComics(route('api.comics.list', { ...this.query, where_tag: elem }), elem)
        // })
        // this.getComics(route('api.comics.list', this.query), 'all')
        // axios.get(route('api.author.show', { author: this.$route.params.authorId }))
        //     .then((response) => {
        //         this.authors = response.data
        //     })
    },
    methods: {
        async fetchAuthor(){
            this.author = await Author.getDocumentWithStorageResource(this.$route.params.id, ['profile_picture_url'])
        },
        async fetchAuthorComics(){
            this.comics = await Comic.getDocumentsWithStorageResourceUrl(authorComicsQuery(this.$route.params.id), ['cover_image_url'])
        },
        // eslint-disable-next-line no-unused-vars
        processToHorizontalSlider(comicObjects) {
            // let retVal = []
            // comicObjects.forEach(element => {
            //     retVal.push({
            //         url: '/comic/' + element.id,
            //         cover_url: element.cover_url,
            //         title: element.title
            //     })
            // });
            // return retVal
        },
        // eslint-disable-next-line no-unused-vars
        getComics(url, category) {
            // axios.get(url)
            //     .then((response) => {
            //         if (!this.comics[category]) {
            //             this.comics[category] = {}
            //             this.comics[category].comics = response.data.data
            //         } else {
            //             this.comics[category].comics = this.comics[category].comics.concat(response.data.data)
            //         }
            //         this.comics[category].paginationData = response.data
            //         this.comics[category].prevDisabled = this.comics[category].paginationData.prev_page_url === null
            //         this.comics[category].nextDisabled = this.comics[category].paginationData.next_page_url === null
            //         this.comics[category].prevPageUrl = this.comics[category].paginationData.prev_page_url
            //         this.comics[category].nextPageUrl = this.comics[category].paginationData.next_page_url
            //     })
            //     .catch((error) => {
            //         //do error catching later
            //     })
        },
        // eslint-disable-next-line no-unused-vars
        nextPage(category) {
            // if (!this.comics[category].nextDisabled) {
            //     this.getComics(this.comics[category].nextPageUrl, category)
            // }
        },
        // eslint-disable-next-line no-unused-vars
        prevPage(category) {
        }
    }
}
</script>

<style>
</style>
