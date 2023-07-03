import {Component, OnInit} from '@angular/core';
import {UpdateUserData, User, UserResponse} from "../../@types/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MessageResponse} from "../../@types/misc";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    user: User | undefined;

    moderator: User;

    password: string = "";

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.moderator = this.authService.user;
    }

    ngOnInit(): void {

        const userId: string = this.activatedRoute.snapshot.paramMap.get('id') || ""

        if (userId.length !== 0) {
            const subscription: Subscription = this.userService.getUserById(parseInt(userId)).subscribe({
                next: (res: UserResponse): void => {
                    this.user = res.data;
                },
                error: (error: Error): void => {
                    // Handled by interceptor
                },
                complete: (): void => {
                    subscription.unsubscribe();
                }
            });
        } else {
            this.user = this.authService.defaultUser;
        }
    }

    onSubmit(event: Event): void {
        event.preventDefault();

        const {id = 0, name = "", email = "", role = ""} = this.user || {};

        const user: UpdateUserData = {
            name,
            email,
            role: this.moderator.role === "administrator" ? role : "user",
            password: this.password ? this.password : ""
        };

        let observable;
        if (id === 0) {
            observable = this.userService.createUser(user);
        } else {
            observable = this.userService.updateUser(id, user);
        }

        const subscription: Subscription = observable.subscribe({
            next: (res: MessageResponse): void => {
                alert(res.message);
            },
            error: (error: Error): void => {
                // Handled by interceptor
            },
            complete: (): void => {
                subscription.unsubscribe();
            }
        });
    }
}
