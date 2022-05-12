import Collection from "../Collection";
import User from "../users/User";

export default class extends Collection{
    static orderByParam = 'comments'
    static fields = {
        'user': User,
        'message': String,
        'flag': Number,
        'date': Date
    }
}