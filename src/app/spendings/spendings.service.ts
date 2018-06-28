import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Spending } from './spending.model';
import { UserData } from '../auth/user-data.model';

@Injectable({providedIn: 'root'})
export class SpendingsService {
  private spendings: Spending[] = [];
  private groupId;


  private spendingsUpdated = new Subject<Spending[]>();
  private groupIdStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getGroupId() {
    return this.groupId;
  }

  getGroupIdStatusListener() {
    return this.groupIdStatusListener;
  }

  exitGroup() {
    this.groupId = null;
    this.groupIdStatusListener.next(false);
  }

  getGroup(groupId: string) {
    return this.http.get('http://localhost:3000/api/groups/' + groupId);
  }

  getSpendings(groupId: string) {
    this.groupId = groupId;
    this.groupIdStatusListener.next(true);
    this.http
      .get<{message: string, spendings: any }>(
        'http://localhost:3000/api/spendings/group/' + groupId
      )
      .pipe(map((spendingData) => {
        return spendingData.spendings.map(spending => {
          return {
            id: spending._id,
            value: spending.value,
            description: spending.description,
            date: spending.date,
            payerFirstName: spending.payerFirstName,
            payerLastName: spending.payerLastName,
            creatorId: spending.creatorId,
            groupId: spending.groupId,
            shareList: spending.shareList
          };
        });
      }))
      .subscribe((transformedSpending) => {
        this.spendings = transformedSpending;
        this.spendingsUpdated.next([...this.spendings]);
      });
  }

  getSpendingUpdateListener() {
    return this.spendingsUpdated.asObservable();
  }

  getSpending(id: string) {
    return this.http.get<{_id: string,
                          value: number,
                          description: string,
                          date: Date,
                          payerFirstName: string,
                          payerLastName: string,
                          creatorId: string,
                          groupId: string,
                          shareList: UserData[]
                        }>(
      'http://localhost:3000/api/spendings/' + id
    );
  }

  addSpending(value: number, description: string, idOfGroup: any, shareList: UserData[]) {
    const spending: Spending = {
      id: null,
      value: value,
      description: description,
      payerFirstName: null,
      payerLastName: null,
      date: new Date,
      creatorId: null,
      groupId: idOfGroup,
      shareList: shareList
    };
    this.http.post<{ message: string, spendingId: string }>('http://localhost:3000/api/spendings', spending)
      .subscribe(responseData => {
        const id = responseData.spendingId;
        spending.id = id;
        this.spendings.push(spending);
        this.spendingsUpdated.next([...this.spendings]);
        this.router.navigate(['/spendings/' + idOfGroup]);
      });
  }

  updateSpending(id: string, value: number, description: string, date: Date, idOfGroup: any, shareList: UserData[]) {
    const spending: Spending = {
      id: id,
      value: value,
      description: description,
      payerFirstName: null,
      payerLastName: null,
      date: date,
      creatorId: null,
      groupId: idOfGroup,
      shareList: shareList
    };
    this.http
      .put('http://localhost:3000/api/spendings/' + id, spending)
      .subscribe(response => {
        const updatedSpendings = [...this.spendings];
        const oldSpendingIndex = updatedSpendings.findIndex(s => s.id === spending.id);
        updatedSpendings[oldSpendingIndex] = spending;
        this.spendings = updatedSpendings;
        this.spendingsUpdated.next([...this.spendings]);
        console.log(idOfGroup);
        this.router.navigate(['/spendings/' + idOfGroup]);
      });
  }

  deleteSpending(spendingId: string) {
    this.http.delete('http://localhost:3000/api/spendings/' + spendingId)
      .subscribe(() => {
        const updatedSpendings = this.spendings.filter(spending => spending.id !== spendingId);
        this.spendings = updatedSpendings;
        this.spendingsUpdated.next([...this.spendings]);
      });
  }
}



