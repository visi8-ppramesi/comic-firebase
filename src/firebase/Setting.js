import Collection from "./Collection";

export default class extends Collection{
    static orderByParam = 'settings'
    static fields = {
        'value': Object
    }
}