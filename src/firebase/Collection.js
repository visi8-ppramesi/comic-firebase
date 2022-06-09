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
import { LongText, ProfilePicture, InstanceData, StorageLink } from './types/index.js';
import handleError from '@/utils/handleError.js';
import _ from 'lodash'

//eslint-disable-next-line no-unused-vars
const setDataHelper = async (fields, instance, key, data, extraConditional = true) => {
    const isLongText = fields[key] == LongText
    const isProfilePicture = fields[key] == ProfilePicture
    const isStorageLink = fields[key] == StorageLink

    if(!_.isNil(data[key]) && extraConditional){
        if(isLongText){
            instance[key] = data[key].replace(/\\n/g, "<br />").replace(/\n/g, "<br />")
        }else if(isProfilePicture){
            if(_.isEmpty(data[key])){
                instance[key] = firebase.firebaseConfig.defaultProfilePicture
            }else{
                instance[key] = data[key]
            }
        }else if(isStorageLink){
            instance[key] = await utils.getDataUrlFromStorage(data[key])
        }else{
            instance[key] = data[key]
        }
    }
}

export default class{
    static collection = ''
    static orderByParam = false
    static fields = {}
    static db = firebase.db

    constructor(){
        Object.values(this.constructor.fields).forEach((fieldType) => {
            const isClass = fieldType.toString().substring(0, 5) === 'class'
            if(isClass){
                const funcs = _.remove(Object.getOwnPropertyNames(fieldType.prototype), (n) => n != 'constructor')
                funcs.forEach((func) => {
                    Object.assign(this, {
                        [func]: fieldType.prototype[func]
                    })
                })
            }
        })
    }

    setEmpty(){
        this.empty = true
    }

    getObjectPath(){
        const path = this.doc.ref.path.split('/')
        const pathObject = {}
        const order = []
        for(let i = 0; i < path.length; i += 2){
            pathObject[path[i]] = path[i + 1]
            order.push(path[i])
        }

        return { path: pathObject, order }
    }

    async setData(id, data, doc = null){
        this.empty = false
        this.id = id
        const fields = Object.keys(this.constructor.fields)
        for(let p = 0; p < fields.length; p++){
            const field = fields[p]
            
            const isSubcollection = this.constructor.fields[field] == Subcollection
            const isProfilePicture = this.constructor.fields[field] == ProfilePicture
            const isInstanceData = this.constructor.fields[field] instanceof InstanceData
            if(!isSubcollection){
                if(isInstanceData){
                    const fieldKeys = this.constructor.fields[field].keys
                    const thisMyData = []
                    for(let i = 0; i < data[field].length; i++){
                        const myData = data[field][i]
                        const instanceData = {}
                        for(let j = 0; j < fieldKeys.length; j++){
                            await setDataHelper(this.constructor.fields[field].fields, instanceData, fieldKeys[j], myData)
                        }
                        thisMyData.push(instanceData)
                    }
                    this[field] = thisMyData
                }else if(!_.isNil(data[field])){
                    await setDataHelper(this.constructor.fields, this, field, data)
                }else if(_.isNil(data[field])){
                    if(isProfilePicture){
                        this[field] = firebase.firebaseConfig.defaultProfilePicture
                    }
                }
            }
        }
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
            await instance.setData(doc.id, data, doc)
    
            return instance
        }catch(err){
            handleError(err, 'getDocumentError')
            throw err
        }
    }

    static async getDocumentWithStorageResourceUrl(id, storageFields = []){
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
            await instance.setData(doc.id, data, doc)

            try{
                const resources = []
                for(let j = 0; j < storageFields.length; j++){
                    resources.push(utils.getResourceUrlFromStorage(instance[storageFields[j]]))
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
            await instance.setData(doc.id, data, doc)

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
            return await Promise.all(utils.parseDocs(snap.docs).map(async (datum, idx) => {
                const instance = new this()
                await instance.setData(datum.id, datum, snap.docs[idx])
                return instance
            }))
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
            await instance.setData(data.id, data, data.doc)

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
            await instance.setData(data.id, data, data.doc)

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
            await instance.setData(data.id, data, data.doc)

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
            await instance.setData(data.id, data, data.doc)
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