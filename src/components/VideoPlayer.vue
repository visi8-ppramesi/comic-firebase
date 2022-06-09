<template>
    <div ref="videoContainer" class="relative h-screen bg-black flex justify-center justify-items-center content-center items-center">
        <video class="video absolute z-10" ref="videoElement" playsinline :src="source" type="video/mp4">
        </video>
        <div class="z-20">
            <div :class="[showArButton ? 'opacity-1' : 'opacity-0']" class="w-16 h-16 flex bg-gray-200 bg-opacity-75 justify-center items-center rounded-full absolute left-2 top-2">
                <router-link :to="arLink">
                    <svg width="63" height="40" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="'Arimo'" font-size="40" id="svg_1" y="34.5" x="2.5" stroke-width="0" stroke="#000" fill="#000000">AR</text>
                        </g>
                    </svg>
                </router-link>
            </div>
            <div class="w-36 h-36">
                <svg v-if="vidLoaded" :class="[vidPlaying ? 'opacity-0' : 'opacity-75']" @click="toggleVideo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                    <polygon class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
                    <path class="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../firebase/utils/index.js'
import _ from 'lodash'
export default {
    name: 'video-player',
    props: {
        arLink: {
            type: Object,
            default: () => ({})
        },
        showArButtonTiming: {
            type: Object,
            default: () => ({})
        },
        linkType: {
            type: String,
            default: 'gspath'
        },
        link: String,
        idx: Number
    },
    data(){
        return {
            showArButton: false,
            vidPlaying: false,
            vidLoaded: false,
            source: null
        }
    },
    mounted(){
        if(_.size(this.showArButtonTiming) == 2){
            this.$refs.videoElement.ontimeupdate = () => {
                const time = this.$refs.videoElement.currentTime
                if(this.showArButtonTiming.start < time && time < this.showArButtonTiming.end){
                    this.showArButton = true
                }else{
                    this.showArButton = false
                }
            }
        }
    },
    methods: {
        pauseVideo(){
            this.$refs.videoElement.pause()
            this.vidPlaying = false
        },
        playVideo(){
            this.$refs.videoElement.play()
            this.vidPlaying = true
            this.$emit('playClicked', this.idx)
        },
        toggleVideo(){
            if(this.vidPlaying){
                this.$refs.videoElement.pause()
                this.vidPlaying = false
            }else{
                this.$refs.videoElement.play()
                this.vidPlaying = true
                this.$emit('playClicked', this.idx)
            }
        },
        getLoader(){
            const loader = _.once(() => {
                utils.getDataUrlFromStorage(this.link).then((dataUrl) => {
                    this.vidLoaded = true
                    this.source = dataUrl
                    console.log(this.idx + ' loaded')
                })
                .catch((err) => {
                    console.error(err)
                })
            })
            const scroller = _.once(() => {
                this.$refs.videoContainer.scrollIntoView({
                    behavior: 'smooth'
                });
            })

            const elem = this.$refs.videoElement

            return { loader, scroller, elem }
        }
    }
}
</script>

<style scoped>

</style>