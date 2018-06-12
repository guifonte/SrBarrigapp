import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Spending } from '../spending.model';
import { SpendingsService } from '../spendings.service';

@Component({
  selector: 'app-spending-create',
  templateUrl: './spending-create.component.html',
  styleUrls: ['./spending-create.component.css']
})
export class SpendingCreateComponent {
  enteredDescription = '';
  enteredValue;
  payer = 'Guilherme';

  constructor(public spendingsService: SpendingsService) {}

  onAddSpending(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.spendingsService.addSpending(form.value.value, form.value.description, this.payer);
    form.resetForm();
  }
}
