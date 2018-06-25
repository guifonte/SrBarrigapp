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
    this.isLoading = true;
    this.groupsService.getGroups();
    this.userId = this.authService.getUserId();
    this.groupsSub = this.groupsService
      .getGroupUpdateListener()
      .subscribe((groups: Group[]) => {
        this.isLoading = false;
        this.groups = groups;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
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

