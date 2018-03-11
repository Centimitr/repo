///<reference path="resource.ts"/>
import Dexie from 'dexie';
import * as uuid from 'uuid/v4'
import {Resource, ResourceSet} from "./resource";

interface Item {
    id: string
    resourceId: string
    level: number
    time: number
    value: any
}

interface Page {
    id: string
    resourceId: string
    time: number
    page: number
    itemIds: string[]
}

interface KV {
    key: string
    value: any
}

class Database extends Dexie {

    pages: Dexie.Table<Page, string>;
    items: Dexie.Table<Item, string>;
    types: Dexie.Table<Resource, string>

    constructor() {
        super('Storage');
        this['version'](1).stores({
            items: 'id,resourceId,time,level',
            pages: 'id,resourceId,time,page',
            types: 'id'
        })
    }
}

class Storage {
    private db = new Database()

    async types() {
        return await this.db.types.toArray()
    }

    async storeTypes(values: Resource[]) {
        await this.db.types.bulkPut(values)
    }

    async itemEntries() {
        console.log((await this.db.items.toArray())
            .map(item => item.value.link))
        return (await this.db.items.toArray())
            .map(item => item.value.link)
    }

    async storeCollectionListByPage(resourceId: string, itemResourceId: string, page: number, itemLevel: number, items: any[]) {
        const time = Date.now()
        const id = uuid()
        const itemIds = []
        await Promise.all(items.map(async item => {
            const itemId = uuid()
            itemIds.push(itemId)
            return this.db.items.add({id: itemId, resourceId: itemResourceId, time, level: itemLevel, value: item})
        }))
        await this.db.pages.add({id, resourceId, time, page, itemIds})
    }
}

export {
    Storage
}
