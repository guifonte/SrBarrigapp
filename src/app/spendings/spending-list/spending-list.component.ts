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
  private spendingsSub: Subscription;

  constructor(public spendingsService: SpendingsService) {}

  ngOnInit() {
    this.spendingsService.getSpendings();
    this.spendingsSub = this.spendingsService.getSpendingUpdateListener()
      .subscribe((spendings: Spending[]) => {
        this.spendings = spendings;
      });
  }

  ngOnDestroy() {
    this.spendingsSub.unsubscribe();
  }
}

