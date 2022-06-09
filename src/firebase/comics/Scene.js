import Subcollection from '../Subcollection.js'

export default class extends Subcollection{
    static collection = 'chapter_number'
    static fields = {
        'scene_html': String,
        'ar_model_url': String,
    }
}