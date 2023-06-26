import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LandingComponent } from './pages/landing/landing.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { SettingsPanelComponent } from './partials/settings-panel/settings-panel.component';
import { AttachTokenInterceptor } from './interceptors/attach-token.interceptor';
import { RequestErrorInterceptor } from './interceptors/request-error.interceptor';

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
        SettingsPanelComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule
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
export class AppModule { }
