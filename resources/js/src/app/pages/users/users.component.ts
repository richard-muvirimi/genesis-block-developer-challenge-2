import {Component, OnInit} from '@angular/core';
import {User, UsersResponse} from "../../@types/user";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {MessageResponse} from "../../@types/misc";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users: User[] = [];

    currentUser: User;

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);

        this.currentUser = this.authService.user;
    }

    ngOnInit(): void {

        const subscription: Subscription = this.userService.getUsers().subscribe({
            next: (res: UsersResponse): void => {
                this.users = res.data;
            },
            error: (error: Error): void => {
                // Handled by interceptor
            },
            complete: (): void => {
                subscription.unsubscribe();
            }
        });
    }

    onDeleteUser(event: Event, id: number): void {
        event.preventDefault();

        const subscription: Subscription = this.userService.deleteUserById(id).subscribe({
            next: (res: MessageResponse): void => {
                this.users = this.users.filter((user: User): boolean => user.id !== id);
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
