<template>
    <div class="h-full w-full px-3 pt-3">
        <div v-for="(notif, idx) in processedNotifs" class="max-w-xl w-full mx-auto flex text-black mb-2" :key="'notif-' + idx">
            <div :class="notif.unread ? 'bg-white' : 'bg-off-purple'" class="rounded-md lg:text-md xl:text-lg flex-1 shadow-lg px-4 py-4 sm:px-6 sm:py-4 leading-relaxed drop-shadow-md" @click="goToComic(notif.comic)">
                <div class="flex flex-row">
                    <div class="flex flex-col w-full">
                        <div class="flex flex-row">
                            <div>
                                <img class="h-28 max-w-auto" style="max-width: fit-content;" :src="notif.chapter_preview_url" alt="">
                            </div>
                            <div class="px-3 flex flex-col flex-grow items-start justify-center gap-y-1">
                                <span class="font-extrabold text-sm leading-3 lg:text-md xl:text-lg">Comic Update: {{ notif.title }} Chapter {{notif.chapter_number}}</span> <span class="=lg:text-sm xl:text-md text-xs text-gray-900 leading-3">Release date: {{ notif.last_update.toDate().toLocaleDateString('id-ID') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { mapState } from 'pinia'
import Comic from '@/firebase/comics/Comic.js'
import Chapter from '@/firebase/comics/Chapter.js'
import _ from 'lodash'
export default{
    name: 'my-notifications',
    inject: ['routeResolver'],
    mounted(){
        this.loader = this.$loading.show({
            loader: 'dots'
        });

        if(this.userInstance){
            this.getNotifications().then(_.over([this.clearUnread, this.processNotifs]))
        }
    },
    watch: {
        userInstance(){
            this.getNotifications().then(_.over([this.clearUnread, this.processNotifs]))
        }
    },
    data(){
        return {
            notifs: [],
            processedNotifs: [],
            loader: null,
            once: true,
        }
    },
    computed: {
        ...mapState(useAuthStore, ['userInstance', 'unreadCount'])
    },
    methods: {
        goToComic(comicRef){
            this.$router.push(this.routeResolver('Comic', {id: comicRef.id}))
        },
        processNotifs(){
            const test = this.notifs.map(async (notif) => {
                const comicPromise = Comic.getDocumentWithStorageResourceUrl(notif.comic.id, ['cover_image_url'])
                //eslint-disable-next-line no-unused-vars
                const [ root, comicId, pathOne, chapterId ] = notif.chapter.path.split('/')
                // const chapterPromise = Chapter.getDocumentWithStorageResourceUrl([root, comicId, pathOne], chapterId, ['chapter_preview_url'])
                return Promise.all([comicPromise]).then(([cmc]) => {
                    const currentChapter = cmc.chapters_data.find(v => v.id == chapterId) ?? {}
                    this.processedNotifs.push({
                        ...cmc,
                        ...notif,
                        ...currentChapter
                    })
                    if(this.once){
                        this.loader.hide()
                        this.once = false
                    }
                })
            })
            Promise.all(test).then(() => {
                console.log(this.processedNotifs)
            })
        },
        async getNotifications(){
            this.notifs = await this.userInstance.getNotifications()
        },
        async clearUnread(){
            const unreadNotifs = this.notifs.filter(v => v.unread)
            if(this.unreadCount > 0 || unreadNotifs.length > 0){
                await this.userInstance.clearNotificationCount(unreadNotifs)
            }
        }
    }
}
</script>

<style>

</style>