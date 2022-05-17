import Collection from "./Collection";

export default class extends Collection{
    static collection = 'categories'
    static fields = {
        'name': String
    }
}