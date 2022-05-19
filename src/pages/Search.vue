<template>
        <div class="relative flex w-full flex-wrap items-stretch">
            <input @keyup.enter="goSearch" v-model="searchQuery" type="text" placeholder="search" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10" />
            <button @click="goSearch" class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
        <div class="text-center text-white mt-3" v-if="searching">Search result of "{{ query }}"</div>
        <div class="px-5 py-5 bg-gradient-to-t  to-indigo-900 from-purple-900" v-if="searching">
            <div class="mb-3 text-white">
                <div>
                    <div>Comic Search Results</div>
                </div>
                <div>
                    <grid
                        :items="processToHorizontalSlider(comics)"
                        :config="config"
                        objectCategory="all"
                        :paginated="true"
                        @nextPage="nextPage"
                    ></grid>
                </div>
            </div>
        </div>
</template>

<script>
import Grid from '../components/Grid.vue'
export default {
    name: 'search',
    components: {
        Grid
    },
    created(){
        
    },
    data(){
        return {
            searching: true,
            query: '',
            searchQuery: '',
            comics: [],
            config: {

            }
        }
    },
    methods: {
        nextPage(){

        },
        goSearch(){

        }
    }
}
</script>

<style scoped>

</style>