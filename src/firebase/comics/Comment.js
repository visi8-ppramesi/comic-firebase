import Subcollection from "../Subcollection";
import { addDoc, doc, collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
// import firebase from '../firebase.js'
// import User from "../users/User";

export default class extends Subcollection{
    static collection = 'comments'
    static fields = {
        'user': Subcollection.resolve('../users/User.js'),
        'user_data': Object,
        'message': String,
        'flag': Number,
        'date': Date
    }

    static async createNewCommentListener(comicId, callback){
        const commentConstructor = (snap) => {
            const data = snap.docs[0].data()
            const instance = new this()
            const parentId = comicId
            instance.setData(parentId, snap.docs[0].id, data, snap.docs[0])

            callback(instance)
        }
        const collRef = collection(this.db, 'comics', comicId, 'comments')
        return onSnapshot(query(collRef, orderBy('date', 'desc'), limit(1)), commentConstructor)
    }

    static async addComment(comicId, msg, user){
        const userRef = doc(this.db, 'users', user.id)
        const userData = {
            id: userRef,
            name: user.name,
            profile_image_url: user.profile_image_url
        }
        const commRef = collection(this.db, 'comics', comicId, 'comments')
        return await addDoc(commRef, {
            user: userRef,
            user_data: userData,
            message: msg,
            flag: 0,
            date: new Date()
        })
    }
}