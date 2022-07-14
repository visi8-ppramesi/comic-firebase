import { defineAsyncComponent } from 'vue'

const buildComponentParam = (name, template, createdStr = null, mountedStr = null, methodsStr = null, propsStr = null, dataStr = null, computedStr = null) => {
    const param = {
        name,
        template
    }
    if(createdStr){
        //created(){}
        if(/^created\(\)/.test(createdStr)){
            const code = createdStr.match(/^created\(\){(?<code>.*)}$/).groups.code
            param.created = function(){
                eval(code)
            }
        //() => {}
        }else if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(createdStr)){
            param.created = eval(createdStr)
        }else{
            param.created = function(){
                eval(createdStr)
            }
        }
    }
    if(mountedStr){
        //mounted(){}
        if(/^mounted\(\)/.test(mountedStr)){
            const code = mountedStr.match(/^mounted\(\){(?<code>.*)}$/).groups.code
            param.mounted = function(){
                eval(code)
            }
        //() => {}
        }else if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(mountedStr)){
            param.mounted = eval(mountedStr)
        }else{
            param.mounted = function(){
                eval(mountedStr)
            }
        }
    }
    if(methodsStr){
        //({...})
        if(/^(\(\{).*(\}\))$/.test(methodsStr)){
            param.methods = eval(methodsStr)
        //{...}
        }else if(/^(\{).*(\})$/.test(methodsStr)){
            param.methods = eval(`(${methodsStr})`)
        }
    }
    if(propsStr){
        if(/^(\(\{).*(\}\))$/.test(propsStr)){
            param.props = eval(propsStr)
        }else if(/^(\{).*(\})$/.test(propsStr)){
            param.props = eval(`(${propsStr})`)
        }
    }
    if(computedStr){
        if(/^(\(\{).*(\}\))$/.test(computedStr)){
            param.computed = eval(computedStr)
        }else if(/^(\{).*(\})$/.test(computedStr)){
            param.computed = eval(`(${computedStr})`)
        }
    }
    if(dataStr){
        if(/^\(\)(\s?)=>(\s?)(\(|{)/.test(dataStr)){
            param.data = eval(dataStr)
        }else{
            if(/^(\{).*(\})$/.test(dataStr)){
                dataStr = `(${dataStr})`
            }
            param.data = function(){
                return eval(dataStr)
            }
        }
    }
    return param
}

export default function(fetcher, loaderComponent = null){
    const asyncLoaderParam = {
        loader: async () => {
            try{
                const { name, template, created: createdStr, mounted: mountedStr, methods: methodsStr, props: propsStr, data: dataStr, computed: computedStr } = await fetcher()
                return buildComponentParam(name, template, createdStr, mountedStr, methodsStr, propsStr, dataStr, computedStr)
            }catch(err){
                throw err
            }
        }
    }
    if(loaderComponent){
        asyncLoaderParam.loadingComponent = loaderComponent
    }
    
    return defineAsyncComponent(asyncLoaderParam)
}