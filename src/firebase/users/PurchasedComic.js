import Subcollection from "../Subcollection";
import Comic from "../comics/Comic";

export default class extends Subcollection{
    static orderByParam = 'purchased_comics'
    static fields = {
        'comic': Comic,
        'comic_data': Array,
        'chapter': Number
    }

    constructor(path){
    }
}