import firebase from './firebase.js'
import Subcollection from './Subcollection.js';
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
import { LongText, ProfilePicture } from './types/index.js';
import _ from 'lodash'

export default class{
    static collection = ''
    static orderByParam = false
    static fields = {}
    static db = firebase.db

    setData(id, data, doc = null){
        this.id = id
        Object.keys(this.constructor.fields).forEach((field) => {
            const isSubcollection = this.constructor.fields[field] == Subcollection
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

    static async getDocument(id){
        const eventRef = doc(firebase.db, this.collection, id)
        try{
            const doc = await getDoc(eventRef)
            const data = doc.data()
            const instance = new this()
            instance.setData(doc.id, data, doc)
    
            return instance
        }catch(err){
            utils.handleError(err)
            throw err
        }
    }

    static async getDocumentWithStorageResource(id, storageFields = []){
        const eventRef = doc(firebase.db, this.collection, id)
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
            instance.setData(doc.id, data, doc)
    
            return instance
        }catch(err){
            utils.handleError(err)
            throw err
        }
    }

    static async getDocuments(queries = []){
        const eventRef = collection(firebase.db, this.collection)
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
                instance.setData(datum.id, datum, snap.docs[idx])
                return instance
            })
        }catch(err){
            utils.handleError(err)
            throw err
        }
    }

    static async getDocumentsWithStorageResourceUrl(queries = [], storageFields = []){
        const eventRef = collection(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            utils.handleError(err)
            throw err
        }
        const docs = Object.values(snap.docs)
        const events = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getResourceUrlFromStorage(data[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        data[storageFields[k]] = resource[k]
                    }
                })
            } catch (err) {
                utils.handleError(err)
                throw err
            }
            data.doc = docs[i]
            data.id = docs[i].id
            events.push(data)
        }
        return events
    }

    static async getDocumentsWithStorageResource(queries = [], storageFields = []){
        const eventRef = collection(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            utils.handleError(err)
            throw err
        }
        const docs = Object.values(snap.docs)
        const events = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getDataUrlFromStorage(data[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        data[storageFields[k]] = resource[k]
                    }
                })
            } catch (err) {
                utils.handleError(err)
                throw err
            }
            data.doc = docs[i]
            data.id = docs[i].id
            events.push(data)
        }
        return events
    }

    static async * generateDocumentsWithStorageResourceUrl(queries = [], storageFields = []){
        const eventRef = collection(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        
        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            utils.handleError(err)
            throw err
        }
        const docs = Object.values(snap.docs)
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getResourceUrlFromStorage(data[storageFields[j]]))
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

    static async * generateDocumentsWithStorageResource(queries = [], storageFields = []){
        const eventRef = collection(firebase.db, this.collection)
        let q;
        if(queries.length > 0){
            q = query(eventRef, ...queries)
        }else{
            q = eventRef
        }
        
        let snap
        try {
            snap = await getDocs(q)
        } catch (err) {
            utils.handleError(err)
            throw err
        }
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

    static resolve(collectionPath){
        const path = collectionPath.split('/')
        const fname = path[path.length - 1].split('.')
        const fun = new Function([], 'return import("' + collectionPath + '")')
        fname.pop()
        Object.defineProperty(fun, "name", { value: fname.join('') });
        return fun
        // return {
        //     name: fname.join(''),
        //     type: 'collection',
        // }
    }
}