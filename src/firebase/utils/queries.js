import { where, limit, orderBy, startAfter, doc } from 'firebase/firestore'
import firebase from '../firebase.js'

export const orderByLimit = [ orderBy('last_update'), limit(10) ]

export const scifiQuery = [ where('categories', 'array-contains', 'scifi') ]
export const scifiQueryLimitTen = [ ...scifiQuery, ...orderByLimit ]

export const actionQuery = [ where('categories', 'array-contains', 'action') ]
export const actionQueryLimitTen = [ ...actionQuery, ...orderByLimit ]

export const adventureQuery = [ where('categories', 'array-contains', 'adventure') ]
export const adventureQueryLimitTen = [ ...adventureQuery, ...orderByLimit ]

export const categoryQueryPaginated = (category, orderByParam = "title", startAtParam = null) => {
    const catQuery = !category || category == 'all' ? [] : [ where('categories', 'array-contains', category) ]
    if(startAtParam){
        return [ ...catQuery, orderBy(orderByParam), limit(10), startAfter(startAtParam) ]
    }else{
        return [ ...catQuery, orderBy(orderByParam), limit(10)]
    }
}
export const tagQueryPaginated = (tag, orderByParam = "title", startAtParam = null) => {
    const tagQuery = !tag || tag == 'all' ? [] : [ where('tags', 'array-contains', tag) ]
    if(startAtParam){
        return [ ...tagQuery, orderBy(orderByParam), limit(10), startAfter(startAtParam) ]
    }else{
        return [ ...tagQuery, orderBy(orderByParam), limit(10)]
    }
}

export const authorComicsQuery = (authorId) => {
    const docRef = doc(firebase.db, 'authors', authorId)
    return [ where('authors', 'array-contains', docRef), limit(6) ]
}