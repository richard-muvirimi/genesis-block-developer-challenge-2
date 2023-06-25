import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    get authToken(): string {
        return localStorage.getItem("token") || "";
    }

    get hasToken(): boolean {
        return this.authToken.length !== 0;
    }

    set authToken(token: string) {
        localStorage.setItem("token", token);
    }

    get isLoggedIn(): boolean {
        return this.hasToken
    }

    private getApiUrl(path: string = ""): string {
        const { origin } = location;

        return origin + "/api/" + path;
    }

    /**
     * Login existing user
     * 
     * @param data Object
     * @returns 
     */
    doLogin(data: { email: string, password: string }): Observable<{ status: boolean, data: string }> {
        const form = new FormData();
        form.append("email", data.email);
        form.append("password", data.password);

        return this.http.post(this.getApiUrl("login"), form) as Observable<{ status: boolean, data: string }>;
    }

    /**
     * Register New User
     * 
     * @param data Object
     * @returns 
     */
    doRegister(data: { name: string, email: string, password: string }): Observable<{ status: boolean, data: string }> {
        const form = new FormData();
        form.append("name", data.name);
        form.append("email", data.email);
        form.append("password", data.password);

        return this.http.post(this.getApiUrl("register"), form) as Observable<{ status: boolean, data: string }>;
    }
}
