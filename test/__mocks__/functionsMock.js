const functions = {
    'createComicCreditCardCharge-createComicCreditCardCharge'(param){

    },
    'createChapterCreditCardCharge-createChapterCreditCardCharge'(param){

    },
    'createChapterGopayCharge-createChapterGopayCharge'(param){

    },
    'createComicGopayCharge-createComicGopayCharge'(param){
        
    },
}

export const getFunctions = jest.fn();
export const httpsCallable = jest.fn((funcInstance, funcName) => {
    return functions[funcName]
});