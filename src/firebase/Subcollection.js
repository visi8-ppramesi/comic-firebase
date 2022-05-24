import firebase from './firebase.js'
import { 
    doc, 
    query, 
    // startAfter, 
    collection, 
    getDocs, 
    getDoc,
    // orderBy,
    // limit
} from "firebase/firestore";
import utils from './utils/index.js'
import _ from 'lodash'
import { LongText, ProfilePicture } from './types/index.js';

export default class{
    static orderByParam = false
    static fields = {}

    setData(parentId, id, data, doc = null){
        this.id = id
        this.parentId = parentId
        Object.keys(this.constructor.fields).forEach((field) => {
            const isSubcollection = this.constructor.fields[field] == this
            const isLongText = this.constructor.fields[field] == LongText
            const isProfilePicture = this.constructor.fields[field] == ProfilePicture
            if(!_.isNil(data[field]) && !isSubcollection){
                if(isLongText){
                    this[field] = data[field].replace(/\\n/g, "<br />").replace(/\n/g, "<br />")
                }else if(isProfilePicture){
                    if(_.isEmpty(data[field])){
                        this[field] = firebase.firebaseConfig.defaultProfilePicture
                    }else{
                        this[field] = data[field]
                    }
                }else{
                    this[field] = data[field]
                }
            }else if(_.isNil(data[field]) && !isSubcollection){
                if(isProfilePicture){
                    this[field] = firebase.firebaseConfig.defaultProfilePicture
                }
            }
        })
        if(doc){
            this.doc = doc
        }
    }
    
    toJSON(){
        return {...this}
    }

    static async getDocument(path, id){
        const eventRef = doc(firebase.db, ...path, id)
        try{
            const doc = await getDoc(eventRef)
            const data = doc.data()
            const instance = new this()
            const parentId = path[path.length - 2]
            instance.setData(parentId, doc.id, data, doc)
    
            return instance
        }catch(err){
            utils.handleError(err)
            throw err
        }
    }

    static async getDocumentWithStorageResource(path, id, storageFields = []){
        const eventRef = doc(firebase.db, ...path, id)
        const parentId = path[path.length - 2]
        try{
            const doc = await getDoc(eventRef)
            let data = doc.data()

            try{
                const resources = []
                for(let j = 0; j < storageFields.length; j++){
                    resources.push(utils.getDataUrlFromStorage(data[storageFields[j]]))
                }

                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        data[storageFields[k]] = resource[k]
                    }
                })
            }catch(err){
                utils.handleError(err)
                throw err
            }

            const instance = new this()
            instance.setData(parentId, doc.id, data, doc)
    
            return instance
        }catch(err){
            utils.handleError(err)
            throw err
        }
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
        
        try{
            const snap = await getDocs(q)
            return utils.parseDocs(snap.docs).map((datum, idx) => {
                const instance = new this()
                instance.setData(parentId, datum.id, datum, snap.docs[idx])
                return instance
            })
        }catch(err){
            utils.handleError(err)
            throw err
        }
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