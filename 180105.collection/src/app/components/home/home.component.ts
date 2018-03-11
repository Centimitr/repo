import {Component, OnInit} from '@angular/core';
import {ResourceService} from '../../providers/resource.service';
import {Resource, ResourceType} from '../../engine/resource';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private resources = []
    private selectedResourceId = ''
    private details = new Map<string, Resource>()

    constructor(private rs: ResourceService) {
        console.clear()
        this.check().then()
    }

    async check() {
        const toSave = [
            <Resource>{
                id: 'manga',
                type: ResourceType.Item
            }, <Resource>{

                id: 'manga.collection',
                type: ResourceType.Collection,
                subResourceId: 'manga'
            }, <Resource>{
                id: 'manga.collection.list.default',
                type: ResourceType.CollectionList,
                subResourceId: 'manga.collection',
                entry: 'https://nhentai.net/?page=[PAGE]',
                lazyload: true,
                itemType: 'manga',
                itemLevel: 1,
                itemSelector: '#content .gallery',
                itemStructure: [
                    {name: 'link', selector: null, method: 'link'},
                    {name: 'title', selector: null, method: 'text'},
                    {name: 'thumbnail', selector: null, method: 'image'},
                ]
            }
        ]
        await this.rs.storage.storeTypes(toSave)
    }


    async ngOnInit() {
        this.resources = await this.rs.storage.types()
    }

    select(r: Resource) {
        this.selectedResourceId = r.id
        this.details.set(r.id, r)
    }

}
