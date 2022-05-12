const { faker } = require('@faker-js/faker')
const Factory = require('./factory.js')


module.exports = class TagFactory extends Factory{
    static collectionName = 'tags'

    static async createData(){
        return {
            'name': faker.music.genre(),
        }
    }
}