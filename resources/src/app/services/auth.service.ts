import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { User } from 'app/@types/user';
import { trimStart } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
        this.doLogin = this.doLogin.bind(this);
        this.doRegister = this.doRegister.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.doGetAccount = this.doGetAccount.bind(this);
    }

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

        return origin + "/api/" + trimStart(path, "/");
    }

    /**
     * Login existing user
     * 
     * @param data Object
     * @returns 
     */
    doLogin(data: { email: string, password: string }): Observable<{ status: boolean, data: User }> {
        return new Observable<{ status: boolean, data: User }>((observer: Subscriber<{ status: boolean, data: User }>): void => {

            const form = new FormData();
            form.append("email", data.email);
            form.append("password", data.password);

            const tokenSubscription: Subscription = this.http.post<{ status: boolean, data: string }>(this.getApiUrl("login"), form).subscribe({
                next: (res: { status: boolean, data: string }): void => {

                    this.authToken = res.data;

                    // Todo: fix memory leak
                    this.doGetAccount().subscribe(observer);
                },
                error: (error: Error): void => {
                    observer.error(error);
                },
                complete: (): void => {
                    tokenSubscription.unsubscribe();
                }
            })

        });
    }

    /**
     * Register New User
     * 
     * @param data Object
     * @returns 
     */
    doRegister(data: { name: string, email: string, password: string }): Observable<{ status: boolean, data: User }> {
        return new Observable<{ status: boolean, data: User }>((observer: Subscriber<{ status: boolean, data: User }>): void => {

            const form = new FormData();
            form.append("name", data.name);
            form.append("email", data.email);
            form.append("password", data.password);

            const tokenSubscription: Subscription = this.http.post<{ status: boolean, data: string }>(this.getApiUrl("register"), form).subscribe({
                next: (res: { status: boolean, data: string }): void => {

                    this.authToken = res.data;

                    // Todo: fix memory leak
                    this.doGetAccount().subscribe(observer);
                },
                error: (error: Error): void => {
                    observer.error(error);
                },
                complete: (): void => {
                    tokenSubscription.unsubscribe();
                }
            })

        });
    }

    /**
     * revoke tokens, and  clear local  storage
     * 
     * @returns 
     */
    doLogout(): Observable<{ status: boolean }> {
        return new Observable<{ status: boolean }>((observer: Subscriber<{ status: boolean }>): void => {

            const subscription: Subscription = this.http.get<{ status: boolean }>(this.getApiUrl("revoke/tokens")).subscribe({
                next: (res: { status: boolean }): void => {
                    observer.next(res);
                },
                error: (error: Error): void => {
                    observer.error(error);
                },
                complete: (): void => {
                    localStorage.clear();
                    subscription.unsubscribe();

                    observer.complete();
                }
            })

        });

    }

    doGetAccount(): Observable<{ status: boolean, data: User }> {
        return this.http.get<{ status: boolean, data: User }>(this.getApiUrl("account"));
    }
}
