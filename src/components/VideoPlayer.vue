<template>
    <div ref="videoContainer" class="relative h-screen bg-black flex justify-center justify-items-center content-center items-center">
        <video class="video absolute z-10" ref="videoElement" playsinline :src="source" type="video/mp4">
        </video>
        <div class="z-20 w-36 h-36">
            <svg v-if="vidLoaded" :class="[vidPlaying ? 'opacity-0' : 'opacity-75']" @click="toggleVideo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <polygon class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
                <path class="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"/>
            </svg>
        </div>
    </div>
</template>

<script>
import utils from '../firebase/utils/index.js'
import _ from 'lodash'
export default {
    name: 'video-player',
    props: {
        linkType: {
            type: String,
            default: 'gspath'
        },
        link: String,
        idx: Number
    },
    data(){
        return {
            vidPlaying: false,
            vidLoaded: false,
            source: null
        }
    },
    methods: {
        playVideo(){
            this.$refs.videoElement.play()
            this.vidPlaying = true
        },
        toggleVideo(){
            if(this.vidPlaying){
                this.$refs.videoElement.pause()
                this.vidPlaying = false
            }else{
                this.$refs.videoElement.play()
                this.vidPlaying = true
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