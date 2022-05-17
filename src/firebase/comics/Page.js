// import firebase from '../firebase.js'
// import settings from '../firebaseSettings.js'
import Subcollection from '../Subcollection.js'

export default class extends Subcollection{
    static collection = 'page'
    static fields = {
        'page_number': Number,
        'page_image_url': String,
        'is_ar': Boolean,
        'config': Object,
    }

    // constructor(path){
    // }
}