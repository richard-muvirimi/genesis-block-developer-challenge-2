import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {RegisterComponent} from './pages/register/register.component';
import {LandingComponent} from './pages/landing/landing.component';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './partials/navbar/navbar.component';
import {FooterComponent} from './partials/footer/footer.component';
import {SidebarComponent} from './partials/sidebar/sidebar.component';
import {AttachTokenInterceptor} from './interceptors/attach-token.interceptor';
import {RequestErrorInterceptor} from './interceptors/request-error.interceptor';
import {AccountComponent} from './pages/account/account.component';
import {UsersComponent} from './pages/users/users.component';
import {UserComponent} from './pages/user/user.component';
import {TodosComponent} from './pages/todos/todos.component';
import {TodoComponent} from './pages/todo/todo.component';
import { ArrayFilterByFieldPipe } from './pipes/array-filter-by-field.pipe';
import { ArrayLengthPipe } from './pipes/array-length.pipe';
import { ArrayFilterByPipe } from './pipes/array-filter-by.pipe';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        NotFoundComponent,
        RegisterComponent,
        LandingComponent,
        AdminPanelComponent,
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        AccountComponent,
        UsersComponent,
        UserComponent,
        TodosComponent,
        TodoComponent,
        ArrayFilterByFieldPipe,
        ArrayLengthPipe,
        ArrayFilterByPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AttachTokenInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestErrorInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
