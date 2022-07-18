<template>
    <div class="flex w-screen h-screen">
        {{ $t('message.hello', {  test: testing }) }}
        {{testing}}
        <!-- <video autoplay muted loop v-show="videoSrc" :src="videoSrc" class="absolute h-screen object-cover"></video>
        <div class="w-full h-full bg-black/50 items-center justify-center z-20 flex text-white">
            <img v-show="imgSrc" :src="imgSrc" />
        </div> -->
    </div>
</template>

<script>
// import { markRaw } from 'vue'
import fb from '../firebase/firebase.js'
import { defineAsyncComponent, shallowRef } from 'vue'
import TestComponent from '../components/TestComponent.vue'
// import { httpsCallable, connectFunctionsEmulator } from 'firebase/functions'
// import StepperComponent from '../components/stepper/StepperComponent.vue'
// import StepOne from '../components/stepper/StepOne.vue'
// import StepTwo from '../components/stepper/StepTwo.vue'
// import StepThree from '../components/stepper/StepThree.vue'
// import utils from '../firebase/utils/index.js'
// import _ from 'lodash'
// import VideoPlayer from '../components/VideoPlayer.vue'
// import utils from '../firebase/utils/index.js'
import { getBlob as getStorageBlob, ref } from 'firebase/storage'

