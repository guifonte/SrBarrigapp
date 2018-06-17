import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpendingListComponent } from './spendings/spending-list/spending-list.component';
import { SpendingCreateComponent } from './spendings/spending-create/spending-create.component';

const routes: Routes = [
  { path: '', component: SpendingListComponent },
  { path: 'create', component: SpendingCreateComponent },
  { path: 'edit/:spendingId', component: SpendingCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
