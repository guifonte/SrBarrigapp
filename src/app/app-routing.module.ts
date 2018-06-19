import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpendingListComponent } from './spendings/spending-list/spending-list.component';
import { SpendingCreateComponent } from './spendings/spending-create/spending-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: SpendingListComponent },
  { path: 'create', component: SpendingCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:spendingId', component: SpendingCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
