import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Group } from '../group.model';
import { GroupsService } from '../groups.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})

export class GroupListComponent implements OnInit, OnDestroy {
  groups: Group[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;

  private groupsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public groupsService: GroupsService, private authService: AuthService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
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
                            creatorId: spendingData.creatorId
                          };
        });
      } else {
        this.mode = 'create';
        this.spendingId = null;
      }
    });
  }

  onDelete(groupId: string) {
    this.groupsService.deleteGroup(groupId);
  }

  ngOnDestroy() {
    this.groupsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}

