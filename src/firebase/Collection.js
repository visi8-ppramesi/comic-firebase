import firebase from '../firebase.js'
import Subcollection from './Subcollection.js';
import { 
    doc, 
    query, 
    startAfter, 
    collection, 
    getDocs, 
    getDoc,
    orderBy,
    limit
} from "firebase/firestore";  
import utils from './utils/index.js'

export default class{
    static collection = ''
    static orderByParam = false
    static fields = {}

    setData(id, data, doc = null){
        this.id = id
        Object.keys(this.constructor.fields).forEach((field) => {
            const isSubcollection = this.constructor.fields[field] == Subcollection
            if(data[field] && !isSubcollection){
                this[field] = data[field]
            }
        })
        if(doc){
            this.doc = doc
        }
    }

    static async getDocument(id){
        const eventRef = doc(firebase.db, this.collection, id)
        const doc = await getDoc(eventRef)
        const instance = new this()
        instance.setData(doc.id, doc.data(), doc)

        return instance
    }

    static async getDocuments(queries = []){
        const eventRef = collection(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        
        const snap = await getDocs(q)
        return utils.parseDocs(snap.docs).map((datum, idx) => {
            const instance = new this()
            instance.setData(datum.id, datum, snap.docs[idx])
            return instance
        })
    }

    static async getDocumentsWithStorageResource(queries = [], storageFields = []){
        const eventRef = collection(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        
        const snap = await getDocs(q)
        const docs = Object.values(snap.docs)
        const events = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getDataUrlFromStorage(data[storageFields[j]]))
            }

            await Promise.all(resources).then((resource) => {
                for(let k = 0; k < res.length; k++){
                    data[storageFields[k]] = resource[k]
                }
            })
            data.doc = docs[i]
            data.id = docs[i].id
            events.push(data)
        }
        return events
    }

    static async * generateDocumentsWithStorageResource(queries = [], storageFields = []){
        const eventRef = collection(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        
        const snap = await getDocs(q)
        const docs = Object.values(snap.docs)
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getDataUrlFromStorage(data[storageFields[j]]))
            }

            await Promise.all(resources).then((res) => {
                for(let k = 0; k < res.length; k++){
                    data[storageFields[k]] = res[k]
                }
            })
            data.doc = docs[i]
            data.id = docs[i].id

            const instance = new this()
            instance.setData(data.id, data, data.doc)

            yield instance
        }
    }
}