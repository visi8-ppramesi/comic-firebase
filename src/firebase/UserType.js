import Collection from "./Collection";
import User from "./users/User";

export default class extends Collection{
    static orderByParam = 'user_types'
    static fields = {
        'user': User,
        'types': Array
    }
}