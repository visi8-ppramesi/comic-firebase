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
import handleError from '@/utils/handleError.js';
import _ from 'lodash'

export default class{
    static collection = ''
    static orderByParam = false
    static fields = {}
    static db = firebase.db

    setEmpty(){
        this.empty = true
    }

    setData(id, data, doc = null){
        this.empty = false
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

    async fetchResources(storageFields){
        const self = this
        const promises = []
        for(let i = 0; i < storageFields.length; i++){
            promises.push(utils.getDataUrlFromStorage(this[storageFields[i]]))
        }

        return await Promise.all(promises).then((resource) => {
            for(let k = 0; k < resource.length; k++){
                self[storageFields[k]] = resource[k]
            }
        })
    }

    static async getDocument(id){
        const eventRef = doc(firebase.db, this.collection, id)
        try{
            const doc = await getDoc(eventRef)
            if(!doc.exists()){
                const emptyInstance = new this()
                emptyInstance.setEmpty()
                return emptyInstance
            }
            const data = doc.data()
            const instance = new this()
            instance.setData(doc.id, data, doc)
    
            return instance
        }catch(err){
            handleError(err, 'getDocumentError')
            throw err
        }
    }

    static async getDocumentWithStorageResource(id, storageFields = []){
        const eventRef = doc(firebase.db, this.collection, id)
        try{
            const doc = await getDoc(eventRef)
            if(!doc.exists()){
                const emptyInstance = new this()
                emptyInstance.setEmpty()
                return emptyInstance
            }
            let data = doc.data()

            const instance = new this()
            instance.setData(doc.id, data, doc)

            try{
                const resources = []
                for(let j = 0; j < storageFields.length; j++){
                    resources.push(utils.getDataUrlFromStorage(instance[storageFields[j]]))
                }

                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        instance[storageFields[k]] = resource[k]
                    }
                })
            }catch(err){
                handleError(err, 'getDocumentError')
                throw err
            }
    
            return instance
        }catch(err){
            handleError(err, 'getDocumentError')
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
            handleError(err, 'getDocumentsError')
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
            handleError(err, 'getDocumentsError')
            throw err
        }
        const docs = Object.values(snap.docs)
        const events = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []

            data.doc = docs[i]
            data.id = docs[i].id

            const instance = new this()
            instance.setData(data.id, data, data.doc)

            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getResourceUrlFromStorage(instance[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        instance[storageFields[k]] = resource[k]
                    }
                })
            } catch (err) {
                handleError(err, 'getDocumentsError')
                throw err
            }
            // data.doc = docs[i]
            // data.id = docs[i].id
            events.push(instance)
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
            handleError(err, 'getDocumentsError')
            throw err
        }
        const docs = Object.values(snap.docs)
        const events = []
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []

            data.doc = docs[i]
            data.id = docs[i].id

            const instance = new this()
            instance.setData(data.id, data, data.doc)

            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getDataUrlFromStorage(instance[storageFields[j]]))
            }

            try {
                await Promise.all(resources).then((resource) => {
                    for(let k = 0; k < resource.length; k++){
                        instance[storageFields[k]] = resource[k]
                    }
                })
            } catch (err) {
                handleError(err, 'getDocumentsError')
                throw err
            }
            // data.doc = docs[i]
            // data.id = docs[i].id
            events.push(instance)
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
            handleError(err, 'generateDocumentsError')
            throw err
        }
        const docs = Object.values(snap.docs)
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []

            data.doc = docs[i]
            data.id = docs[i].id

            const instance = new this()
            instance.setData(data.id, data, data.doc)

            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getResourceUrlFromStorage(instance[storageFields[j]]))
            }

            await Promise.all(resources).then((res) => {
                for(let k = 0; k < res.length; k++){
                    instance[storageFields[k]] = res[k]
                }
            })

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
            handleError(err, 'generateDocumentsError')
            throw err
        }
        const docs = Object.values(snap.docs)
        for(let i = 0; i < docs.length; i++){
            const data = docs[i].data()
            const resources = []

            data.doc = docs[i]
            data.id = docs[i].id

            const instance = new this()
            instance.setData(data.id, data, data.doc)
            for(let j = 0; j < storageFields.length; j++){
                resources.push(utils.getDataUrlFromStorage(instance[storageFields[j]]))
            }

            await Promise.all(resources).then((res) => {
                for(let k = 0; k < res.length; k++){
                    instance[storageFields[k]] = res[k]
                }
            })

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