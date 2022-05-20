// import firebase from '../firebase.js'
// import settings from '../firebaseSettings.js'
import Collection from '../Collection.js'
import Subcollection from '../Subcollection.js'
import Chapter from './Chapter.js'
import Author from '../Author.js'
import { doc, increment, orderBy, updateDoc } from 'firebase/firestore'

export default class extends Collection{
    static collection = 'comics'
    static orderByParam = 'title'
    static fields = {
        'title': String,
        'view_count': Number,
        'favorite_count': Number,
        'release_date': Date,
        'authors': [ Collection.resolve('../Author.js') ],
        'authors_data':	Array,
        // 'authors_split': Subcollection,
        'comments':	Subcollection.resolve('./Comment.js'),
        'description': String,
        'chapters':	Subcollection.resolve('./Chapter.js'),
        'tags':	Array,
        'categories': Array,
        'cover_image_url': String,
        'is_draft':	Boolean,
    }

    async viewComic(){
        const comicRef = doc(this.constructor.db, 'comics', this.id)
        return await updateDoc(comicRef, {
            view_count: increment(1)
        })
    }

    async getChapters(queries = []){
        const path = [this.constructor.collection, this.id, 'chapters']
        queries.push(orderBy('chapter_number'))
        this.chapters = await Chapter.getDocuments(path, queries)
        return this.chapters
    }

    async getChaptersWithStorageResource(queries = []){
        const path = [this.constructor.collection, this.id, 'chapters']
        queries.push(orderBy('chapter_number'))
        this.chapters = await Chapter.getDocumentsWithStorageResource(path, queries, ['chapter_preview_url'])
        return this.chapters
    }

    async getComments(queries = []){
        const path = [this.constructor.collection, this.id, 'comments']
        this.comments = await Author.getDocuments(path, queries)
        return this.comments
    }
}