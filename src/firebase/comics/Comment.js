import Collection from "../Collection";
// import User from "../users/User";

export default class extends Collection{
    static collection = 'comments'
    static fields = {
        'user': Collection.resolve('../users/User.js'),
        'message': String,
        'flag': Number,
        'date': Date
    }
}