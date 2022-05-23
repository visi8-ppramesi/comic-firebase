import Collection from "../Collection.js"
import Subcollection from "../Subcollection.js"
import firebase from '../firebase.js';
import utils from "../utils/index.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { updateDoc, getDoc, doc, query, orderBy, startAt, endAt, collection, getDocs, setDoc, onSnapshot, where, arrayUnion, arrayRemove } from "firebase/firestore";  
import PurchasedComic from "./PurchasedComic.js";

const validateUserProfileData = (v) => v

export default class extends Collection{
    static collection = 'users'
    static orderByParam = 'name'
    static fields = {
        'email': String,
        'name': String,
        'purchased_comics': Subcollection.resolve('./PurchasedComic.js'),
        'read_history': Subcollection.resolve('./ReadHistory.js'),
        'favorites': Array,
        'bookmarks': Array,
        'tokens': Number,
        'receipts': Subcollection.resolve('./Receipt.js'),
        'comic_subscriptions': Array,
        'email_verified_at': Date,
        'profile_image_url': String,
    }

    async unsubscribeComic(id){
        const comicRef = doc(this.constructor.db, 'comics', id)
        const userRef = doc(this.constructor.db, 'users', this.id)
        return await updateDoc(userRef, {
            comic_subscriptions: arrayRemove(comicRef)
        })
    }

    async subscribeComic(id){
        const comicRef = doc(this.constructor.db, 'comics', id)
        const userRef = doc(this.constructor.db, 'users', this.id)
        return await updateDoc(userRef, {
            comic_subscriptions: arrayUnion(comicRef)
        })
    }

    async unfavoriteComic(id){
        const comicRef = doc(this.constructor.db, 'comics', id)
        const userRef = doc(this.constructor.db, 'users', this.id)
        return await updateDoc(userRef, {
            favorites: arrayRemove(comicRef)
        })
    }

    async favoriteComic(id){
        const comicRef = doc(this.constructor.db, 'comics', id)
        const userRef = doc(this.constructor.db, 'users', this.id)
        return await updateDoc(userRef, {
            favorites: arrayUnion(comicRef)
        })
    }

    async getPurchasedComicStatus(id){
        return await PurchasedComic.getDocument(['users', this.id, 'purchased_comics'], id)
    }

    async purchaseChapter(comicId, chapterId){
        console.log(comicId, chapterId)
        const purchaseRef = doc(this.constructor.db, 'users', this.id, 'purchased_comics', comicId)
        const chapterRef = doc(this.constructor.db, 'chapters', chapterId)
        return getDoc(purchaseRef).then((snap) => {
            if(snap.exists()){
                return updateDoc(purchaseRef, {
                    chapters: arrayUnion(chapterRef)
                })
            }else{
                return setDoc(purchaseRef, {
                    chapters: arrayUnion(chapterRef)
                })

            }
        })
    }

    async getProfileImage(){
        if(this.profile_image_url){
            this.profile_image_url = await utils.getResourceUrlFromStorage(this.profile_image_url)
            return this.profile_image_url
        }else{
            return null
        }
    }

    static getCurrentUser(){
        return firebase.auth.currentUser
    }

    static onAuthStateChanged(func){
        firebase.auth.onAuthStateChanged(func)
    }

    static async login(email, password){
        const data = await signInWithEmailAndPassword(firebase.auth, email, password).then(async (cred) => {
            const newUserDocRef = doc(firebase.db, 'users', cred.user.uid)
            const newProfile = await getDoc(newUserDocRef)
            return {profile: newProfile.data(), cred: cred, id: cred.user.uid, doc: newUserDocRef}
        })

        const instance = new this()
        instance.setData(data.id, data.profile, data.doc)
        return instance
    }

    static async register(email, password, userData){
        const validatedUserData = validateUserProfileData(userData)
        if(!validatedUserData){
            throw 'validator error'
        }
        const data = await createUserWithEmailAndPassword(firebase.auth, email, password).then(async (newUser) => {
            const newUserDocRef = doc(firebase.db, 'users', newUser.user.uid)
            console.log([newUserDocRef, validatedUserData, newUser.user.uid])
            const newProfile = await setDoc(newUserDocRef, validatedUserData)
            return {profile: newProfile.data(), cred: newUser, id: newUser.user.uid, doc: newUserDocRef}
        })

        const instance = new this()
        instance.setData(data.id, data.profile, data.doc)
        return instance

        // .then((userDoc) => {
        //     //do something
        //     return userDoc
        // })
    }
    
    static async logout(){
        const { currentUser } = firebase.auth

        if(currentUser){
            return await signOut(firebase.auth)
        }
    }

    static async getNotification(followingParents, startAtParam = 0, endAtParam = 10){
        if(!firebase.auth.currentUser){
            return []
        }
        const feedRef = collection(firebase.db, 'feed')
        const queriedFeedRef = query(feedRef, where('parent', 'in', followingParents), startAt(startAtParam), endAt(endAtParam), orderBy('date', 'asc'))
        return await getDocs(queriedFeedRef)
    }

    static async createNotificationListener(followingParents, func){
        if(!firebase.auth.currentUser){
            return () => {}
        }
        const feedRef = collection(firebase.db, 'feed')
        const queriedFeedRef = query(feedRef, where('parent', 'in', followingParents))
        return onSnapshot(queriedFeedRef, func)
    }
}