import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from '../../auth/user-data.model';
import { GroupsService } from '../groups.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

  isLoading = false;
  memberEmail;
  memberEmailValid = true;
  members: UserData[] = [];

  private membersSub: Subscription;

  constructor(public groupsService: GroupsService) {}

  ngOnInit() {
    this.membersSub = this.groupsService
      .getMemberUpdateListener()
      .subscribe((members: UserData[]) => {
        this.isLoading = false;
        this.members = members;
      });
  }

  onGroupCreate() {

  }

  onDeleteMember(userId: string) {
    this.groupsService.deleteMember(userId);
  }

  onAddUser() {
    this.memberEmailValid = false;
    console.log(this.memberEmail);
  }
}
