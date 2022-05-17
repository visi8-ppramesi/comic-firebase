import Collection from "./Collection";

export default class extends Collection{
    static collection = 'settings'
    static fields = {
        'value': Object
    }
}