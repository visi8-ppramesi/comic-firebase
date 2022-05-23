import Subcollection from "../Subcollection";
// import Comic from "../comics/Comic";

export default class extends Subcollection{
    static collection = 'purchased_comics'
    static fields = {
        'chapters': Number
    }
}