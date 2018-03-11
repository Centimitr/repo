import {Storage} from "./storage";
import {Vendor} from "./vendor";
import {Resource, ResourceSet, ResourceType} from "./resource";
import {loadCollectionListResource} from "./methods";

interface LoadParams {
    pages?: number[]
}

class Strategy {
    constructor(private vendor: Vendor,
                private storage: Storage) {
    }

    async load(set: ResourceSet, id: string, params: LoadParams) {
        let resource = set.get(id)
        let itemId = set.getItem(id).id
        let v = this.vendor.get()
        let result = {}
        switch (resource.type) {
            case ResourceType.CollectionList:
                await loadCollectionListResource(v, resource, params.pages, (result, page) => this.storage.storeCollectionListByPage(id, itemId, page, resource.itemLevel, result))
                break
            case ResourceType.Collection:
                console.log('TODO: ResourceType.Collection')
                break
            case ResourceType.Item:
                console.log('TODO: ResourceType.Item')
                break
        }
        v.release()
        return result
    }
}

export {
    Strategy
}