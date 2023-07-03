import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserResponse} from '../../@types/user';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    terms: boolean = false;

    user: { name: string, email: string, password: string };

    passwordVisible: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onTogglePassword = this.onTogglePassword.bind(this);

        this.user = {
            name: '',
            email: '',
            password: ''
        };
    }

    ngOnInit(): void {

    }

    onRegister(event: Event): void {
        const subscription: Subscription = this.authService.doRegister(this.user).subscribe({
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

    onTogglePassword(event: Event): void {
        this.passwordVisible = !this.passwordVisible;
    }
}
