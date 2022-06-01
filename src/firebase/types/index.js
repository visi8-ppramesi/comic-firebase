export class Subdoc{}

export class LongText{}

export class ProfilePicture{}

export class StorageLink{}

export class InstanceData{
    constructor(fields){
        this.fields = fields
    }

    get keys(){
        return Object.keys(this.fields)
    }
}