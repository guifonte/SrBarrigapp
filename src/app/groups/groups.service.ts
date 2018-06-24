import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserData } from '../auth/user-data.model';

@Injectable ({providedIn: 'root'})
export class GroupsService {
  private members: UserData[] = [];
  private membersUpdated = new Subject<UserData[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getMemberUpdateListener() {
    return this.membersUpdated.asObservable();
  }

  getMember(email: string) {
    return this.http.get<{userId: string,
                          firstName: string,
                          lastName: string,
                          email: string,
                        }>(
      'http://localhost:3000/api/user/' + email
    );
  }

  deleteMember(userId: string) {
    const updatedMembers = this.members.filter(members => members.userId !== userId);
    this.members = updatedMembers;
    this.membersUpdated.next([...this.members]);
  }
}
