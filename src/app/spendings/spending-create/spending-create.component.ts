import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Spending } from '../spending.model';
import { SpendingsService } from '../spendings.service';
import { UserData } from '../../auth/user-data.model';
import { Group } from '../../groups/group.model';
import { MatSelectionList } from '@angular/material';

@Component({
  selector: 'app-spending-create',
  templateUrl: './spending-create.component.html',
  styleUrls: ['./spending-create.component.css']
})
export class SpendingCreateComponent implements OnInit {
  enteredDescription = '';
  enteredValue;
  members: UserData[] = [];
  spending: Spending;
  isLoading = false;
  selectedMembers: UserData[] = [];
  mode = 'create';
  private spendingId: string;
  private groupId: string;

  @ViewChild(MatSelectionList) memberList: MatSelectionList;

  constructor(public spendingsService: SpendingsService, public route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('groupId')) {
        this.isLoading = true;
        this.groupId = paramMap.get('groupId');
        this.spendingsService.getGroup(this.groupId).subscribe((group: Group) => {
          this.members = group.members;
          });
        if (paramMap.has('spendingId')) {
          this.mode = 'edit';
          this.spendingId = paramMap.get('spendingId');
          this.spendingsService.getSpending(this.spendingId).subscribe(spendingData => {
            this.isLoading = false;
            this.spending = { id: spendingData._id,
                              value: spendingData.value,
                              date: spendingData.date,
                              payerFirstName: spendingData.payerFirstName,
                              payerLastName: spendingData.payerLastName,
                              description: spendingData.description,
                              creatorId: spendingData.creatorId,
                              groupId: spendingData.groupId,
                              shareList: spendingData.shareList
                            };
            this.selectedMembers = this.spending.shareList;
          });
        } else {
          this.mode = 'create';
          this.spendingId = null;
          this.isLoading = false;
        }
      } else {
        this.router.navigate(['/groups']);
      }
    });
  }

  byId(item1: UserData, item2: UserData) {
    return item1.userId === item2.userId;
  }

  onSaveSpending(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const shareList = this.memberList.selectedOptions.selected
      .map(item => item.value);
    if (shareList.length === 0) {
      alert('Select the people to share this spending');
      return;
    }
    const shareListUserData = shareList.map<UserData>(member => {
      return {
        userId: member.userId,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email
      };
    });
    this.isLoading = true;
    if (this.mode === 'create') {
      this.spendingsService.addSpending(form.value.value, form.value.description, this.groupId, shareListUserData);
    } else {
      this.spendingsService.updateSpending(
        this.spending.id,
        form.value.value,
        form.value.description,
        this.spending.date,
        this.groupId,
        shareListUserData
      );
    }
    form.resetForm();
  }
}
