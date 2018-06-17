import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Spending } from '../spending.model';
import { SpendingsService } from '../spendings.service';

@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.component.html',
  styleUrls: ['./spending-list.component.css']
})

export class SpendingListComponent implements OnInit, OnDestroy {
  spendings: Spending[] = [];
  isLoading = false;
  private spendingsSub: Subscription;

  constructor(public spendingsService: SpendingsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.spendingsService.getSpendings();
    this.spendingsSub = this.spendingsService.getSpendingUpdateListener()
      .subscribe((spendings: Spending[]) => {
        this.isLoading = false;
        this.spendings = spendings;
      });
  }

  onDelete(spendingId: string) {
    this.spendingsService.deleteSpending(spendingId);
  }

  ngOnDestroy() {
    this.spendingsSub.unsubscribe();
  }
}

