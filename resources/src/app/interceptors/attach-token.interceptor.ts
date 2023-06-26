import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/auth.service';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const token = this.authService.authToken;
        if (token.length !== 0) {
            // Works because login and register, the token would be empty

            const tokenizedReq = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
            });

            return next.handle(tokenizedReq);
        }

        return next.handle(request);
    }
}
