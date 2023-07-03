import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserResponse} from '../../@types/user';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

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
            next: (res: UserResponse): void => {
                this.router.navigate(['/dashboard']);
            },
            error: (error: Error): void => {
                // Handled by interceptor
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
