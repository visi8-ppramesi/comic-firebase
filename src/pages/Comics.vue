<template>
    <div class="mb-3 text-white md:w-288 md:mx-auto">
        <div class="px-5 py-5">
            <div class="flex items-center justify-between mb-2">
                <div>{{title}}</div>
            </div>
            <div class="flex flex-col md:w-1/4 mb-2">
                <label id="assigned-to-label" class="block text-sm leading-5 font-medium">Sort By</label>
                <select class="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    aria-label="Default select example"
                    v-model="sortByParam"
                    @change="changeSort"
                >
                    <option value="title" selected>Title</option>
                    <option value="release_date">Release Date</option>
                    <option value="last_update">Last Updated</option>
                    <option value="view_count">Views</option>
                </select>
            </div>
            <grid
                :items="comics"
                :config="config"
                objectCategory="all"
                :paginated="true"
                @loadMore="loadComics(false)"
                ref="comicGrid"
            ></grid>
        </div>
    </div>
</template>

<script>
import Comic from '../firebase/comics/Comic.js'
import { categoryQueryPaginated } from '../firebase/utils/queries.js'
// import _ from 'lodash'
import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'
import Grid from '../components/Grid.vue'
export default {
    name: 'comics',
    components: {
        Grid
    },
    data(){
        return {
            sortByParam: 'title',
            title: '',
            comics: [],
            queryParams: {
                paginate: 12,
                page: 1
            },
            config: {
                linkName: 'Comic',
                title: 'title',
                image: 'cover_image_url',
            },
            tags: [],
            processedGenres: [],
            query: ''
        }
    },
    mounted(){
        this.query = this.$route.query.category ? this.$route.query.category : 'all'
        this.title = startCase(toLower(this.query + ' comics'))
        this.loadComics(false)
        // Comic.getDocumentsWithStorageResource(categoryQueryPaginated(this.query, this.sortByParam), ['cover_image_url']).then((comics) => {
        //     this.comics.push(...comics)
        //     this.$refs.comicGrid.stopLoading()
        // })
    },
    methods: {
        changeSort(){
            this.loadComics(true)
            // Comic.getDocumentsWithStorageResource(categoryQueryPaginated(this.query, this.sortByParam), ['cover_image_url']).then((comics) => {
            //     console.log(comics)
            // })
        },
        loadComics(startOver = false){
            this.$refs.comicGrid.startLoading()
            const lastRef = this.comics[this.comics.length - 1] && !startOver ? this.comics[this.comics.length - 1].doc : null
            Comic.getDocumentsWithStorageResourceUrl(categoryQueryPaginated(this.query, this.sortByParam, lastRef), ['cover_image_url']).then((comics) => {
                this.$refs.comicGrid.stopLoading()
                if(startOver){
                    this.comics = comics
                    console.log('startover')
                }else{
                    this.comics.push(...comics)
                    console.log('nah')
                }
            })
        }
    }
}
</script>

<style scoped>

</style>