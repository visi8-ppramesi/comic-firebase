import { routes } from "@/router/index.js"

const routeObj = routes.reduce((acc, v) => {
    acc[v.name] = v.path
    return acc
}, {})

export default function(name, params = {}){
    return {name , params}
}