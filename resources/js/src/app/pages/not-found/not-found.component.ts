import { Component } from '@angular/core';
import { DateTime } from "luxon";

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

    year: number;

    constructor() {
        this.year = DateTime.now().year;
    }

}
