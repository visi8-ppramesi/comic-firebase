const fb = require('../firebase.js')
const _ = require('lodash')
const ComicFactory = require('../comics.js')
const ChapterFactory = require('../chapters.js')
const { getDocs, getDoc, doc, updateDoc, collection, increment, addDoc, collectionGroup } = require('firebase/firestore')


const t = {}
console.log(_.isEmpty(t.asdf))
// fb.signInPromise.then(() => {
//     getDoc(doc(ComicFactory.db, 'authors', 'EZ7uQtb2V3wU4rQ1fG9J')).then((snap) => {
//         const data = snap.data()
//         console.log(data['description'].replace(/\\n/g, "<br />"))
//     })
// })

// fb.signInPromise.then(() => {
//     getDocs(collectionGroup(ComicFactory.db, 'pages')).then((pageSnap) => {
//         pageSnap.forEach((pageDoc) => {
//             updateDoc(pageDoc.ref, {
//                 media_type: 'image'
//             })
//         })
//     })
//     // getDocs(collection(ComicFactory.db, 'comics')).then((snapComic) => {
//     //     snapComic.forEach((docComic) => {
//     //         getDocs(collection(ComicFactory.db, 'comics', docComic.id, 'chapters')).then((snapChapter) => {
//     //             snapChapter.forEach((docChapter) => {
//     //                 getDocs(collection(ComicFactory.db, 'comics', docComic.id, 'chapters', docChapter.id, 'pages')).then((snapPage) => {
//     //                     snapPage.forEach((docPage) => {
//     //                         updateDoc(docPage.ref, {
//     //                             type: 'image'
//     //                         })
//     //                     })
//     //                 })
//     //             })
//     //         })
//     //     })
//     // })
// })

// fb.signInPromise.then(() => {
//     getDocs(collection(ComicFactory.db, 'comics')).then((snap) => {
//         snap.forEach((doc) => {
//             const data = doc.data()
//             updateDoc(doc.ref, { 
//                 tags: data['tags'].map(_.toLower),
//                 categories: data['categories'].map(_.toLower),
//             }) 
//         }) 
//     })
// })

// fb.signInPromise.then(() => {
    // getDocs(collection(ChapterFactory.db, 'comics')).then((snap) => {
    //     snap.forEach((doc) => {
    //         getDocs(collection(ChapterFactory.db, 'comics', doc.id, 'chapters')).then((cptSnap) => {
    //             cptSnap.forEach((cptDoc) => {
    //                 updateDoc(cptDoc.ref, {
    //                     view_count: increment(1)
    //                 })
    //             })
    //         })
            // const data = doc.data()
            // updateDoc(doc.ref, { 
            //     tags: data['tags'].map(_.toLower),
            //     categories: data['categories'].map(_.toLower),
            // }) 
        // }) 
    // })
// })