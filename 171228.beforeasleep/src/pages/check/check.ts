import {Component} from '@angular/core';
import {ListenService} from "../../providers/listen-service/listen-service";

interface Check {
  tasks: string[]
}

@Component({
  selector: 'page-check',
  templateUrl: 'check.html'
})
export class CheckPage {

  show = false

  check: Check = {
    tasks: ['Read 3 pages of English book', 'Have 1 Unity course', 'Have 1 machine learning course']
  }

  constructor(private ls: ListenService) {
  }

  next() {
  }

  async activate() {
    this.show = true
  }

  deactivate() {
    this.show = false
  }
}
