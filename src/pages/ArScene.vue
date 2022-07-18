<template>
    <div class="flex text-center text-white text-5xl h-screen-navbar w-screen justify-center items-center">
        <div>
            Loading... Please wait
        </div>
    </div>
</template>

<script>
import Scene from '../firebase/comics/Scene.js'
const text = {
  en: {
    message: { 'Loading... Please wait' }
  }
}
export default {
    name: 'scene-show',
    data(){
        return {
            origHtmlClass: '',
            scene: null,
        }
    },
    watch: {
        '$route'(){
            this.destroyXr()
        }
    },
    methods:{
        onXrLoaded(){
            console.log('asdfasdfasdfasdfasdf')
        },
        destroyXr(){
            const ascene = document.getElementsByTagName('a-scene')[0]
            ascene.parentNode.removeChild(ascene)
            const eightWallLoading = document.getElementById('loadingContainer')
            if(eightWallLoading !== null){
                eightWallLoading.parentNode.removeChild(eightWallLoading)
            }
            const html = document.getElementsByTagName('html')[0]
            html.className = this.origHtmlClass
            window.removeEventListener('xrloaded', this.onXrLoaded)
        }
    },
    created(){
        if(this.detectMobile()){
            console.log('mobile')
        }else{
            console.log('not mobile')
        }

        let loader = this.$loading.show({
            loader: 'dots'
        });
        Scene.getDocumentWithStorageResourceUrl([
            'comics',
            this.$route.params.comicId,
            'chapters',
            this.$route.params.chapterId,
            'pages',
            this.$route.params.pageId,
            'scenes'
        ], this.$route.params.sceneId, ['ar_model_url']).then((scene) => {
            const regexMatch = scene.scene_html.match(/%%model_url%%/g)
            if(regexMatch && regexMatch.length > 0){
                this.scene = scene.scene_html.replace(/%%model_url%%/g, scene.ar_model_url)
            }else{
                this.scene = scene.scene_html
            }

            const html = document.getElementsByTagName('html')[0]
            this.origHtmlClass = html.className
            document.body.insertAdjacentHTML('beforeend', this.scene)
            window.addEventListener('xrloaded', this.onXrLoaded)
            
        })
        .finally(loader.hide)

        // if(false){
        //     const html = document.getElementsByTagName('html')[0]
        //     this.origHtmlClass = html.className
        //     document.body.insertAdjacentHTML('beforeend', this.scene)
        //     window.addEventListener('xrloaded', this.onXrLoaded)
        // }

        // axios.get(route('api.page.show.scene', {page: this.$route.params.pageId}))
        // .then((response) => {
        //     const html = document.getElementsByTagName('html')[0]
        //     this.origHtmlClass = html.className
        //     document.body.insertAdjacentHTML('beforeend', response.data.scene)
        //     window.addEventListener('xrloaded', this.onXrLoaded)
        // })
    },
    unmounted(){
        console.log('unmounted')
        this.destroyXr()
    },
    beforeUnmount(){
        console.log('before unmount')
        this.destroyXr()
    },
}
</script>

<style>
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
