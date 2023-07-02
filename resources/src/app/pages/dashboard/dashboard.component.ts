import {Component, OnInit} from '@angular/core';
import {User, UserResponse, UsersResponse} from "../../@types/user";
import {forkJoin, Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {TodoService} from "../../services/todo.service";
import {Todo, TodosResponse} from "../../@types/todo";
import {MessageResponse} from "../../@types/misc";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    user: User | undefined;
    todos: Todo[] = [];

    users: User[] = [];

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private todoService: TodoService,
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
        this.onDeleteTodo = this.onDeleteTodo.bind(this);

        this.user = this.authService.user;
    }

    ngOnInit(): void {

        const subscription: Subscription = forkJoin([this.authService.doGetAccount(), this.todoService.getTodos()]).subscribe({
            next: ([resUser, resTodo]: [resUser: UserResponse, resTodo: TodosResponse]): void => {
                this.user = resUser.data;
                this.todos = resTodo.data;


            },
            error: (error: Error): void => {
                // Handled by interceptor
            },
            complete: (): void => {
                subscription.unsubscribe();
            }
        });

        if (this.user?.role === "administrator") {
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

    }

    onDeleteTodo(event: Event, id: number): void {
        event.preventDefault();

        const subscription: Subscription = this.todoService.deleteTodoById(id).subscribe({
            next: (res: MessageResponse): void => {
                this.todos = this.todos.filter((todo: Todo): boolean => todo.id !== id);
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
