import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Spending } from './spending.model';

@Injectable({providedIn: 'root'})
export class SpendingsService {
  private spendings: Spending[] = [];
  private spendingsUpdated = new Subject<Spending[]>();

  constructor(private http: HttpClient) {}

  getSpendings() {
    this.http.get<{message: string, spendings: Spending[]}>('http://localhost:3000/api/spendings')
      .subscribe((spendingData) => {
        this.spendings = spendingData.spendings;
        this.spendingsUpdated.next([...this.spendings]);
      });
  }

  getSpendingUpdateListener() {
    return this.spendingsUpdated.asObservable();
  }

  addSpending(value: number, description: string, payer: string) {
    const spending: Spending = { id: null, value: value, description: description, date: new Date, payer: payer};
    this.http.post<{ message: string }>('http://localhost:3000/api/spendings', spending)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.spendings.push(spending);
        this.spendingsUpdated.next([...this.spendings]);
      });
  }
}


