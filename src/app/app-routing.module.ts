import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpendingListComponent } from './spendings/spending-list/spending-list.component';
import { SpendingCreateComponent } from './spendings/spending-create/spending-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'spendings', component: SpendingListComponent, canActivate: [AuthGuard] },
  { path: 'spendings/create', component: SpendingCreateComponent, canActivate: [AuthGuard] },
  { path: 'spendings/edit/:spendingId', component: SpendingCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
