import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscriber, Subscription} from 'rxjs';
import {LoginData, RegisterUserData, User, UserResponse} from 'app/@types/user';
import {AuthResponse, MessageResponse} from "../@types/misc";
import {ApiUtil} from "../utils/api.util";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
        this.getApiUrl = this.getApiUrl.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.doRegister = this.doRegister.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.doGetAccount = this.doGetAccount.bind(this);
    }

    get authToken(): string {
        return localStorage.getItem("token") || "";
    }

    set authToken(token: string) {
        localStorage.setItem("token", token);
    }

    get hasToken(): boolean {
        return this.authToken.length !== 0;
    }

    get isLoggedIn(): boolean {
        return this.hasToken
    }

    get defaultUser(): User {
        return {
            id: 0,
            name: "",
            email: "",
            role: "",
            email_verified_at: "",
            created_at: "",
            updated_at: ""
        };
    }

    get user(): User {
        const data: string | null = sessionStorage.getItem("user");

        if (data === null) {
            return this.defaultUser;
        }

        return JSON.parse(data);
    }

    set user(user: User) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    /**
     * Login existing user
     *
     * @param data Object
     * @returns
     */
    doLogin(data: LoginData): Observable<UserResponse> {
        return new Observable<UserResponse>((observer: Subscriber<UserResponse>): void => {

            const form: FormData = new FormData();
            form.append("email", data.email);
            form.append("password", data.password);

            const tokenSubscription: Subscription = this.http.post<AuthResponse>(this.getApiUrl("login"), form).subscribe({
                next: (res: AuthResponse): void => {

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
    doRegister(data: RegisterUserData): Observable<UserResponse> {
        return new Observable<UserResponse>((observer: Subscriber<UserResponse>): void => {

            const form: FormData = new FormData();
            form.append("name", data.name);
            form.append("email", data.email);
            form.append("password", data.password);

            const tokenSubscription: Subscription = this.http.post<AuthResponse>(this.getApiUrl("register"), form).subscribe({
                next: (res: AuthResponse): void => {

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
    doLogout(): Observable<MessageResponse> {
        return new Observable<MessageResponse>((observer: Subscriber<MessageResponse>): void => {

            const subscription: Subscription = this.http.get<MessageResponse>(this.getApiUrl("revoke/tokens")).subscribe({
                next: (res: MessageResponse): void => {
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

    doGetAccount(): Observable<UserResponse> {
        return new Observable<UserResponse>((observer: Subscriber<UserResponse>): void => {

            const subscription: Subscription = this.http.get<UserResponse>(this.getApiUrl("account")).subscribe({
                next: (res: UserResponse): void => {
                    this.user = res.data;

                    observer.next(res);
                },
                error: (error: Error): void => {
                    observer.error(error);
                },
                complete: (): void => {
                    subscription.unsubscribe();
                    observer.complete();
                }
            });

        });
    }

    private getApiUrl(path: string = ""): string {
        return ApiUtil.getApiUrl(path, "");
    }
}
