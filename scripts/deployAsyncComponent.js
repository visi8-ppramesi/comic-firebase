const asyncComponentConvert = require('./vueCompiler.js')
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const { doc, setDoc } = require('firebase/firestore')
const { fpath, path: filePath } = argv

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

const buildComponentParam = ({name, template, created = null, mounted = null, methods = null, props = null, data = null, computed = null}) => {
    const param = {
        name,
        template
    }
    if(created){
        //created(){}
        if(/^created\(\)/.test(created)){
            const code = created.match(/^created\(\){(?<code>.*)}$/).groups.code
            param.created = function(){
                eval(code)
            }
        //() => {}
        }else if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(created)){
            param.created = eval(created)
        }else{
            param.created = function(){
                eval(created)
            }
        }
    }
    if(mounted){
        //mounted(){}
        if(/^mounted\(\)/.test(mounted)){
            const code = mounted.match(/^mounted\(\){(?<code>.*)}$/).groups.code
            param.mounted = function(){
                eval(code)
            }
        //() => {}
        }else if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(mounted)){
            param.mounted = eval(mounted)
        }else{
            param.mounted = function(){
                eval(mounted)
            }
        }
    }
    if(methods){
        //({...})
        if(/^(\(\{).*(\}\))$/.test(methods)){
            param.methods = eval(methods)
        //{...}
        }else if(/^(\{).*(\})$/.test(methods)){
            param.methods = eval(`(${methods})`)
        }
    }
    if(props){
        if(/^(\(\{).*(\}\))$/.test(props)){
            param.props = eval(props)
        }else if(/^(\{).*(\})$/.test(props)){
            param.props = eval(`(${props})`)
        }
    }
    if(computed){
        if(/^(\(\{).*(\}\))$/.test(computed)){
            param.computed = eval(computed)
        }else if(/^(\{).*(\})$/.test(computed)){
            param.computed = eval(`(${computed})`)
        }
    }
    if(data){
        if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(data)){
            param.data = eval(data)
        }else{
            if(/^(\{).*(\})$/.test(data)){
                data = `(${data})`
            }
            param.data = function(){
                return eval(data)
            }
        }
    }
    return param
}

//create a function that reads file
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
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
    const params = buildComponentParam({...vueObject})
    await signInPromise
    console.log(params)
    // const fsPathArray = fpath.split('/')
    // const extrasRef = doc(fb.db, ...fsPathArray)
    // try{
    //     await setDoc(extrasRef, vueObject)
    // }catch(err){
    //     console.error(err)
    // }
}

parseVueFile()