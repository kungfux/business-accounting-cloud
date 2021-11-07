import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Income } from './models/income';
import { ItemCreatedResponse } from './models/itemCreatedResponse';

@Injectable({
  providedIn: 'root',
})
export class IncomeApiService {
  private incomeApiUrl: string = '/incomes';

  constructor(private api: ApiService) {}

  getIncomes(companyId: number, offset: number = 0): Observable<Income[]> {
    return this.api.get<Income[]>({
      api: this.incomeApiUrl,
      companyId: companyId,
      offset: offset,
      limit: this.api.defaultLimit,
    });
  }

  getExactIncomes(ids: number[]): Observable<Income[]> {
    const range = ids.join(',');
    return this.api.get<Income[]>({
      api: this.incomeApiUrl,
      params: {
        list: range,
      },
    });
  }

  getEnabledIncomes(
    companyId: number,
    offset: number = 0,
    limit: number = this.api.maxLimit
  ): Observable<Income[]> {
    return this.api.get<Income[]>({
      api: this.incomeApiUrl,
      companyId: companyId,
      offset: offset,
      limit: limit,
      params: { enabled: true },
    });
  }

  getIncome(id: number): Observable<Income> {
    return this.api.get<Income>({ api: this.incomeApiUrl, id: id });
  }

  addIncome(income: Income): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.incomeApiUrl, {
      title: income.title || null,
      rate: income.rate || null,
      comment: income.comment || null,
      enabled: income.enabled || null,
      companyId: income.companyId || null,
    });
  }

  updateIncome(id: number, income: Income): Observable<void> {
    return this.api.put(this.incomeApiUrl, id, {
      title: income.title || null,
      rate: income.rate || null,
      comment: income.comment || null,
      enabled: income.enabled || null,
    });
  }

  deleteIncome(id: number): Observable<void> {
    return this.api.delete(this.incomeApiUrl, id);
  }
}
