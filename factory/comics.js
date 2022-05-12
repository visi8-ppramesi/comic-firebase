const { faker } = require('@faker-js/faker')
const { getDocs, collection, getDoc, setDoc, addDoc, doc } = require('firebase/firestore')
const ChapterFactory = require('./chapters.js')
const PageFactory = require('./pages.js')
const Factory = require('./factory.js')
const AuthorFactory = require('./authors.js')
const TagFactory = require('./tags.js')
const CategoryFactory = require('./categories.js')

module.exports = class ComicFactory extends Factory{
    static collectionName = 'comics'

    static async createData(){
        const authorRefs = []
        const authorData = []
        for(let i = 0; i < 3; i++){
            const randDoc = await AuthorFactory.getRandomDoc()
            const data = randDoc.data()
            const docRef = doc(this.db, 'authors', randDoc.id)
            authorRefs.push(docRef)
            authorData.push({
                id: docRef,
                name: data['name'],
                profile_picture_url: data['profile_picture_url'],
            })
        }

        return {
            'title': faker.hacker.noun(),
            'view_count': 0,
            'favorite_count': 0,
            'release_date': new Date(),
            'description': faker.lorem.paragraph(5),
            'tags': [ await TagFactory.getRandomValue('name'), await TagFactory.getRandomValue('name'), await TagFactory.getRandomValue('name') ],
            'categories': [ await CategoryFactory.getRandomValue('name'), await CategoryFactory.getRandomValue('name') ],
            'cover_image_url': 'gs://comics-77200.appspot.com/cpt-prev.jpg',
            'is_draft': false,
            'authors': authorRefs,
            'authors_data': authorData
        }
    }

    static async createComicsWithChaptersPages(comicNum, cptNum, pgNum){
        let docs = await this.createDocs(comicNum)
        const newCpts = []
        const newPages = []
        for(let i = 0; i < docs.length; i++){
            const doc = docs[i]
            for(let k = 0; k < cptNum; k++){
                const newData = await ChapterFactory.createData(k + 1)
                console.log(newData)
                const newDoc = await addDoc(collection(this.db, 'comics', doc.id, 'chapters'), newData)
                for(let j = 0; j < pgNum; j++){
                    const newPageData = await PageFactory.createData(j + 1)
                    console.log(newPageData)
                    const newPageDoc = await addDoc(collection(this.db, 'comics', doc.id, 'chapters', newDoc.id, 'pages'), newPageData)
                    newPages.push(newPageDoc)
                }
                newCpts.push(newDoc)
            }
        }
    }
}