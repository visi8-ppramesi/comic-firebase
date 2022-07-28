import data from './dataMock.js'

export class Store{
    constructor(initState = null){
        this.state = initState || {}
        this.locked = false
    }

    lock(){
        this.locked = true
    }

    unlock(){
        this.locked = false
    }

    getState(paths){
        let data = this.state[paths[0]]
        for(let i = 1; i < paths.length; i++){
            if(data[paths[i]]){
                data = data[paths[i]]
            }else{
                return null
            }
        }
        return data;
    }
    setState(paths, value, merge = false){
        if(this.locked) return
        if(!this.state[paths[0]]){
            this.state[paths[0]] = {}
        }
        let data = this.state[paths[0]]
        for(let i = 1; i < paths.length - 1; i++){
            if(!data[paths[i]]){
                data[paths[i]] = {}
            }
            data = data[paths[i]]
        }
        if(merge && typeof value == 'object' && !Array.isArray(value)){
            data[paths[paths.length - 1]] = {
                ...data[paths[paths.length - 1]], 
                ...value
            }
        }else{
            data[paths[paths.length - 1]] = value
        }
    }
}

export default new Store(data);