import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/@types/user';
import { AuthService } from 'app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    user?: User;

    urlEncodedName: string = "";

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    ngOnInit(): void {
        const subscription: Subscription = this.authService.doGetAccount().subscribe({
            next: (res: { status: boolean, data: User }): void => {
                this.user = res.data;

                this.urlEncodedName = encodeURI(this.user.name);
            },
            error: (error: Error): void => {
                // Handled by interceptor
            },
            complete: (): void => {

                subscription.unsubscribe();
            }
        });
    }

    onLogout(event: Event): void {
        const subscription: Subscription = this.authService.doLogout().subscribe({
            next: (res: { status: boolean }): void => {

            },
            error: (error: Error): void => {
                // Handled by interceptor
            },
            complete: (): void => {
                this.router.navigate(['/login']);

                subscription.unsubscribe();
            }
        })
    }

}
