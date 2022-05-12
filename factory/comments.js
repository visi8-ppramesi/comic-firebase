const { faker } = require('@faker-js/faker')
const ComicFactory = require('./comics.js')
const Factory = require('./factory.js')
const UserFactory = require('./users.js')
const { addDoc, collection } = require('firebase/firestore')

module.exports = class CommentFactory extends Factory{
    static collectionName = 'comments'

    static async createData(){
        return {
            'user': UserFactory.getRandomReference(),
            'message': faker.lorem.paragraph(10),
            'flag': 0,
            'date': new Date()
        }
    }

    static async createDoc(){
        const data = await this.createData()
        const comic = await ComicFactory.getRandomDoc()
        return await addDoc(collection(this.db, 'comics', comic.id, this.collectionName), data)
    }
}