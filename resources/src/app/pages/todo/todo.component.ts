import {Component, OnInit} from '@angular/core';
import {Todo, TodoResponse, UpdateTodoData} from "../../@types/todo";
import {Subscription} from "rxjs";
import {TodoService} from "../../services/todo.service";
import {ActivatedRoute} from "@angular/router";
import {MessageResponse} from "../../@types/misc";
import {DateTime} from "luxon";

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    todo: Todo | undefined;

    constructor(
        private todoService: TodoService,
        private activatedRoute: ActivatedRoute
    ) {
        this.ngOnInit = this.ngOnInit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    ngOnInit(): void {

        const todoId: string = this.activatedRoute.snapshot.paramMap.get('id') || ""

        if (todoId.length !== 0) {
            const subscription: Subscription = this.todoService.getTodoById(parseInt(todoId)).subscribe({
                next: (res: TodoResponse): void => {
                    this.todo = res.data;

                    this.todo.remind_at = DateTime.fromISO(this.todo.remind_at).toISO({
                        includeOffset: false
                    }) || "";
                },
                error: (error: Error): void => {
                    // Handled by interceptor
                },
                complete: (): void => {
                    subscription.unsubscribe();
                }
            });
        } else {
            this.todo = this.todoService.defaultTodo;
        }
    }

    onSubmit(event: Event): void {
        event.preventDefault();

        const {id = 0, title = "", memo = "", remind_at = ""} = this.todo || {};

        const data: UpdateTodoData = {
            title,
            memo,
            remind_at: DateTime.fromISO(remind_at).toISO() || "",
            completed_at: this.todo?.completed_at ? "" : DateTime.now().toISO() || ""
        };

        let observable;
        if (id === 0) {
            observable = this.todoService.createTodo(data);
        } else {
            observable = this.todoService.updateTodo(id, data);
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
