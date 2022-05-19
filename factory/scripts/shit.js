const fb = require('../firebase.js')
const _ = require('lodash')
const ComicFactory = require('../comics.js')
const { getDocs, updateDoc, collection } = require('firebase/firestore')

fb.signInPromise.then(() => {
    getDocs(collection(ComicFactory.db, 'comics')).then((snap) => {
        snap.forEach((doc) => {
            const data = doc.data()
            updateDoc(doc.ref, { 
                tags: data['tags'].map(_.toLower),
                categories: data['categories'].map(_.toLower),
            }) 
        }) 
    })
})