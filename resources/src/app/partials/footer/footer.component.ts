import { Component } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    year: number;

    constructor() {
        this.year = DateTime.now().year;
    }

}
