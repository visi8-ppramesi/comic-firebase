import firebase from '../firebase.js'
import settings from '../firebaseSettings.js'
import Subcollection from '../Subcollection.js'
import Page from './Page.js'

export default class extends Subcollection{
    static orderByParam = 'chapter_number'
    static fields = {
        'chapter_number': Number,
        'release_date': Date,
        'view_count': Number,
        'price': Number,
        'ar_price': Number,
        'pages': Subcollection,
    }

    async getPages(queries = []){
        const path = ['comics', this.parentId, 'chapters', this.id, 'pages']
        this.pages = await Page.getDocuments(path, queries)
        return this.pages
    }
}