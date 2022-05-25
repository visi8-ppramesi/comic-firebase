<template>
    <div class="relative relative h-screen bg-black flex justify-center justify-items-center content-center items-center">
        <video @loadeddata="asdf" :src="img" ref="videoElement" class="absolute z-10" />
        <div class="z-20 w-36 h-36">
            <svg v-if="vidLoaded" :class="[vidPlaying ? 'opacity-0' : 'opacity-75']" @click="toggleVideo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <polygon class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
                <path class="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"/>
            </svg>
        </div>
        <!-- <video-player v-for="(video, idx) in videos" :link="video" :idx="idx" :ref="'videoPlayer' + idx" :key="'video-' + idx">
        </video-player> -->
        <!-- <div v-for="(video, idx) in videos" :ref="'testVideo' + idx + 'Container'" :key="'video-' + idx" class="relative h-screen bg-black flex justify-center justify-items-center content-center items-center">
            <video class="video absolute z-10" :ref="'testVideo' + idx" playsinline :src="sources[idx]" type="video/mp4">
            </video>
            <div class="z-20 w-36 h-36">
                <svg v-if="vidLoaded[idx]" :class="[vidPlaying[idx] ? 'opacity-0' : 'opacity-75']" @click="toggleVideo(idx)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                    <polygon class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
                    <path class="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"/>
                </svg>
            </div>
        </div> -->



        <!-- <div ref="testVideo0Container" class="relative h-screen bg-black flex justify-center justify-items-center content-center items-center">
            <video class="video absolute z-10" ref="testVideo0" playsinline :src="sources[0]" type="video/mp4">
            </video>
            <div class="z-20 w-36 h-36">
                <svg v-if="vidLoaded[0]" :class="[vidPlaying[0] ? 'opacity-0' : 'opacity-75']" @click="toggleVideo(0)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                    <polygon class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
                    <path class="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"/>
                </svg>
            </div>
        </div>
        <div ref="testVideo1Container" class="relative h-screen bg-white flex justify-center justify-items-center content-center items-center">
            <video class="video absolute z-10" ref="testVideo1" playsinline :src="sources[1]" type="video/mp4">
            </video>
            <div class="z-20 w-36 h-36">
                <svg v-if="vidLoaded[1]" :class="[vidPlaying[1] ? 'opacity-0' : 'opacity-75']" @click="toggleVideo(1)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                    <polygon class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
                    <path class="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"/>
                </svg>
            </div>
        </div> -->
    </div>
</template>

