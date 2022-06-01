// import firebase from '../firebase.js'
// import settings from '../firebaseSettings.js'
import Subcollection from '../Subcollection.js'
import Page from './Page.js'
import firebaseSettings from '../firebaseSettings.js'
import { doc, increment, updateDoc } from 'firebase/firestore'

export default class extends Subcollection{
    static collection = 'chapter_number'
    static fields = {
        'chapter_number': Number,
        'release_date': Date,
        'view_count': Number,
        'price': Number,
        'ar_price': Number,
        'pages': Subcollection.resolve('./Page.js'),
        'chapter_preview_url': String
    }

    async viewChapter(){
        const counterIndex = Math.floor(Math.random() * firebaseSettings.counterShardNum).toString()
        const chapterRef = doc(this.constructor.db, 'comics', this.parentId, 'chapters', this.id, 'counters', counterIndex)
        return await updateDoc(chapterRef, {
            view_count: increment(1)
        })
    }

    async getPages(queries = []){
        const path = ['comics', this.parentId, 'chapters', this.id, 'pages']
        this.pages = await Page.getDocuments(path, queries)
        return this.pages
    }
}