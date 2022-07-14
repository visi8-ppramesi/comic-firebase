const asyncComponentConvert = require('./asyncComponentConvert.js')
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const { doc, setDoc } = require('firebase/firestore')
const fb = require('@/firebase/firebase.js')
const { path: filePath, comic: comicId, chapter: chapterId, extras} = argv

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
    const extrasRef = doc(fb.db, 'comics', comicId, 'chapters', chapterId, 'extras', extras)
    try{
        await setDoc(extrasRef, vueObject)
    }catch(err){
        console.error(err)
    }
}

parseVueFile()