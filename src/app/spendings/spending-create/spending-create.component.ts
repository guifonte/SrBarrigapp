import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  spending: Spending;
  isLoading = false;
  mode = 'create';
  private spendingId: string;
  private groupId: string;

  constructor(public spendingsService: SpendingsService, public route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('groupId')) {
        this.groupId = paramMap.get('groupId');
        if (paramMap.has('spendingId')) {
          this.mode = 'edit';
          this.spendingId = paramMap.get('spendingId');
          this.isLoading = true;
          this.spendingsService.getSpending(this.spendingId).subscribe(spendingData => {
            this.isLoading = false;
            console.log(spendingData);
            this.spending = { id: spendingData._id,
                              value: spendingData.value,
                              date: spendingData.date,
                              payerFirstName: spendingData.payerFirstName,
                              payerLastName: spendingData.payerLastName,
                              description: spendingData.description,
                              creatorId: spendingData.creatorId,
                              groupId: spendingData.groupId
                            };
          });
        } else {
          this.mode = 'create';
          this.spendingId = null;
        }
      } else {
        this.router.navigate(['/groups']);
      }
    });
  }

  onSaveSpending(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.spendingsService.addSpending(form.value.value, form.value.description, this.groupId);
    } else {
      this.spendingsService.updateSpending(
        this.spending.id,
        form.value.value,
        form.value.description,
        this.spending.date,
        this.groupId
      );
    }
    form.resetForm();
  }
}
