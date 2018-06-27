import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { SpendingsService } from '../spendings/spendings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  groupIsActive = false;
  groupId;
  userFirstName;
  private authListenerSubs: Subscription;
  private groupIdListenerSubs: Subscription;

  constructor(private authService: AuthService, private spendingService: SpendingsService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userFirstName = this.authService.getUserFirstName();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userFirstName = this.authService.getUserFirstName();
      });
      this.groupIdListenerSubs = this.spendingService
      .getGroupIdStatusListener()
      .subscribe(groupIsActive => {
        this.groupId = this.spendingService.getGroupId();
        this.groupIsActive = groupIsActive;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authService.getAuthStatusListener().unsubscribe();
  }
}
