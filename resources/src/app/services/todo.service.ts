import {Injectable} from '@angular/core';
import {trimStart} from "lodash";
import {Observable} from "rxjs";
import {Todo, TodoResponse, TodosResponse, UpdateTodoData} from "../@types/todo";
import {HttpClient} from "@angular/common/http";
import {MessageResponse} from "../@types/misc";

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private http: HttpClient) {
        this.getApiUrl = this.getApiUrl.bind(this);
        this.getTodos = this.getTodos.bind(this);
        this.getTodoById = this.getTodoById.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.deleteTodoById = this.deleteTodoById.bind(this);
    }

    get defaultTodo(): Todo {
        return {
            created_at: "", updated_at: "", user_id: 0,
            id: 0,
            title: "",
            memo: "",
            remind_at: "",
            completed_at: ""
        };
    }

    getTodos(): Observable<TodosResponse> {
        return this.http.get<TodosResponse>(this.getApiUrl());
    }

    getTodoById(id: number): Observable<TodoResponse> {
        return this.http.get<TodoResponse>(this.getApiUrl(id.toString()));
    }

    updateTodo(id: number, data: UpdateTodoData): Observable<MessageResponse> {

        const form: FormData = new FormData();
        form.append("title", data.title);
        form.append("memo", data.memo);
        form.append("remind_at", data.remind_at);
        form.append("completed_at", data.completed_at);

        return this.http.put<MessageResponse>(this.getApiUrl(id.toString()), form);

    }

    createTodo(data: UpdateTodoData): Observable<MessageResponse> {

        const form: FormData = new FormData();
        form.append("title", data.title);
        form.append("memo", data.memo);
        form.append("remind_at", data.remind_at);
        form.append("completed_at", data.completed_at);

        return this.http.post<MessageResponse>(this.getApiUrl(), form);
    }

    deleteTodoById(id: number): Observable<MessageResponse> {
        return this.http.delete<MessageResponse>(this.getApiUrl(id.toString()));
    }

    private getApiUrl(path: string = ""): string {
        const {origin} = location;

        return origin + "/api/todo/" + trimStart(path, "/");
    }
}
