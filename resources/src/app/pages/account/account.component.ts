import {Component, OnInit} from '@angular/core';
import {User, UserResponse} from "../../@types/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {MessageResponse} from "../../@types/misc";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    user: User | undefined;

    password: string = "";

    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    ngOnInit(): void {

        const subscription: Subscription = this.authService.doGetAccount().subscribe({
            next: (res: UserResponse): void => {
                this.user = res.data;

                subscription.unsubscribe();
            },
            error: (error: Error): void => {
                // Handled by interceptor
            }
        });
    }

    onSubmit(event: Event): void {
        event.preventDefault();

        const {id = 0, name = "", email = ""} = this.user || {};

        const user = {
            name,
            email,
            role: "",
            password: this.password ? this.password : ""
        };

        const subscription: Subscription = this.userService.updateUser(id, user).subscribe({
            next: (res: MessageResponse): void => {

                alert(res.message);

                subscription.unsubscribe();
            },
            error: (error: Error): void => {
                // Handled by interceptor
            }
        });
    }

}
