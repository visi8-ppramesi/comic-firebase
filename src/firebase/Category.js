import Collection from "./Collection";

export default class extends Collection{
    static orderByParam = 'categories'
    static fields = {
        'name': String
    }
}