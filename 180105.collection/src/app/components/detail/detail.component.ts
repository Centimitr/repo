import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../../engine/resource';
import {ResourceService} from "../../providers/resource.service";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    @Input() resource: Resource
    private itemEntries = []

    constructor(private rs: ResourceService) {
    }

    ngOnInit() {

    }

    async refreshItemEntries() {
        this.itemEntries = await this.rs.storage.itemEntries()
    }

    selectItem(entry: string) {
        console.log('SELECT:', entry)
    }

    updateCollectionList() {
        this.rs.add(async engine => {
            const pages = [1, 2]
            await engine.strategy.load(this.rs.storage.types(), this.resource.id, {pages})
        })
    }

}
