const fb = require('../firebase.js')
const _ = require('lodash')
const ComicFactory = require('../comics.js')
const ChapterFactory = require('../chapters.js')
const { ref, listAll, updateMetadata } = require('firebase/storage')
const { getDocs, getDoc, doc, updateDoc, collection, increment, addDoc, collectionGroup, where, query, FieldPath, orderBy, limit } = require('firebase/firestore')

// let one = true
// const huh = {
//     latin: true,
//     soul: true,
// }

const genres = {
    'folk': 'horror',
    'latin': 'scifi',
    'hip hop': 'superhero',
    'stage and screen': 'fantasy',
    'blues': 'horror',
    'metal': 'scifi',
    'classical': 'superhero',
    'children': 'children',
    'scifi': 'scifi',
    'fantasy': 'fantasy'
}

const main = async () => {
    await fb.signInPromise
    const comicsCollection = collection(ComicFactory.db, 'comics')
    const snap = await getDocs(comicsCollection)
    const comicDocs = Object.values(snap.docs)
    for(let i = 0; i < comicDocs.length; i++){
        const comicDoc = comicDocs[i]
        const tags = comicDoc.data().tags
        await updateDoc(comicDoc.ref, {
            categories: tags
        })

        // const comicCptData = []
        // const cptCollection = collection(ComicFactory.db, 'comics', comicDoc.id, 'chapters')
        // const cptSnap = await getDocs(cptCollection)
        // const cptDocs = Object.values(cptSnap.docs)
        // for(let j = 0; j < cptDocs.length; j++){
        //     const cptDoc = cptDocs[j]
        //     const chapter_number = cptDoc.data().chapter_number
        //     const id = cptDoc.id
        //     const cptData = { id, chapter_number }
        //     comicCptData.push(cptData)
        // }
        // if(comicCptData.length > 0){
        //     await updateDoc(comicDoc.ref, { chapters_data: comicCptData })
        // }
    }
}

main()
// fb.signInPromise.then(() => {
//     const comicsCollection = collection(ComicFactory.db, 'comics')
//     getDocs(comicsCollection).then((snap) => {
//         snap.forEach((comicDoc) => {
//             const comicCptData = []
//             const cptCollection = collection(ComicFactory.db, 'comics', comicDoc.id, 'chapters')
//             getDocs(cptCollection).then((cptSnap) => {
//                 cptSnap.forEach((cptDoc) => {
//                     const chapter_number = cptDoc.data().chapter_number
//                     const id = cptDoc.id
//                     const cptData = { id, chapter_number }
//                 })
//             })
//         })
//     })
    // const listRef = ref(fb.storage, '')
    // listAll(listRef).then((res) => {
    //     res.prefixes.forEach((prefix) => {
    //         listAll(prefix).then((innerRes) => {
    //             innerRes.prefixes.forEach((prefix) => {
    //                 listAll(prefix).then((innerInnerRes) => {
    //                     innerInnerRes.items.forEach((item) => {
    //                         updateMetadata(item, {
    //                             cacheControl: 'public,max-age=86400'
    //                         })
    //                     })
    //                 })
    //             })

    //             innerRes.items.forEach((item) => {
    //                 updateMetadata(item, {
    //                     cacheControl: 'public,max-age=86400'
    //                 })
    //             })
    //         })
    //     })

    //     res.items.forEach((item) => {
    //         updateMetadata(item, {
    //             cacheControl: 'public,max-age=86400'
    //         })
    //     })
    // })
    // const counts = {}
    // const usersRef = collection(ComicFactory.db, 'users')
    // getDocs(usersRef).then((snap) => {
    //     snap.forEach((doc) => {
    //         const data = doc.data()
    //         data.favorites.forEach((comic) => {
    //             console.log(comic)
    //             if(counts[comic.id]){
    //                 counts[comic.id]++
    //             }else{
    //                 counts[comic.id] = 1
    //             }
    //         })
    //     })
    //     Object.keys(counts).forEach((comicId) => {
    //         const comicRef = doc(ComicFactory.db, 'comics', comicId)
    //         updateDoc(comicRef, {
    //             favorite_count: counts[comicId]
    //         }).then((updateComic) => {
    //             console.log(updateComic)
    //         })
    //     })
    // })
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