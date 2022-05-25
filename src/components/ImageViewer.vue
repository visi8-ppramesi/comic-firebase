<template>
    <div ref="imageContainer" class="min-h-screen bg-black flex justify-center justify-items-center content-center items-center">
        <template v-if="isLink">
            <router-link :to="routeResolver('Page', linkTo)">
                <img ref="imageElement" :src="source" class="w-full">
            </router-link>
        </template>
        <template v-else>
            <img ref="imageElement" :src="source" class="w-full">
        </template>
    </div>
</template>

<script>
import utils from '../firebase/utils/index.js'
import _ from 'lodash'
export default {
    name: 'image-player',
    inject: ['routeResolver'],
    props: {
        linkType: {
            type: String,
            default: 'gspath'
        },
        link: String,
        idx: Number,
        linkTo: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isLink(){
            return !_.isEmpty(this.linkTo)
        }
    },
    data(){
        return {
            source: null
        }
    },
    methods: {
        playVideo(){
        },
        toggleVideo(){
        },
        getLoader(){
            const loader = _.once(() => {
                utils.getDataUrlFromStorage(this.link).then((dataUrl) => {
                    this.source = dataUrl
                    console.log(this.idx + ' loaded')
                })
                .catch((err) => {
                    console.error(err)
                })
            })
            const scroller = _.once(() => {
                this.$refs.imageContainer.scrollIntoView({
                    behavior: 'smooth'
                });
            })

            const elem = this.$refs.imageElement

            return { loader, scroller, elem }
        }
    }
}
</script>

<style scoped>
.glow{
    box-shadow: 0 0 15px 3px #FFF, 0 0 8px 2px #f0f, 0 0 5px 5px #0FF;
    /* width: 80.5vw; */
    z-index: 99;
    margin-bottom:2px;
    transform: scale(0.98, 0.99) !important;
    /* transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease !important; */
}
.glow-animation{
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}
.full-width{
    width: 100%;
}
</style>