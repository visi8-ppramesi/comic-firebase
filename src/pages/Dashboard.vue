<template>
<div class="pa-2 w-full">
        <div class="flex flex-col justify-end items-center bg-blue-100 w-150 h-40 featured-block w-full h-screen-navbar sm:h-96">
            <banner
                :banners="banners"
            ></banner>
        </div>
        <div v-if="!karaOnly" class="text-white bg-gradient-to-t to-indigo-900 from-purple-900">
            <div class="px-5 py-5">
                <div class="mb-3">
                    <div class="flex items-center justify-between mb-2">
                        <div>All Comics</div>
                        <div><router-link :to="routeResolver('Comics', {}, {category: 'all'})" class="text-blue-200">Show More</router-link></div>
                    </div>
                    <mq-responsive target="sm-" tag="span">
                        <horizontal-slider :items="comics" :config="comicConfig" />
                    </mq-responsive>
                    <mq-responsive target="md+" tag="span">
                        <grid :showLoading="false" ref="allGrid" :items="comics" :config="comicConfig" />
                    </mq-responsive>
                </div>
            </div>

            <div class="px-5 py-5">
                <div class="mb-3">
                    <div class="flex items-center justify-between mb-2">
                        <div>Adventure</div>
                        <div><router-link :to="routeResolver('Comics', {}, {category: 'adventure'})" class="text-blue-200">Show More</router-link></div>
                    </div>
                    <mq-responsive target="sm-" tag="span">
                        <horizontal-slider :items="comics" :config="comicConfig" />
                    </mq-responsive>
                    <mq-responsive target="md+" tag="span">
                        <grid :showLoading="false" ref="adventureGrid" :items="comics" :config="comicConfig" />
                    </mq-responsive>
                </div>
            </div>

            <div class="px-5 py-5">
                <div class="mb-3">
                    <div class="flex items-center justify-between mb-2">
                        <div>Science Fiction</div>
                        <div><router-link :to="routeResolver('Comics', {}, {category: 'scifi'})" class="text-blue-200">Show More</router-link></div>
                    </div>
                    <mq-responsive target="sm-" tag="span">
                        <horizontal-slider :items="comics" :config="comicConfig" />
                    </mq-responsive>
                    <mq-responsive target="md+" tag="span">
                        <grid :showLoading="false" ref="scifiGrid" :items="comics" :config="comicConfig" />
                    </mq-responsive>
                </div>
            </div>

            <div class="px-5 py-5">
                <div class="mb-3">
                    <div class="flex items-center justify-between mb-2">
                        <div>Authors</div>
                        <div><router-link :to="routeResolver('Authors', {}, {category: 'all'})" class="text-blue-200">Show More</router-link></div>
                    </div>
                    <mq-responsive target="sm-" tag="span">
                        <horizontal-slider :items="authors" :config="authorConfig"/>
                    </mq-responsive>
                    <mq-responsive target="md+" tag="span">
                        <grid :showLoading="false" ref="authorGrid" :items="authors" :config="authorConfig" />
                    </mq-responsive>
                </div>
            </div>
        </div>
    </div>
        <!-- <div class="pa-2 w-full">
            <div class="flex flex-col justify-end items-center bg-blue-100 w-150 h-40 featured-block w-full h-screen-navbar sm:h-96">
                <banner
                    :banners="banners"
                ></banner>
            </div>
            <div v-if="false" class="flex flex-col justify-end items-center bg-blue-100 w-150 h-40 pb-8 featured-block" style="background-image: linear-gradient(rgba(245, 246, 252, 0) 50%, rgb(49 46 129)), url(/storage/media/covers/kara.jpg);">
                <banner
                    class="w-12"
                    :banners="banners"
                ></banner>
                <div class="mb-6 text-white">
                    <img class="w-64" :src="karaIcon.default" />
                    <div class="mb-6 text-white">
                        <div class="text-center text-base subsubtitle">Adventure, Teen, Magical</div>
                    </div>
                </div>
            </div>
            <div class="px-5 py-5 bg-gradient-to-t  to-indigo-900 from-purple-900">
                <div class="mb-3 text-white">
                    <div>
                        <Link class="text-white float-right" :href="route('web.comics', {type: 'newest'})">More</Link>
                        <div>New Releases</div>
                    </div>
                    <mq-responsive target="sm-" tag="span">
                        <div>
                            <horizontal-slider
                                :items="processToHorizontalSlider(comics.all)"
                                :config="config"
                                objectCategory="all"
                                @nextPage="nextPage"
                            ></horizontal-slider>
                        </div>
                    </mq-responsive>
                    <mq-responsive target="md+" tag="span">
                        <div>
                            <grid
                                :items="processToHorizontalSlider(comics.all)"
                                :config="config"
                                objectCategory="all"
                                @nextPage="nextPage"
                            ></grid>
                        </div>
                    </mq-responsive>
                </div>
                <div class="mb-3 text-white">
                    <div>
                        <Link class="text-white float-right" :href="route('web.comics', {type: 'popular'})">More</Link>
                        <div>Popular</div>
                    </div>
                    <mq-responsive target="sm-" tag="span">
                        <div>
                            <horizontal-slider
                                :items="processToHorizontalSlider(comics.popular)"
                                :config="config"
                                objectCategory="popular"
                                @nextPage="nextPage"
                            ></horizontal-slider>
                        </div>
                    </mq-responsive>
                    <mq-responsive target="md+" tag="span">
                        <div>
                            <grid
                                :items="processToHorizontalSlider(comics.popular)"
                                :config="config"
                                objectCategory="popular"
                                @nextPage="nextPage"
                            ></grid>
                        </div>
                    </mq-responsive>
                </div>
                <div class="mb-3 text-white">
                    <div>
                        <Link class="text-white float-right" :href="route('web.comics', {type: 'recommended'})">More</Link>
                        <div>Recommended for you</div>
                    </div>
                    <mq-responsive target="sm-" tag="span">
                        <div>
                            <horizontal-slider
                                :items="processToHorizontalSlider(comics.recommended)"
                                :config="config"
                                objectCategory="recommended"
                                @nextPage="nextPage"
                            ></horizontal-slider>
                        </div>
                    </mq-responsive>
                    <mq-responsive target="md+" tag="span">
                        <div>
                            <grid
                                :items="processToHorizontalSlider(comics.recommended)"
                                :config="config"
                                objectCategory="recommended"
                                @nextPage="nextPage"
                            ></grid>
                        </div>
                    </mq-responsive>
                </div>
                <div class="mb-3 text-white" v-for="(tag, idx) in shownTags" :key="'tag-' + idx">
                    <div>
                        <Link class="text-white float-right" :href="route('web.comics', {type: 'tag', value: tag.toLowerCase()})">More</Link>
                        <div>{{tag}}</div>
                    </div>
                    <mq-responsive target="sm-" tag="span">
                        <div>
                            <horizontal-slider
                                :items="processToHorizontalSlider(comics[tag])"
                                :config="config"
                                :objectCategory="tag"
                                @nextPage="nextPage"
                            ></horizontal-slider>
                        </div>
                    </mq-responsive>
                    <mq-responsive target="md+" tag="span">
                        <div>
                            <grid
                                :items="processToHorizontalSlider(comics[tag])"
                                :config="config"
                                :objectCategory="tag"
                                @nextPage="nextPage"
                            ></grid>
                        </div>
                    </mq-responsive>
                </div>
            </div>
            <div class="px-5 py-5 bg-gray-100">
                <div class="mb-3">
                    <div>
                        <div class="float-right">Show More</div>
                        <div>Authors</div>
                    </div>
                    <mq-responsive target="sm-" tag="span">
                        <div>
                            <horizontal-slider
                                :items="processToAuthorHorizontalSlider(authors.all)"
                                :config="configAuthor"
                                objectCategory="all"
                                @nextPage="nextAuthorPage"
                            ></horizontal-slider>
                        </div>
                    </mq-responsive>
                    <mq-responsive target="md+" tag="span">
                        <div>
                            <grid
                                :items="processToAuthorHorizontalSlider(authors.all)"
                                :config="configAuthor"
                                objectCategory="all"
                                @nextPage="nextAuthorPage"
                            ></grid>
                        </div>
                    </mq-responsive>
                </div>
            </div>
        </div> -->
