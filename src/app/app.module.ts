import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { SpendingCreateComponent } from './spendings/spending-create/spending-create.component';
import { HeaderComponent } from './header/header.component';
import { SpendingListComponent } from './spendings/spending-list/spending-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './home/home.component';
import { GroupCreateComponent } from './groups/group-create/group-create.component';
import { ErrorInterceptor } from './error-interceptor';
import { GroupListComponent } from './groups/group-list/group-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SpendingCreateComponent,
    HeaderComponent,
    SpendingListComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    GroupCreateComponent,
    GroupListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
