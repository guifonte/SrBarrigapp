import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Spending } from '../spending.model';
import { SpendingsService } from '../spendings.service';
import { AuthService } from '../../auth/auth.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

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
  groupId: string;

  private spendingsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public spendingsService: SpendingsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('groupId')) {
        this.isLoading = true;
        this.groupId = paramMap.get('groupId');
        this.spendingsService.getSpendings(this.groupId);
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
      } else {
        this.router.navigate(['/groups']);
      }
    });
  }

  onDelete(spendingId: string) {
    this.spendingsService.deleteSpending(spendingId);
  }

  ngOnDestroy() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('groupId')) {
        this.spendingsSub.unsubscribe();
        this.authStatusSub.unsubscribe();
        this.spendingsService.exitGroup();
      }
    });
  }
}