</template>

<script>
// import { onMounted } from 'vue-demi'
import HorizontalSlider from '../components/HorizontalSlider.vue'
import Grid from '../components/Grid.vue'
import Banner from '../components/Banner.vue'
import Comic from '../firebase/comics/Comic.js'
import Author from '@/firebase/Author'
import Setting from '@/firebase/Setting'
import { authorLimitTen, orderByLimit } from '../firebase/utils/queries.js'
// import { where } from 'firebase/firestore'
// import Tag from '../firebase/Tag.js'
// import UserRole from '../firebase/UserRole.js'
// import { ref } from 'vue'

const i18Texts = {
  messages: {
    en: {
      title1: 'All Comics',
      title2: 'Adventure',
      title3: 'Science Fiction',
      show: 'Show More',
      authors: 'Authors',
    },
    id: {
        title1: 'Semua Komik',
        title2: 'Komik Adventure',
        title3: 'Komik Science Fiction',
        show: 'Lihat Lebih Banyak',
        authors: 'Penulis',
    }
  }
}

export default {
    name: 'dashboard-page',
    i18n: i18Texts,
    components: {
        HorizontalSlider,
        Banner,
        Grid,
    },
    inject: [
        'routeResolver'
    ],
    methods: {
        processToAuthorHorizontalSlider(){

        },
        async fetchBanners(){
            const banners = await Setting.getBanners()
            this.banners = banners.value
        },
        async fetchComics(){
            const comicGenerator = Comic.generateDocumentsWithStorageResource(orderByLimit, ['cover_image_url'])
            for await(let comic of comicGenerator){
                this.comics.push(comic)
            }
        },
        async fetchAuthors(){
            const authorGenerator = Author.generateDocumentsWithStorageResource(authorLimitTen, ['profile_picture_url'])
            for await(let author of authorGenerator){
                this.authors.push(author)
            }
        }
    },
    computed: {
        karaOnly(){
            return 'true' == process.env.VUE_APP_KARA_ONLY
        }
    },
    data(){
        return {
            comics: [],
            authors: [],
            testa: [],
            testb: [],
            banners: [],
            comicConfig: {
                linkName: 'Comic',
                title: 'title',
                image: 'cover_image_url',
            },
            authorConfig: {
                linkName: 'Author',
                title: 'name',
                image: 'profile_picture_url',
            }
        }
    },
    mounted(){
        if(!this.karaOnly){
            this.fetchComics()
            this.fetchAuthors()
        }
        this.fetchBanners()
    },
    created(){
        // Comic.getDocuments().then((docs) => {
        //     this.comics = docs
        // })
    }
    // setup(){
    //     let comics = ref([])
    //     onMounted(async () => {
    //         comics.value = await Comic.getDocuments()
    //         console.log('done')
    //     })

    //     return {
    //         comics
    //     }
    //     // Comic.getDocuments().then((instances) => {
    //     //     console.log(instances)
    //     // })
    //     // Tag.getDocuments().then((instances) => {
    //     //     console.log(instances)
    //     // })
    //     // UserRole.getDocuments().then((roles) => {
    //     //     console.log(roles)
    //     // })
    // }
}
</script>

<style scoped>

</style>

<style>
.subsubtitle{
    color: #41b3a9;
}
.featured-block{
    /* height: calc(100vh - 64px); */
    background-size: cover;
    background-position: center;
}
.vueperslides, .vueperslides__inner, .vueperslides__parallax-wrapper, .vueperslides__track{
    height: inherit;
}
</style>