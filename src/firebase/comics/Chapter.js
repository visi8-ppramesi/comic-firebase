// import firebase from '../firebase.js'
// import settings from '../firebaseSettings.js'
import Subcollection from '../Subcollection.js'
import Page from './Page.js'
import firebaseSettings from '../firebaseSettings.js'
import { doc, increment, updateDoc, setDoc, arrayUnion } from 'firebase/firestore'

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

    async viewChapter(userId = null){
        const counterIndex = Math.floor(Math.random() * firebaseSettings.counterShardNum).toString()
        const chapterCounterRef = doc(this.constructor.db, 'comics', this.parentId, 'chapters', this.id, 'counters', counterIndex)
        const chapterRef = doc(this.constructor.db, 'comics', this.parentId, 'chapters', this.id)
        const readHistoryRef = doc(this.constructor.db, 'users', userId, 'read_history', this.parentId)
        return await updateDoc(chapterCounterRef, {
            view_count: increment(1)
        }).then((res) => {
            if(userId){
                return setDoc(readHistoryRef, {
                    chapters: arrayUnion(chapterRef)
                }, { merge: true })
            }else{
                return res
            }
        })
    }

    async getPages(queries = []){
        const path = ['comics', this.parentId, 'chapters', this.id, 'pages']
        this.pages = await Page.getDocuments(path, queries)
        return this.pages
    }
}