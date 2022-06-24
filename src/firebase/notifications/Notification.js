import Collection from "../Collection.js";
import Subcollection from "../Subcollection.js"

export default class extends Collection{
    static collection = 'orders'
    static fields = {
        'comics': Subcollection.resolve('./Comic.js'),
        'unread_count': Number,
    }
}