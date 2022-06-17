import axios from 'axios'
import Midtrans from './MidtransCharger.js'
import { httpsCallable } from 'firebase/functions'
import fb from '../firebase/firebase.js'

export default class extends Midtrans{
    static cardFields = [
        "card_number",
        "card_exp_month",
        "card_exp_year",
        "card_cvv",
        "OTP",
        "3DS"
    ]
    
    setTokenData(tokenData){
        if(tokenData.status_code == '200'){
            this.tokenData = tokenData
            return tokenData
        }else{
            throw 'Credit card token error ' + tokenData.status_code + ': ' + tokenData.status_message
        }
    }

    buildUrl(cardData, callbackStr, path = null){
        let urlObject
        if(path){
            urlObject = new URL(path, this.baseUrl)
        }else{
            urlObject = new URL(this.baseUrl)
        }

        urlObject.searchParams.append('callback', callbackStr)
        urlObject.searchParams.append('client_key', this.clientKey)

        this.constructor.cardFields.forEach((field) => {
            if(cardData[field]){
                urlObject.searchParams.append(field, cardData[field])
            }
        })

        return urlObject.toString()
    }

    async getCardToken(cardData){
        const url = this.buildUrl(cardData, 'this.setTokenData', '/v2/token')
        const tokenCode = "'use strict';" + (await axios.get(url).then(v => v.data))
        return eval(tokenCode)
    }

    async registerCard(cardData){
        const url = this.buildUrl(cardData, 'this.setTokenData', '/v2/card/register')
        const tokenCode = "'use strict';" + (await axios.get(url).then(v => v.data))
        return eval(tokenCode)
    }

    async createCharge({chapterData, comicData, user}, cardData){
        const token = await this.getCardToken(cardData).then((token) => {
            return token
        }).catch(() => {
            return this.registerCard(cardData).then((token) => {
                return token
            }).catch((err) => {
                throw err
            })
        })

        const createCreditCardCharge = httpsCallable(fb.functions, 'createChapterCreditCardCharge-createChapterCreditCardCharge');
        const { total, tax, fee } = await this.constructor.calculateTax(chapterData.price)

        const creditCardDetails = {
            statusCode: token.status_code,
            statusMessage: token.status_message,
            tokenId: token.token_id,
            hash: token.hash
        }
        const param = this.constructor.buildParam(chapterData, comicData, user, total, tax, fee, { creditCardDetails })
        return createCreditCardCharge(param)
    }
}