import Midtrans from './MidtransCharger.js'
import { httpsCallable } from 'firebase/functions'
import fb from '../firebase/firebase.js'

export default class extends Midtrans{
    async createCharge({chapterData, comicData, user}){
        const createGopayCharge = httpsCallable(fb.functions, 'createChapterGopayCharge-createChapterGopayCharge');
        const { total, tax, fee } = await this.constructor.calculateTax(chapterData.price)
        const param = this.constructor.buildParam(chapterData, comicData, user, total, tax, fee)
        return createGopayCharge(param)
    }
}