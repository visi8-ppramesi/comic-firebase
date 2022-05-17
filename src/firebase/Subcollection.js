import firebase from './firebase.js'
import { 
    // doc, 
    query, 
    // startAfter, 
    collection, 
    getDocs, 
    getDoc,
    // orderBy,
    // limit
} from "firebase/firestore";
import utils from './utils/index.js'

export default class{
    static orderByParam = false
    static fields = {}

    setData(parentId, id, data, doc = null){
        this.id = id
        this.parentId = parentId
        Object.keys(this.constructor.fields).forEach((field) => {
            const isSubcollection = this.constructor.fields[field] == this
            if(data[field] && !isSubcollection){
                this[field] = data[field]
            }
        })
        if(doc){
            this.doc = doc
        }
    }

    static async getDocument(path, id){
        const eventRef = doc(firebase.db, ...path, id)
        const doc = await getDoc(eventRef)
        const instance = new this()
        const parentId = path[path.length - 2]
        instance.setData(parentId, doc.id, doc.data(), doc)

        return instance
    }

    static async getDocuments(path, queries = []){
        const eventRef = collection(firebase.db, ...path)
        const parentId = path[path.length - 2]
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }

        const snap = await getDocs(q)
        return utils.parseDocs(snap.docs).map((datum, idx) => {
            const instance = new this()
            instance.setData(parentId, datum.id, datum, snap.docs[idx])
            return instance
        })

    }

    static async getDocumentsWithStorageResource(path, queries = [], storageFields = []){
        const eventRef = collection(firebase.db, ...path)
        const parentId = path[path.length - 2]
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        
        const snap = await getDocs(q)
        const docs = Object.values(snap.docs)
        const results = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getDataUrlFromStorage(data[storageFields[j]]))
            }

            await Promise.all(resources).then((resource) => {
                for(let k = 0; k < resource.length; k++){
                    data[storageFields[k]] = resource[k]
                }
            })

            const instance = new this()
            instance.setData(parentId, docs[i].id, data, docs[i])
            results.push(instance)
        }
        return results
    }

    static async * generateDocumentsWithStorageResource(path, queries = [], storageFields = []){
        const parentId = path[path.length - 2]
        const eventRef = collection(firebase.db, ...path)
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

            const instance = new this()
            instance.setData(parentId, docs[i].id, data, docs[i])

            yield instance
        }
    }

    static resolve(collectionPath){
        const path = collectionPath.split('/')
        const fname = path[path.length - 1].split('.')
        const fun = new Function([], 'return import("' + collectionPath + '")')
        fname.pop()
        Object.defineProperty(fun, "name", { value: fname.join('') });
        return fun
        // const path = collectionPath.split('/')
        // const fname = path[path.length - 1].split('.')
        // fname.pop()
        // return {
        //     name: fname.join(''),
        //     type: 'subcollection',
        // }
    }
}