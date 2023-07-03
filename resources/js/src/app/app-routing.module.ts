import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {IsLoggedGuard, IsLoggedMatch, IsNotLoggedGuard, IsNotLoggedMatch} from './guards/session.guard';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {RegisterComponent} from './pages/register/register.component';
import {LandingComponent} from './pages/landing/landing.component';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {TodosComponent} from './pages/todos/todos.component';
import {TodoComponent} from './pages/todo/todo.component';
import {UsersComponent} from './pages/users/users.component';
import {UserComponent} from './pages/user/user.component';
import {AccountComponent} from './pages/account/account.component';
import {IsRoleAdminGuard, IsRoleAdminMatch} from "./guards/role.guard";

const routes: Routes = [
    {
        path: "",
        canMatch: [IsNotLoggedMatch],
        canActivate: [IsNotLoggedGuard],
        component: LandingComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "login",
            },
            {
                path: "login",
                title: "Login",
                component: LoginComponent
            },
            {
                path: "register",
                title: "Register",
                component: RegisterComponent
            },
        ]
    },
    {
        path: "",
        canMatch: [IsLoggedMatch],
        canActivate: [IsLoggedGuard],
        component: AdminPanelComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "dashboard",
            },
            {
                path: "dashboard",
                title: "Dashboard",
                component: DashboardComponent
            },
            {
                path: "todos",
                title: "Todos",
                component: TodosComponent
            },
            {
                path: "user/:id/todo",
                title: "User",
                canMatch: [IsRoleAdminMatch],
                canActivate: [IsRoleAdminGuard],
                component: TodosComponent
            },
            {
                path: "todos/create",
                title: "create Todo",
                component: TodoComponent
            },
            {
                path: "todo/:id",
                title: "Todo",
                component: TodoComponent
            },
            {
                path: "users",
                title: "Users",
                canMatch: [IsRoleAdminMatch],
                canActivate: [IsRoleAdminGuard],
                component: UsersComponent
            },
            {
                path: "users/create",
                title: "Create User",
                canMatch: [IsRoleAdminMatch],
                canActivate: [IsRoleAdminGuard],
                component: UserComponent
            },
            {
                path: "user/:id",
                title: "User",
                canMatch: [IsRoleAdminMatch],
                canActivate: [IsRoleAdminGuard],
                component: UserComponent
            },

            {
                path: "account",
                title: "Account",
                component: AccountComponent
            },
        ]
    },
    {
        path: "**",
        canMatch: [IsNotLoggedMatch],
        redirectTo: "login",
    },
    {
        path: "**",
        title: "Error 404 | Page Not Found",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
