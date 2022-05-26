import emitter from './emitter.js'
import app from '../main.js'

export default function(err, type){
    switch(type){
        case 'loginError':
            console.log(app)
            emitter.emit('loginError')
            break;
        case 'registerError':
            emitter.emit('registerError')
            break;
        case 'getDocumentError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true
            })
            break;
        case 'getDocumentsError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true
            })
            break;
        case 'generateDocumentsError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true
            })
            break;
        case 'favoriteError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true
            })
            break;
        default:
            break;
    }
    return err
}