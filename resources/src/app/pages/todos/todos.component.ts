import {Component, OnInit} from '@angular/core';
import {Todo, TodosResponse, UpdateTodoData} from "../../@types/todo";
import {TodoService} from "../../services/todo.service";
import {Subscription} from "rxjs";
import {MessageResponse} from "../../@types/misc";
import {DateTime} from "luxon";
import {ActivatedRoute} from "@angular/router";
import {User, UserResponse} from "../../@types/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

    todos: Todo[] = [];

    user: User | undefined;

    constructor(
        private todoService: TodoService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private authService: AuthService
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
    }

    ngOnInit(): void {

        const userId: string = this.activatedRoute.snapshot.paramMap.get('id') || ""

        if (userId.length === 0) {

            const subscription: Subscription = this.todoService.getTodos().subscribe({
                next: (res: TodosResponse): void => {
                    this.user = this.authService.user;

                    this.todos = res.data;
                },
                error: (error: Error): void => {
                    // Handled by interceptor
                },
                complete: (): void => {
                    subscription.unsubscribe();
                }
            });
        } else {
            const subscription: Subscription = this.userService.getUserById(parseInt(userId)).subscribe({
                next: (res: UserResponse): void => {
                    this.user = res.data;

                    this.todos = res.data.todos || [];
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

    onToggleTodo(event: Event, todo: Todo): void {
        event.preventDefault();

        const data: UpdateTodoData = {
            title: todo.title,
            memo: todo.memo,
            remind_at: todo.remind_at,
            completed_at: todo.completed_at ? "" : DateTime.now().toISO() || ""
        };

        const subscription: Subscription = this.todoService.updateTodo(todo.id, data).subscribe({
            next: (res: MessageResponse): void => {
                this.todos = this.todos.map((_todo: Todo): Todo => {
                    if (_todo.id === todo.id) {
                        _todo.completed_at;
                    }

                    return _todo;
                });
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
