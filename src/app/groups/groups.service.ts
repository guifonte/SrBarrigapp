import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from '../auth/user-data.model';
import { AuthService } from '../auth/auth.service';
import { Group } from './group.model';

@Injectable ({providedIn: 'root'})
export class GroupsService {
  private members: UserData[] = [];
  private membersUpdated = new Subject<UserData[]>();
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  getMemberUpdateListener() {
    this.membersUpdated.next([...this.members]);
    return this.membersUpdated.asObservable();
  }

  getMember(email: string) {
    this.http
      .get<{userId: string, firstName: string, lastName: string, email: string}>(
        'http://localhost:3000/api/user/' + email
      )
      .subscribe(responseData => {
        if (this.members.findIndex(x => x.email === email) !== -1) {
          alert('This member was already added.');
        } else if (this.authService.getUserId() === responseData.userId) {
          alert('You are already a member.');
        } else {
          this.members.push(responseData);
          console.log(responseData);
          this.membersUpdated.next([...this.members]);
        }
      });
  }

  addGroup(name: string, members: UserData[]) {
    const group: Group = {
      id: null,
      name: name,
      members: members,
      adminId: this.authService.getUserId(),
      isOpen: true
    };
    this.http.post<{ message: string }>('http://localhost:3000/api/groups/', group)
      .subscribe( responseData => {
        console.log(responseData.message);
        this.router.navigate(['/']);
      });
  }

  deleteMember(userId: string) {
    const updatedMembers = this.members.filter(members => members.userId !== userId);
    this.members = updatedMembers;
    this.membersUpdated.next([...this.members]);
  }
}
