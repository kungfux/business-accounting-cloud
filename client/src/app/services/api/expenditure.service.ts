import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Expenditure } from './models/expenditure';
import { ItemCreatedResponse } from './models/itemCreatedResponse';

@Injectable({
  providedIn: 'root',
})
export class ExpenditureApiService {
  private expenditureApiUrl: string = '/expenditures';

  constructor(private api: ApiService) {}

  getExpenditures(
    companyId: number,
    offset: number = 0
  ): Observable<Expenditure[]> {
    return this.api.get<Expenditure[]>({
      api: this.expenditureApiUrl,
      companyId: companyId,
      offset: offset,
      limit: this.api.defaultLimit,
    });
  }

  getExpenditure(id: number): Observable<Expenditure> {
    return this.api.get<Expenditure>({ api: this.expenditureApiUrl, id: id });
  }

  addExpenditure(expenditure: Expenditure): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.expenditureApiUrl, {
      title: expenditure.title,
      rate: expenditure.rate,
      comment: expenditure.comment,
      enabled: expenditure.enabled,
      companyId: expenditure.companyId,
    });
  }

  updateExpenditure(id: number, expenditure: Expenditure): Observable<void> {
    return this.api.put(this.expenditureApiUrl, id, {
      title: expenditure.title,
      rate: expenditure.rate,
      comment: expenditure.comment,
      enabled: expenditure.enabled,
    });
  }

  deleteExpenditure(id: number): Observable<void> {
    return this.api.delete(this.expenditureApiUrl, id);
  }
}
