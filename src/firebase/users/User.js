import Collection from "../Collection"
import Subcollection from "../Subcollection"
import firebase from '../firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, query, orderBy, startAt, endAt, collection, getDocs, setDoc, onSnapshot, where } from "firebase/firestore";  

const validateUserProfileData = (v) => v

export default class extends Collection{
    static collection = 'users'
    static orderByParam = 'name'
    static fields = {
        'email': String,
        'name': String,
        'purchased_comics': Subcollection,
        'read_history': Subcollection,
        'favorites': Array,
        'bookmarks': Array,
        'tokens': Number,
        'receipts': Subcollection,
        'comics_subscriptions': Array,
        'email_verified_at': Date,
        'profile_image_url': String,
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
            console.log([newUserDocRef, validatedUserData, cred.user.uid])
            const newProfile = await getDoc(newUserDocRef, validatedUserData)
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