export default {
    components: {
        // AsyncComponent
        // VideoPlayer
        // StepperComponent
    },
    inject: ['Viewer'],
    i18n: {
        messages: {
            en: { message: { hello: 'hello component {test}' } },
            id: { message: { hello: 'こんにちは、component1' } }
        }
    },
    data(){
        return {
            show: false,
            testing: 'null',
            uhh: [],
            arLogo: require('@/assets/icons/ar_icon.svg'),
            shit: null,
            imgViewer: null,
            testVid1: '',
            testVid2: '',
            testVid3: '',
            testVid4: '',
            testVid5: '',
            testVid6: '',
            gsPath1: 'gs://comics-77200.appspot.com/test/web_comic_9_orig.mp4',
            gsPath2: 'gs://comics-77200.appspot.com/test/web_comic_9_1080_20.mp4',
            gsPath3: 'gs://comics-77200.appspot.com/test/web_comic_9_1280_25.mp4',
            gsPath4: 'gs://comics-77200.appspot.com/test/web_comic_9_720_22.mp4',
            gsPath5: 'gs://comics-77200.appspot.com/test/web_comic_9_orig_30.mp4',
            gsPath6: 'gs://comics-77200.appspot.com/test/web_comic_9_compressed.mp4',
            videoSrc: null,
            imgSrc: null,
            // paymentType: null,
            // image: require('../assets/logo.png'),
            // showModal: false,
            // steps: [
            //     {
            //         name: "Step 1",
            //         desc: "Select Payment Method",
            //         icon: "fas fa-car",
            //         disabled: false,
            //         active: false,
            //         component: StepOne,
            //     },
            //     {
            //         name: "Step 2",
            //         desc: "Enter Payment Info",
            //         disabled: false,
            //         active: false,
            //         component: StepTwo,
            //     },
            //     {
            //         name: "Step 3",
            //         desc: "Do Something",
            //         icon: "fas fa-check",
            //         disabled: true,
            //         active: false,
            //         component: StepThree,
            //     },
            //     {
            //         name: "Confirmar",
            //         desc: "Review Payment Info",
            //         icon: "fas fa-check",
            //         disabled: false,
            //         active: false,
            //         component: StepThree,
            //         confirm: "Confirm"
            //     }
            // ]
            // test: 'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_1.mp4',
            // img: '',
            // id: '',
            // vidPlaying: false,
            // vidLoaded: false,
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
        setInterval(() => {
            this.testing = (Math.random() + 1).toString(36).substring(7)
        }, 500)
        // utils.getDataUrlFromStorage('gs://comics-77200.appspot.com/videos/dashboard/test-compressed.mp4').then((dataUrl) => {
        //     this.videoSrc = dataUrl
        // })
        // utils.getDataUrlFromStorage('gs://comics-77200.appspot.com/logos/kara_logo.png').then((dataUrl) => {
        //     this.imgSrc = dataUrl
        // })
        // this.shitshit('gs://comics-77200.appspot.com/videos/chapter_1/PAGE_1.mp4').then((dataurl) => {
        //     this.shit = dataurl
        // })
        // this.shitshit(this.gsPath1).then((dataUrl) => {this.testVid1 = dataUrl})
        // this.shitshit(this.gsPath2).then((dataUrl) => {this.testVid2 = dataUrl})
        // this.shitshit(this.gsPath3).then((dataUrl) => {this.testVid3 = dataUrl})
        // this.shitshit(this.gsPath4).then((dataUrl) => {this.testVid4 = dataUrl})
        // this.shitshit(this.gsPath5).then((dataUrl) => {this.testVid5 = dataUrl})
        // this.shitshit(this.gsPath6).then((dataUrl) => {this.testVid6 = dataUrl})
        // this.vidLoaded = this.videos.map(() => false)
        // this.vidPlaying = this.videos.map(() => false)
        // this.sources = this.videos.map(() => null)
    },
    methods: {
        qwerqwer(){
            this.testing = shallowRef(defineAsyncComponent({
                loader: () => {
                    console.log('called')
                    //eslint-disable-next-line no-unused-vars
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve({
                                template: ''
                                // components: {
                                //     TestComponent
                                // },
                                // template: '<TestComponent @click="fuckshit" test="zxcvzxcvzxcv" class="lg:text-md xl:text-lg text-sm mt-3 inline-flex items-center justify-center px-2 py-1 rounded-full text-gray-50 bg-green-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"></TestComponent><div>asdfdasfasdf</div>',
                                // created(){
                                //     eval(`this.hurrr();this.duh()`)
                                // },
                                // methods: eval(`({hurrr(){console.log("hurrr")},duh(){console.log("dugh")},fuckshit(){alert("fuckshit")}})`)
                            })
                        }, Math.random() * 1000)
                    })
                },
                loadingComponent: TestComponent,
                errorComponent: {
                    template: '<div>error</div>'
                }
            }))
        },
        async shitfuck(){},
        test(){
            console.log('test')
        },
        async getBlob(gsPath){//gs://comics-77200.appspot.com/videos/test/PAGE_18.mp4
            return await getStorageBlob(ref(fb.storage, gsPath))
        },
        async shitshit(gsPath){
            const blob = await this.getBlob(gsPath)
            // return URL.createObjectURL(blob)
            // var img = document.createElement('img');
            // let url = URL.createObjectURL(blob)
            // img.src = url
            // document.getElementById('app').appendChild(img);
            // img.onload = () => {
            //     URL.revokeObjectURL(url)
            // }
            
            return await new Promise((resolve, reject) => {
                var a = new FileReader();
                a.onload = function(e) {
                    resolve(e.target.result);
                }
                a.onerror = function(e){
                    reject(e);
                }
                a.readAsDataURL(blob);
            })
        },
        paymentChange(){
            console.log(this.paymentType)
        },
        asdf(){
            console.log('asdfzxcv')
            // utils.revokeDataUrl(this.img, this.id)
        },
        toggleVideo(){
            // if(this.vidPlaying){
            //     this.$refs.videoElement.pause()
            //     this.vidPlaying = false
            // }else{
            //     this.$refs.videoElement.play()
            //     this.vidPlaying = true
            // }
        },
        hello(){
            console.log('asdfasdfasdf')
        },
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
        // //eslint-disable-next-line no-unused-vars

        // connectFunctionsEmulator(fb.functions, "localhost", 5001);
        // const createGopayCharge = httpsCallable(fb.functions, 'createGopayCharge-createGopayCharge');
        // createGopayCharge({
        //     transactionDetails: {
        //         grossAmount: 12300,
        //         orderId: 'test-1234'
        //     },
        //     customerDetails: {
        //         email: 'ppramesi@visi8.com',
        //         fullName: 'Priya Hayu Pramesi'
        //     }
        // }).then(console.log)
        // utils.getProtectedDataUrlFromStorage(this.test).then(({media, identifier}) => {
        //     this.img = media
        //     this.id = identifier
        //     this.vidLoaded = true
        //     // utils.revokeDataUrl(media, identifier)
        // })
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>