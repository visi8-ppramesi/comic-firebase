import Collection from "./Collection";

export default class extends Collection{
    static orderByParam = 'tags'
    static fields = {
        'name': String
    }
}