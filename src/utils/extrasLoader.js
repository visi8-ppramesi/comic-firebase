import { defineAsyncComponent } from 'vue'

const buildComponentParam = (name, template, createdStr = null, mountedStr = null, methodsStr = null, propsStr = null, dataStr = null, computedStr = null) => {
    const param = {
        name,
        template
    }
    if(createdStr){
        param.created = function(){
            eval(createdStr)
        }
    }
    if(mountedStr){
        param.mounted = function(){
            eval(mountedStr)
        }
    }
    if(methodsStr){
        if(/^(\(\{).*(\}\))$/.test(methodsStr)){
            param.methods = eval(methodsStr)
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
            param.props = eval(computedStr)
        }else if(/^(\{).*(\})$/.test(computedStr)){
            param.props = eval(`(${computedStr})`)
        }
    }
    if(dataStr){
        if(/^(\{).*(\})$/.test(dataStr)){
            dataStr = `(${dataStr})`
        }
        param.data = function(){
            return eval(dataStr)
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