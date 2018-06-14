import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Spending } from './spending.model';

@Injectable({providedIn: 'root'})
export class SpendingsService {
  private spendings: Spending[] = [];
  private spendingsUpdated = new Subject<Spending[]>();

  constructor(private http: HttpClient) {}

  getSpendings() {
    this.http
      .get<{message: string, spendings: any }>(
        'http://localhost:3000/api/spendings'
      )
      .pipe(map((spendingData) => {
        return spendingData.spendings.map(spending => {
          return {
            id: spending._id,
            value: spending.value,
            description: spending.description,
            date: spending.date,
            payer: spending.payer
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

  addSpending(value: number, description: string, payer: string) {
    const spending: Spending = { id: null, value: value, description: description, date: new Date, payer: payer};
    this.http.post<{ message: string, spendingId: string }>('http://localhost:3000/api/spendings', spending)
      .subscribe(responseData => {
        const id = responseData.spendingId;
        spending.id = id;
        this.spendings.push(spending);
        this.spendingsUpdated.next([...this.spendings]);
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



