import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { SpendingCreateComponent } from './spendings/spending-create/spending-create.component';
import { HeaderComponent } from './header/header.component';
import { SpendingListComponent } from './spendings/spending-list/spending-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SpendingCreateComponent,
    HeaderComponent,
    SpendingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
