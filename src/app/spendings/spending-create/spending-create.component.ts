import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Spending } from '../spending.model';
import { SpendingsService } from '../spendings.service';

@Component({
  selector: 'app-spending-create',
  templateUrl: './spending-create.component.html',
  styleUrls: ['./spending-create.component.css']
})
export class SpendingCreateComponent implements OnInit {
  enteredDescription = '';
  enteredValue;
  payer = 'Guilherme';
  spending: Spending;
  isLoading = false;
  mode = 'create';
  private spendingId: string;

  constructor(public spendingsService: SpendingsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('spendingId')) {
        this.mode = 'edit';
        this.spendingId = paramMap.get('spendingId');
        this.isLoading = true;
        this.spendingsService.getSpending(this.spendingId).subscribe(spendingData => {
          this.isLoading = false;
          this.spending = { id: spendingData._id,
                            value: spendingData.value,
                            date: spendingData.date,
                            payer: spendingData.payer,
                            description: spendingData.description
                          };
        });
      } else {
        this.mode = 'create';
        this.spendingId = null;
      }
    });
  }

  onSaveSpending(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.spendingsService.addSpending(form.value.value, form.value.description, this.payer);
    } else {
      this.spendingsService.updateSpending(this.spending.id, form.value.value, form.value.description, this.payer, this.spending.date);
    }
    form.resetForm();
  }
}
