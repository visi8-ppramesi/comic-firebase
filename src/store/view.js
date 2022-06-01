import { defineStore } from "pinia";
import errorHandler from "./utils/errorHandler";
import _ from 'lodash'

const storageComicsViewed = localStorage.getItem('comics_viewed')
const storageDateViewed = localStorage.getItem('view_date')

const viewHelper = (id, comic, store) => {
    try{
        return comic.viewComic().then(() => {
            store.comics_viewed.push(id)
            store.view_date[id] = new Date()
            localStorage.setItem('comics_viewed', JSON.stringify(store.comics_viewed))
            localStorage.setItem('view_date', JSON.stringify(store.view_date))
        })
    }catch(err){
        errorHandler(err)
    }
}

export const useViewStore = defineStore('comicViewed', {
    state: () => ({
        comics_viewed: _.isNil(storageComicsViewed) ? [] : JSON.parse(storageComicsViewed),
        view_date: _.isNil(storageDateViewed) ? {} : JSON.parse(storageDateViewed),
    }),
    
    getters: {},

    actions: {
        viewComic(comicInstance){
            console.log('viewing')
            const id = comicInstance.id
            if(!_.includes(this.comics_viewed, id)){
                if(!(id in this.view_date)){
                    return viewHelper(id, comicInstance, this)
                }/*else{
                    const viewDate = new Date(this.view_date[id])
                    if(viewDate < comicInstance.last_update.toDate()){
                        return viewHelper(id, comicInstance, this)
                    }
                }*/
            }else{
                console.log(comicInstance)
                const viewDate = new Date(this.view_date[id])
                if(viewDate < comicInstance.last_update.toDate()){
                    return viewHelper(id, comicInstance, this)
                }
            }
            return false
        }
    }
})