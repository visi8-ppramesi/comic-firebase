import { where, limit, orderBy, startAfter, doc, FieldPath } from 'firebase/firestore'
import firebase from '../firebase.js'
import _ from 'lodash'

export const orderByDateDesc = (startAtParam = null) => 
    startAtParam ? 
        [ orderBy('created_date', 'desc'), limit(10), startAfter(startAtParam) ] :
        [ orderBy('created_date', 'desc'), limit(10) ]

export const authorLimitTen = [ orderBy('name'), limit(10) ]

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

export const searchQueryArray = (searchQ, orderByParam = 'title', startAtParam = null) => {
    if(typeof searchQ == 'string'){
        searchQ = [...new Set([...searchQ.split(' ')])]
    }else if(_.isObject(searchQ)){
        searchQ = Object.keys(searchQ)
    }

    searchQ = searchQ.map(_.toLower)

    if(startAtParam){
        return [where('keywords', 'array-contains-any', searchQ), orderBy(orderByParam), limit(10), startAfter(startAtParam)]
    }else{
        return [where('keywords', 'array-contains-any', searchQ), orderBy(orderByParam), limit(10)]
    }
}

export const searchQueryMap = (searchQ) => {//, orderByParam = 'title', startAtParam = null) => {
    if(typeof searchQ == 'string'){
        searchQ = [...new Set([...searchQ.split(' ')])]
    }else if(_.isObject(searchQ)){
        searchQ = Object.keys(searchQ)
    }

    searchQ = searchQ.map(_.toLower)
    
    const whereQueries = searchQ.map((key) => {
        return where(new FieldPath('keywords', key), '==', true)
    })
    return [...whereQueries]
    // if(startAtParam){
    //     return [...whereQueries, orderBy(orderByParam), limit(10), startAfter(startAtParam)]
    // }else{
    //     return [...whereQueries, orderBy(orderByParam), limit(10)]
    // }
}