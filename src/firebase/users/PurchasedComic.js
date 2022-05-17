import Subcollection from "../Subcollection";
// import Comic from "../comics/Comic";

export default class extends Subcollection{
    static collection = 'purchased_comics'
    static fields = {
        'comic': Subcollection.resolve('../comics/Comic.js'),
        'comic_data': Array,
        'chapter': Number
    }

    constructor(path){
    }
}