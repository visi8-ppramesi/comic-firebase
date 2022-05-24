import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import {
    browserLocalPersistence,
    getAuth, 
    setPersistence
} from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getPerformance } from "firebase/performance";
// import dotenv from 'dotenv'

const weTesting = process.env.TEST == 'true'

let envVar
// if(weTesting){
//     envVar = dotenv.config().parsed
// }else{
    envVar = process.env
// }

const firebaseConfig = {
    apiKey: envVar.VUE_APP_API_KEY,
    authDomain: envVar.VUE_APP_AUTH_DOMAIN,
    projectId: envVar.VUE_APP_PROJECT_ID,
    storageBucket: envVar.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: envVar.VUE_APP_MESSAGING_SENDER_ID,
    appId: envVar.VUE_APP_APP_ID,
    measurementId: envVar.VUE_APP_MEASUREMENT_ID,
    defaultProfilePicture: 'gs://comics-77200.appspot.com/default_profile.jpeg'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let analytics = null
const storage = getStorage(app)
let performance = null
if(!weTesting){
    analytics = getAnalytics(app);
    performance = getPerformance(app)
}

setPersistence(auth, browserLocalPersistence)

export default {app, db, auth, storage, analytics, performance, firebaseConfig};