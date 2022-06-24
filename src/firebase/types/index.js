import firebase from '../firebase.js'
import { ref, uploadBytes } from "firebase/storage";
import { setDoc } from 'firebase/firestore'

export class Subdoc{}

export class LongText{}

export class ProfilePicture{
    //eslint-disable-next-line no-unused-vars
    async uploadField(fieldName, path, file){
        const pathArray = path.split('/')
        pathArray.push(file.name)
        pathArray.unshift('uploads')
        const fileRef = ref(firebase.storage, pathArray.join('/'))
        try{
            const { ref } = await uploadBytes(fileRef, file, { cacheControl: 'public,max-age=86400' })
            return await setDoc(this.doc.ref, {
                [fieldName]: firebase.buildGsPath(ref.fullPath)
            }, {merge: true})      
        }catch(err){
            console.error(err)
            throw err
        }
    }
}

export class StorageLink{}

export class InstanceData{
    constructor(fields){
        this.fields = fields
    }

    get keys(){
        return Object.keys(this.fields)
    }
}