<template>
    <div ref="imageContainer" class="bg-black flex justify-center justify-items-center content-center items-center">
        <!-- <template v-if="isLink && detectMobile()">
            <div class="glow-animation" :class="showGlow ? 'glow' : 'fill-width'">
                <router-link :to="arLink">
                    <img ref="imageElement" :src="source" class="lg:object-fill lg:w-full" >
                </router-link>
            </div>
        </template>
        <template v-else> -->
            <div class="relative">
                <div v-if="isLink && detectMobile()" class="z-20 w-14 h-10 border-2 border-black bg-gray-200 bg-opacity-75 flex justify-center items-center rounded-md absolute left-2 top-2">
                    <router-link :to="arLink">
                        <img class="w-full" :src="arLogo" />
                    </router-link>
                </div>
                <img ref="imageElement" :src="source" class="w-full">
            </div>
        <!-- </template> -->
    </div>
</template>

<script>
import utils from '../firebase/utils/index.js'
import _ from 'lodash'
export default {
    name: 'image-player',
    inject: ['routeResolver', 'detectMobile'],
    props: {
        arLink: {
            type: Object,
            default: () => ({})
        },
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
            return _.size(this.arLink) > 0
            // return !_.isEmpty(this.linkTo)
        }
    },
    data(){
        return {
            arLogo: require('@/assets/icons/ar_icon.svg'),
            source: null,
            showGlow: false,
        }
    },
    mounted(){
        if(this.isLink){
            this.$nextTick(() => {
                this.handleScroll()
                window.addEventListener('scroll', this.handleScroll)
            })
        }
    },
    methods: {
        handleScroll(){
            const imgElem = this.$refs.imageElement
            if(this.isInViewport(imgElem)){
                this.showGlow = true
            }else{
                this.showGlow = false
            }
        },
        isInViewport(element){
            const rect = element.getBoundingClientRect();
            const bottom = rect.bottom < (window.innerHeight / 1.5) ? rect.bottom : rect.bottom / 1.5
            const right = rect.right - 1
            const visible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                right <= (window.innerWidth || document.documentElement.clientWidth)
            )
            return visible;
        },
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