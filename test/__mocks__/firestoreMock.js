// import mockData from './dataMock.js'
import store from './storeMock.js'
import isEqual from 'lodash/isEqual';
class FieldOperator{
    constructor(value){
        this.value = value
    }
    operateField(){}
}
class Incrementor extends FieldOperator{
    constructor(value){
        super(value)
    }
    operateField(paths, field){
        const currentValue = store.getState([...paths, field])
        if(currentValue){
            return this.value + currentValue
        }else{
            return this.value
        }
    }
}
class ArrayUnioner extends FieldOperator{
    constructor(value){
        super(value)
    }
    operateField(paths, field){
        const currentValue = store.getState([...paths, field])
        if(currentValue){
            return [...new Set([...currentValue, this.value])]
        }else{
            return this.value
        }
    }
}
class ArrayRemover extends FieldOperator{
    constructor(value){
        super(value)
    }
    operateField(paths, field){
        const currentValue = store.getState([...paths, field])
        if(currentValue){
            return currentValue.filter(v => !isEqual(v, this.value))
        }else{
            return this.value
        }
    }
}

const emptyDocument = (paths) => {
    return store.getState(paths)
}

export const arrayRemove = jest.fn(v => new ArrayRemover(v));
export const arrayUnion = jest.fn(v => new ArrayUnioner(v));
export const increment = jest.fn(v => new Incrementor(v));

export const getFirestore = jest.fn();
export const where = jest.fn();
export const limit = jest.fn();
export const orderBy = jest.fn();
export const startAfter = jest.fn();
export const doc = jest.fn((...args) => {
    args.shift();
    return args;
});
export const FieldPath = jest.fn();
export const endBefore = jest.fn();
export const collection = jest.fn((...args) => {
    args.shift();
    return args;
});
export const query = jest.fn((...args) => {
    return [...args[0]]
});
export const writeBatch = jest.fn();
export const updateDoc = jest.fn((paths, value) => {
    Object.keys(value).forEach(key => {
        if(value[key] instanceof FieldOperator){
            value[key] = value[key].operateField(paths, key)
        }
    })
    store.setState(paths, value, true)
});

export const getDoc = jest.fn((ref) => {
    const data = emptyDocument(ref)
    if(data){
        return Promise.resolve({
            exists(){
                return true
            },
            id: ref[ref.length - 1],
            data(){
                return data
            }
        })
    }else{
        return Promise.resolve({
            exists(){
                return false
            },
            id: null
        })
    }
});
export const getDocs = jest.fn((ref) => {
    const data = emptyDocument(ref)
    if(data){
        const docs = Object.keys(data).map((key) => {
            return {
                data(){
                    return data[key]
                },
                id: key
            }
        })
        return Promise.resolve({
            exists(){
                return true
            },
            empty: false,
            docs
        })
    }else{
        return Promise.resolve({
            exists(){
                return false
            },
            empty: true,
        })
    }
});

export const onSnapshot = jest.fn();
export const addDoc = jest.fn();
export const deleteDoc = jest.fn();
export const setDoc = jest.fn();

export const runTransaction = jest.fn((db, fn) => {
    const trans = {
        update: (...args) => {
            updateDoc(...args)
        },
        set: (...args) => {
            setDoc(...args)
        }
    }
    return fn(trans)
})