<script>
// import utils from '../firebase/utils/index.js'
// import _ from 'lodash'
// import VideoPlayer from '../components/VideoPlayer.vue'
import utils from '../firebase/utils/index.js'
export default {
    components: {
        // VideoPlayer
    },
    data(){
        return {
            test: 'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_1.mp4',
            img: '',
            id: '',
            vidPlaying: false,
            vidLoaded: false,
            // sources: [],
            // consoleOpen: false,
            // videos: [
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_1.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_2.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_3.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_4-5.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_6.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_7.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_8.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_9.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_10.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_11.mp4',
            // ],
            // vidLoaded: [],
            // vidPlaying: [],
        }
    },
    created(){

        // this.vidLoaded = this.videos.map(() => false)
        // this.vidPlaying = this.videos.map(() => false)
        // this.sources = this.videos.map(() => null)
    },
    methods: {
        asdf(){
            console.log('asdfzxcv')
            // utils.revokeDataUrl(this.img, this.id)
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
        hello(){
            console.log('asdfasdfasdf')
        }
        // toggleVideo(idx){
        //     const strIndex = 'testVideo' + idx
        //     if(this.vidPlaying[idx]){
        //         this.$refs[strIndex][0].pause()
        //         this.vidPlaying[idx] = false
        //     }else{
        //         this.$refs[strIndex][0].play()
        //         this.vidPlaying[idx] = true
        //     }
        // },
    },
    mounted(){
        utils.getProtectedDataUrlFromStorage(this.test).then(({media, identifier}) => {
            this.img = media
            this.id = identifier
            this.vidLoaded = true
            // utils.revokeDataUrl(media, identifier)
        })
        // const loaders = []
        // Object.keys(this.$refs).forEach((el) => {
        //     loaders.push(this.$refs[el][0].getLoader())
        // })

        // // const playOnce = []
        // const videosDupe = [...this.videos]
        // videosDupe.pop()
        // //eslint-disable-next-line no-unused-vars
        // videosDupe.forEach((video, idx) => {
        //     const containerIndex = 'videoPlayer' + (idx + 1)
        //     console.log(containerIndex)
        //     const play = _.once(this.$refs[containerIndex][0].playVideo)
        //     loaders[idx].elem.addEventListener('ended', () => {
        //         loaders[idx + 1].loader()
        //         loaders[idx + 1].scroller()
        //         play()
        //     })
        // })

        // loaders[0].loader()
        // loaders[0].scroller()

        // document.addEventListener('scroll', () => {
        //     _.debounce(() => {
        //         for(let i = 1; i < this.videos.length; i++){
        //             const containerIndex = 'videoPlayer' + i
        //             if(!_.isEmpty(this.$refs[containerIndex][0])){
        //                 const myRect = this.$refs[containerIndex][0].$el.getBoundingClientRect()
        //                 if(myRect.top - window.innerHeight < 1){
        //                     loaders[i].loader()
        //                 }
        //             }
        //         }
        //     }, 100)()
        // })

        // const loaders = this.videos.map((video, idx) => {
        //     const loader = _.once(() => {
        //         utils.getDataUrlFromStorage(video).then((dataUrl) => {
        //             this.vidLoaded[idx] = true
        //             this.sources[idx] = dataUrl
        //             console.log(idx + ' loaded')
        //         })
        //     })
        //     const scroller = _.once(() => {
        //         const containerIndex = 'testVideo' + idx + 'Container'
        //         this.$refs[containerIndex][0].scrollIntoView({
        //             behavior: 'smooth'
        //         });
        //     })

        //     return { loader, scroller }
        // })
        //eslint-disable-next-line no-unused-vars
        // this.videos.forEach((video, idx) => {
        //     const videoIndex = 'testVideo' + idx

        //     this.$refs[videoIndex][0].addEventListener('ended', () => {
        //         loaders[idx + 1].loader()
        //         loaders[idx + 1].scroller()
        //     })
        // })

        // utils.getDataUrlFromStorage(this.videos[0]).then((vid) => {
        //     this.vidLoaded[0] = true
        //     this.sources[0] = vid
        //     this.$refs.testVideo0Container.scrollIntoView({
        //         behavior: 'smooth'
        //     });
        // })
        // this.$refs.testVideo0.addEventListener('ended', () => {
        //     utils.getDataUrlFromStorage(this.videos[1]).then((vid) => {
        //         this.vidLoaded[1] = true
        //         this.sources[1] = vid
        //         this.$refs.testVideo1Container.scrollIntoView({
        //             behavior: 'smooth'
        //         });
        //         this.toggleVideo(1)
        //     })
        // })

        // loaders[0].loader()
        // loaders[0].scroller()

        // document.addEventListener('scroll', () => {
        //     _.debounce(() => {
        //         for(let i = 1; i < this.videos.length; i++){
        //             const containerIndex = 'videoPlayer' + i
        //             const myRect = this.$refs[containerIndex][0].getBoundingClientRect()
        //             if(myRect.top - window.innerHeight < 1){
        //                 loaders[i].loader()
        //             }
        //         }
        //     }, 100)()
        // })
    },
}
</script>

<style scoped>
.play-btn {
    width: 25%;
    height: auto;
    margin: 0 auto;
    margin-top: 10%;
}

.play-btn__svg{
    transition: 1s; 
    fill:#303030; 
}

</style>