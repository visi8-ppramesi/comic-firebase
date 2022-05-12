import Collection from "./Collection";

export default class extends Collection{
    static orderByParam = 'authors'
    static fields = {
        'name': String,
        'profile_image_url': String,
        'description': String,
        'social_media_links': Array,
        'email': String
    }
}