<template>
        <div class="pa-2 w-full">
            <button @click="test">Test</button>
            <div class="flex flex-col justify-end items-center bg-blue-100 w-150 h-40 featured-block w-full h-screen-navbar sm:h-96">
                <banner
                    :banners="banners"
                ></banner>
            </div>
            <div v-if="false" class="flex flex-col justify-end items-center bg-blue-100 w-150 h-40 pb-8 featured-block" style="background-image: linear-gradient(rgba(245, 246, 252, 0) 50%, rgb(49 46 129)), url(/storage/media/covers/kara.jpg);"> <!-- add featured comic here -->
                <!-- <banner
                    class="w-12"
                    :banners="banners"
                ></banner> -->
                <div class="mb-6 text-white">
                    <img class="w-64" :src="karaIcon.default" />
                    <div class="mb-6 text-white">
                        <div class="text-center text-base subsubtitle">Adventure, Teen, Magical</div>
                    </div>
                </div>
            </div>
            <div class="px-5 py-5 bg-gradient-to-t  to-indigo-900 from-purple-900">
                <!-- <div class="mb-3 text-white">
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
                </div> -->
            </div>
            <div class="px-5 py-5 bg-gray-100">
                <!-- <div class="mb-3">
                    <div>
                        <div class="float-right">More</div>
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
                </div> -->
            </div>
            <test-component :items="testa" />
        </div>
</template>

<script>
// import { onMounted } from 'vue-demi'
// import HorizontalSlider from '../components/HorizontalSlider.vue'
// import Grid from '../components/Grid.vue'
import Banner from '../components/Banner.vue'
import Comic from '../firebase/comics/Comic.js'
import TestComponent from '../components/TestComponent.vue'
// import Tag from '../firebase/Tag.js'
// import UserRole from '../firebase/UserRole.js'
// import { ref } from 'vue'
export default {
    name: 'dashboard-page',
    components: {
        // HorizontalSlider,
        Banner,
        TestComponent,
        // Grid,
    },
    methods: {
        processToAuthorHorizontalSlider(){

        },
        test(){
            console.log(this.comics)
        }
    },
    data(){
        return {
            comics: [],
            testa: []
        }
    },
    async created(){
        const comicGenerator = Comic.generateDocumentsWithStorageResource([], ['cover_image_url'])
        for await(let comic of comicGenerator){
            console.log(comic)
            this.testa.push(comic.cover_image_url)
        }
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