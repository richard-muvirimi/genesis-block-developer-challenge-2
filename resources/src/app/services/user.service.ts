import {Injectable} from '@angular/core';
import {trimStart} from "lodash";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UpdateUserData, UserResponse, UsersResponse} from "../@types/user";
import {MessageResponse} from "../@types/misc";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
        this.getApiUrl = this.getApiUrl.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.deleteUserById = this.deleteUserById.bind(this);
    }

    getUsers(): Observable<UsersResponse> {
        return this.http.get<UsersResponse>(this.getApiUrl());
    }

    getUserById(id: number): Observable<UserResponse> {
        return this.http.get<UserResponse>(this.getApiUrl(id.toString()));
    }

    updateUser(id: number, data: UpdateUserData): Observable<MessageResponse> {

        const form: FormData = new FormData();

        form.append("name", data.name);
        form.append("email", data.email);
        form.append("password", data.password);
        form.append("role", data.role);

        return this.http.put<MessageResponse>(this.getApiUrl(id.toString()), form);
    }

    createUser(data: UpdateUserData): Observable<MessageResponse> {

        const form: FormData = new FormData();

        form.append("name", data.name);
        form.append("email", data.email);
        form.append("password", data.password);
        form.append("role", data.role);

        return this.http.post<MessageResponse>(this.getApiUrl(), form);
    }

    deleteUserById(id: number): Observable<MessageResponse> {
        return this.http.delete<MessageResponse>(this.getApiUrl(id.toString()));
    }

    private getApiUrl(path: string = ""): string {
        const {origin} = location;

        return origin + "/api/user/" + trimStart(path, "/");
    }
}
