<template>
    <div ref="imageContainer" class="bg-black flex justify-center justify-items-center content-center items-center">
        <div class="relative">
            <template v-if="isLink">
                <div v-if="detectMobile()" class="z-20 w-14 h-10 border-2 border-black bg-gray-200 bg-opacity-75 flex justify-center items-center rounded-md absolute left-2 top-2">
                    <router-link :to="arLink">
                        <img class="w-full" :src="arLogo" />
                    </router-link>
                </div>
            </template>
            <template v-else>
                <component v-if="extraComponent" :is="extraComponent"></component>
            </template>
            <img ref="imageElement" :src="source" class="w-full">
        </div>
    </div>
</template>

<script>
import utils from '../firebase/utils/index.js'
import VideoOverlay from './VideoOverlay.vue'
// import _ from 'lodash'
import size from 'lodash/size'
import once from 'lodash/once'
import isEmpty from 'lodash/isEmpty'
import { doc, getDoc } from 'firebase/firestore'
import fb from '@/firebase/firebase.js'
export default {
    name: 'image-player',
    inject: ['routeResolver', 'detectMobile'],
    components: {
        VideoOverlay
    },
    props: {
        chapterId: {
            type: String,
            default: () => ''
        },
        arLink: {
            type: Object,
            default: () => ({})
        },
        linkType: {
            type: String,
            default: 'gspath'
        },
        extras: {
            type: String,
            default : ''
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
            return size(this.arLink) > 0
            // return !isEmpty(this.linkTo)
        }
    },
    data(){
        return {
            arLogo: require('@/assets/icons/ar_icon.svg'),
            source: null,
            showGlow: false,
            extraComponent: null,
            scrollEventListener: null
        }
    },
    mounted(){
        if(!isEmpty(this.extras)){
            const self = this
            const fetcherFunc = async function(){
                const docRef = doc(fb.db, 'comics', self.$route.params.comicId, 'chapters', self.$route.params.chapterId, 'pages', self.chapterId, 'extras', self.extras)
                const snap = await getDoc(docRef)
                const data = snap.data()
                return data
            }
            this.extraComponent = this.extrasLoader(fetcherFunc)
        }
        // if(this.isLink){
        //     this.$nextTick(() => {
        //         this.handleScroll()
        //         window.addEventListener('scroll', this.handleScroll)
        //     })
        // }
    },
    beforeUnmount(){
        // window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        // handleScroll(){
        //     const imgElem = this.$refs.imageElement
        //     if(this.isInViewport(imgElem)){
        //         this.showGlow = true
        //     }else{
        //         this.showGlow = false
        //     }
        // },
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
            const loader = once(() => {
                utils.getDataUrlFromStorage(this.link).then((dataUrl) => {
                    this.source = dataUrl
                    console.log(this.idx + ' loaded')
                })
                .catch((err) => {
                    console.error(err)
                })
            })
            const scroller = once(() => {
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