import {Component, OnInit} from '@angular/core';
import {User} from "../../@types/user";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    user: User | undefined;

    constructor(
        private authService: AuthService,
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
    }

    ngOnInit(): void {
        this.user = this.authService.user;
    }

}
