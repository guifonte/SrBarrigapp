import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserData } from '../auth/user-data.model';
import { AuthService } from '../auth/auth.service';
import { Group } from './group.model';

@Injectable ({providedIn: 'root'})
export class GroupsService {
  private members: UserData[] = [];
  private groups: Group[] = [];
  private membersUpdated = new Subject<UserData[]>();
  private groupsUpdated = new Subject<Group[]>();
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  getGroups() {
    this.http
      .get<{message: string, groups: any }>(
        'http://localhost:3000/api/groups'
      )
      .pipe(map((groupData) => {
        return groupData.groups.map(group => {
          return {
            id: group._id,
            name: group.name,
            adminId: group.adminId,
            members: group.members,
            isOpen: group.isOpen
          };
        });
      }))
      .subscribe((transformedGroup) => {
        this.groups = transformedGroup;
        this.groupsUpdated.next([...this.groups]);
      });
  }

  getGroupUpdateListener() {
    return this.groupsUpdated.asObservable();
  }

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
    members.push({
      userId: this.authService.getUserId(),
      firstName: this.authService.getUserFirstName(),
      lastName: this.authService.getUserLastName(),
      email: this.authService.getUserEmail(),
    });
    const membersAndAdmin = members;
    const group: Group = {
      id: null,
      name: name,
      members: membersAndAdmin,
      adminId: this.authService.getUserId(),
      isOpen: true
    };
    this.http.post<{ message: string }>('http://localhost:3000/api/groups/', group)
      .subscribe( responseData => {
        console.log(responseData.message);
        this.router.navigate(['/groups']);
      });
  }

  deleteMember(userId: string) {
    const updatedMembers = this.members.filter(members => members.userId !== userId);
    this.members = updatedMembers;
    this.membersUpdated.next([...this.members]);
  }

  deleteGroup(groupId: string) {
    this.http.delete('http://localhost:3000/api/groups/' + groupId)
      .subscribe(() => {
        const updatedGroups = this.groups.filter(group => group.id !== groupId);
        this.groups = updatedGroups;
        this.groupsUpdated.next([...this.groups]);
      });
  }
}
