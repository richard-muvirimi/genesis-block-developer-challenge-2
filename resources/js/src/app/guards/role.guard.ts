import {ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";


export function IsRoleAdminGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const auth: AuthService = inject(AuthService);
    return auth.user.role === 'administrator';
}

export function IsRoleAdminMatch(route: Route, segments: UrlSegment[]): Promise<boolean> | boolean {
    const auth: AuthService = inject(AuthService);
    return auth.user.role === 'administrator';
}
