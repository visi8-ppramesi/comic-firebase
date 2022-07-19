<template>
    <div class="flex w-full h-full">
        <video playsinline autoplay muted loop v-show="videoSrc" :src="videoSrc" class="absolute w-full h-full object-cover"></video>
        <div class="w-full h-full bg-black/50 items-center justify-center z-20 flex text-white">
            <img v-show="imgSrc" :src="imgSrc" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'video-banner',
    data(){
        return {
            videoSrc: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/videos%2Fdashboard%2Ftest-compressed.mp4?alt=media&token=4d7a6536-0203-4698-ba2a-3cbed199b965',
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/logos%2Fkara_logo.png?alt=media&token=7060c54a-8c85-4131-8f88-8a6c7ac84200',
        }
    }
}
</script>