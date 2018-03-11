enum ResourceType {
    Item,
    Collection,
    CollectionList
}

interface Resource {
    id: string
    type: ResourceType
    subResourceId?: string
    entry?: string
    lazyload?: boolean
    itemType?: string
    itemLevel?: number
    itemSelector: string
    itemStructure: object[]
}

class ResourceSet {
    constructor(public resources: Resource[]) {
    }

    get entryResource(): Resource {
        return this.resources.filter(r => r.entry)[0]
    }

    get(id: string): Resource {
        return this.resources.filter(r => r.id === id)[0]
    }


    getItem(id: string): Resource {
        let r = this.get(id)
        if (r.type !== ResourceType.CollectionList) {
            console.error('getItem only supports CollectionList')
        }
        let collectionResource = this.get(r.subResourceId)
        return this.get(collectionResource.subResourceId)
    }

    entry(page: number): string {
        return this.entryResource.entry.replace('[PAGE]', page.toString())
    }
}


export {
    Resource,
    ResourceSet,
    ResourceType
}