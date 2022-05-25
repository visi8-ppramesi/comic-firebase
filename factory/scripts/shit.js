const fb = require('../firebase.js')
const _ = require('lodash')
const ComicFactory = require('../comics.js')
const ChapterFactory = require('../chapters.js')
const { getDocs, getDoc, doc, updateDoc, collection, increment, addDoc, collectionGroup, where, query, FieldPath, orderBy, limit } = require('firebase/firestore')

// let one = true
// const huh = {
//     latin: true,
//     soul: true,
// }
fb.signInPromise.then(() => {
    const counts = {}
    const usersRef = collection(ComicFactory.db, 'users')
    getDocs(usersRef).then((snap) => {
        snap.forEach((doc) => {
            const data = doc.data()
            data.favorites.forEach((comic) => {
                console.log(comic)
                if(counts[comic.id]){
                    counts[comic.id]++
                }else{
                    counts[comic.id] = 1
                }
            })
        })
        Object.keys(counts).forEach((comicId) => {
            const comicRef = doc(ComicFactory.db, 'comics', comicId)
            updateDoc(comicRef, {
                favorite_count: counts[comicId]
            }).then((updateComic) => {
                console.log(updateComic)
            })
        })
    })
    // const comicCollection = collection(ComicFactory.db, 'comics')
    // const q = query(comicCollection, 
    //     ...Object.keys(huh).map((key) => {
    //         return where(new FieldPath('keywords', key), '==', true),
    //         orderBy('name'),
    //         limit(10)
    //     })
    // )

    // const q = query(comicCollection, where('keywords', 'array-contains-all', ['kara', 'guardian', 'realms']))
    // getDocs(q).then((snap) => {
    //     if(snap.empty){
    //         console.log('not found')
    //     }else{
    //         snap.forEach((docRes) => {
    //             console.log(docRes.data())
    //         })
    //     }
    // })
    // getDocs(comicCollection).then((snap) => {
    //     snap.forEach((docRes) => {
    //         const data = docRes.data()
    //         const authors = data['authors_data'].map(v => v.name).reduce((acc, v) => {
    //             const authArray = v.split(' ')
    //             acc.push(...authArray)
    //             return acc
    //         }, [])
    //         const tags = data['tags']
    //         const categories = data['categories']
    //         const title = data['title'].split(' ')

    //         const keywords = [...new Set([...authors, ...tags, ...categories, ...title].map(_.toLower))]
    //         // console.log(keywords)
    //         updateDoc(docRes.ref, {
    //             keywords
    //         })
    //     })
    // })
    // getDoc(doc(ComicFactory.db, 'authors', 'EZ7uQtb2V3wU4asdfasdfasdfzxcvzxczxcvrQ1fG9J')).then((snap) => {
    //     console.log(snap.exists())
    // })
})

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