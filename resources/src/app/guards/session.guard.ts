import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

export function IsLoggedGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const auth: AuthService = inject(AuthService);
    const router: Router = inject(Router)

    if (!auth.isLoggedIn === true) {
        return router.navigate(['/login'])
    }
    return auth.isLoggedIn
}

export function IsLoggedMatch(route: Route, segments: UrlSegment[]): Promise<boolean> | boolean {
    const auth: AuthService = inject(AuthService);
    return auth.isLoggedIn
}

export function IsNotLoggedGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const auth: AuthService = inject(AuthService);
    const router: Router = inject(Router)

    if (auth.isLoggedIn === true) {
        return router.navigate(['/dashboard'])
    }
    return !auth.isLoggedIn
}

export function IsNotLoggedMatch(route: Route, segments: UrlSegment[]): Promise<boolean> | boolean {
    const auth: AuthService = inject(AuthService);
    return !auth.isLoggedIn
}
