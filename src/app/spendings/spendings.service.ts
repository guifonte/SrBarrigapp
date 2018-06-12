import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Spending } from './spending.model';

@Injectable({providedIn: 'root'})
export class SpendingsService {
  private spendings: Spending[] = [];
  private spendingsUpdated = new Subject<Spending[]>();

  getSpendings() {
    return [...this.spendings];
  }

  getSpendingUpdateListener() {
    return this.spendingsUpdated.asObservable();
  }

  addSpending(value: number, description: string, payer: string) {
    const spending: Spending = {value: value, description: description, date: new Date, payer: payer};
    this.spendings.push(spending);
    this.spendingsUpdated.next([...this.spendings]);
  }
}


