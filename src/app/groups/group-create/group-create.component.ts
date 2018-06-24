import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from '../../auth/user-data.model';
import { GroupsService } from '../groups.service';
import { Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

  isLoading = false;
  memberEmail;
  groupName;
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

  onGroupCreate(groupName: NgModel) {
    if (groupName.invalid) {
      return;
    }
    if (this.members.length <= 0) {
      alert('Your group should have some members.');
      return;
    }
    this.isLoading = true;
    this.groupsService.addGroup(this.groupName, this.members);
  }

  onDeleteMember(userId: string) {
    this.groupsService.deleteMember(userId);
  }

  onAddUser() {
    this.groupsService.getMember(this.memberEmail);
  }
}
