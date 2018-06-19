import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Spending } from '../spending.model';
import { SpendingsService } from '../spendings.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.component.html',
  styleUrls: ['./spending-list.component.css']
})

export class SpendingListComponent implements OnInit, OnDestroy {
  spendings: Spending[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;

  private spendingsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public spendingsService: SpendingsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.spendingsService.getSpendings();
    this.userId = this.authService.getUserId();
    this.spendingsSub = this.spendingsService
      .getSpendingUpdateListener()
      .subscribe((spendings: Spending[]) => {
        this.isLoading = false;
        this.spendings = spendings;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(spendingId: string) {
    this.spendingsService.deleteSpending(spendingId);
  }

  ngOnDestroy() {
    this.spendingsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}

