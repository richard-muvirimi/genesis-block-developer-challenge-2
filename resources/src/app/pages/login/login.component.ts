import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user: { email: string, password: string };

    passwordVisible: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onForgotPassword = this.onForgotPassword.bind(this);
        this.onTogglePassword = this.onTogglePassword.bind(this);

        this.user = {
            email: "",
            password: ""
        }
    }

    ngOnInit(): void {

    }

    onLogin(event: Event): void {

        const subscription: Subscription = this.authService.doLogin(this.user).subscribe({
            next: (res: { status: boolean, data: string }): void => {
                this.authService.authToken = res.data;

                this.router.navigate(['/dashboard']);
            },
            error: (error: Error): void => {
                alert(error.message);
            },
            complete: (): void => {
                subscription.unsubscribe();
            }
        })
    }

    onForgotPassword(event: Event): void {
        event.preventDefault();

        alert("That sucks!, me too. Try just `password`");
    }

    onTogglePassword(event: Event): void {
        this.passwordVisible = !this.passwordVisible;
    }
}