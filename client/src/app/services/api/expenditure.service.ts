import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Expenditure } from './models/expenditure';
import { ItemCreatedResponse } from './models/itemCreatedResponse';

@Injectable({
  providedIn: 'root',
})
export class ExpenditureApiService {
  private allExpendituresEndpoint: string = '/expenditures';

  private exactExpenditureEndpoint(id: number): string {
    return `${this.allExpendituresEndpoint}/${id}`;
  }

  constructor(private api: ApiService) {}

  getExpenditures(
    companyId: number,
    offset: number = 0
  ): Observable<Expenditure[]> {
    return this.api.get<Expenditure[]>(
      this.allExpendituresEndpoint,
      offset,
      companyId
    );
  }

  getExpenditure(id: number): Observable<Expenditure> {
    return this.api.get<Expenditure>(this.exactExpenditureEndpoint(id));
  }

  addExpenditure(expenditure: Expenditure): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.allExpendituresEndpoint, {
      title: expenditure.title,
      rate: expenditure.rate,
      comment: expenditure.comment,
      enabled: expenditure.enabled,
      companyId: expenditure.companyId,
    });
  }

  updateExpenditure(id: number, expenditure: Expenditure): Observable<void> {
    return this.api.put(this.exactExpenditureEndpoint(id), {
      title: expenditure.title,
      rate: expenditure.rate,
      comment: expenditure.comment,
      enabled: expenditure.enabled,
    });
  }

  deleteExpenditure(id: number): Observable<void> {
    return this.api.delete(this.exactExpenditureEndpoint(id));
  }
}
