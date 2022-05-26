const { getDocs, collection, getDoc, setDoc, addDoc, doc } = require('firebase/firestore')
const { db, signInPromise } = require('../firebase.js')

signInPromise.then(() => {

    const authorsData = [
        {
            'name': 'Triandhika Anjani',
            'email': '',
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': 'She is the writer of Kara, Guardian of Realms. She has been writing for 10 years.',
            'user_id': null
        },
        {
            'name': 'Raiyan Laksamana',
            'email': '',
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': 'He is the writer of Kara, Guardian of Realms. He has been writing for 10 years.',
            'user_id': null
        },
        {
            'name': 'Andra Fembriarto',
            'email': '',
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': 'He is the writer of Kara, Guardian of Realms. He has been writing for 10 years.',
            'user_id': null
        }
    ]
    
    const comicData = {
        'title': 'Kara Guardian of Realms',
        'view_count': 0,
        'favorite_count': 0,
        'release_date': new Date(),
        'last_update': new Date(),
        'description': 'A hidden world. Unseen by man, it is no longer tarnished by their greed and voracity. There, a young girl dutifully takes care of the creatures and plants inhabiting that world, bound by an oath unwearied by time. \nAs the last human in that world, she worries that she might never find that meaningful connection that humans should have with their friends, or let alone, family. \nFollow the journey of Kara, as she navigates the meaning of the duties imposed to her, while unwittingly tapping her hidden potentials and finding her place among modern humans.',
        'tags': [ 'children', 'scifi', 'fantasy' ],
        'categories': [ 'scifi', 'fantasy' ],
        'cover_image_url': 'gs://comics-77200.appspot.com/covers/kara-cover.png',
        'is_draft': false,
        // 'authors': authorRefs,
        // 'authors_data': authorData
    }
    
    const chapterData = {
        'chapter_number': 0,
        'release_date': new Date(),
        'chapter_preview_url': 'gs://comics-77200.appspot.com/previews/cpt1_preview.jpeg',
        'view_count': 0,
        'price': 0,
        'ar_price': false,
    }
    
    const pages = [
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_1.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_2.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_3.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_4-5.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_6.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_7.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_8.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_9.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_10.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_11.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_12.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_13.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_14.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_15.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_16.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_17.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_18.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_19.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_20.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_21.mp4',
        'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_24.mp4',
    ]
    
    const main = async () => {
        const authorsRef = collection(db, 'authors')
        const authorRefs = []
        const authorData = []
        const result = []
        for(let i = 0; i < authorsData.length; i++){
            const newDoc = await addDoc(authorsRef, authorsData[i])
            authorRefs.push(newDoc)
            authorData.push({
                id: newDoc.id,
                name: authorsData[i]['name']
            })
            result.push(newDoc)
        }
        comicData.authors = authorRefs
        comicData.authors_data = authorData
    
        const comicRef = collection(db, 'comics')
        const newComicDoc = await addDoc(comicRef, comicData)
        result.push(newComicDoc)
    
        const cptRef = collection(db, 'comics', newComicDoc.id, 'chapters')
        const newChapterDoc = await addDoc(cptRef, chapterData)
        result.push(newChapterDoc)
    
        const pageData = pages.map((pageUrl, idx) => {
            return {
                'page_number': idx,
                'page_image_url': pageUrl,
                'is_ar': false,
                'config': {},
                'media_type': 'video'
            }
        })
    
        const pgRef = collection(db, 'comics', newComicDoc.id, 'chapters', newChapterDoc.id, 'pages')
    
        for(let k = 0; k < pageData.length; k++){
            const newPageDoc = await addDoc(pgRef, pageData[k])
            result.push(newPageDoc)
        }
    
        return result
    }
    
    main().then((res) => {
        console.log(res)
    })
})