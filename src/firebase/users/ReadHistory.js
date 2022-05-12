import Subcollection from "../Subcollection";
import Comic from "../comics/Comic";
import Chapter from "../comics/Chapter";

export default class extends Subcollection{
    static orderByParam = 'read_history'
    static fields = {
        'comic': Comic,
        'chapters': [ Chapter ]
    }

    constructor(path){
    }
}