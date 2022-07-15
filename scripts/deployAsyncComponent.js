const asyncComponentConvert = require('./vueCompiler.js')
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const { doc, setDoc } = require('firebase/firestore')
const { path: filePath, name } = argv

const env = require('dotenv').config().parsed

const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore"); 
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getStorage } = require('firebase/storage')

const firebaseConfig = {
    apiKey: env.VUE_APP_API_KEY,
    authDomain: env.VUE_APP_AUTH_DOMAIN,
    projectId: env.VUE_APP_PROJECT_ID,
    storageBucket: env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: env.VUE_APP_MESSAGING_SENDER_ID,
    appId: env.VUE_APP_APP_ID,
    measurementId: env.VUE_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const storage = getStorage(app)
const signInPromise = signInWithEmailAndPassword(auth, env.VUE_APP_ADMIN_EMAIL, env.VUE_APP_ADMIN_PASSWORD)

//create a function that reads file
function readFile(filePathParam) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePathParam, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

//create a function that parse vue file
async function parseVueFile() {
    const file = await readFile(filePath)
    const vueObject = await asyncComponentConvert(file)
    await signInPromise
    // console.log(params)
    const extrasRef = doc(fb.db, 'async_components', name)
    try{
        await setDoc(extrasRef, vueObject)
    }catch(err){
        console.error(err)
    }
}

parseVueFile()