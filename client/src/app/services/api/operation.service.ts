import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateService } from '../converters/date.service';
import { ApiService } from './api.service';
import { ItemCreatedResponse } from './models/itemCreatedResponse';
import { Operation } from './models/operation';

@Injectable({
  providedIn: 'root',
})
export class OperationApiService {
  private operationApiUrl: string = '/operations';

  constructor(private api: ApiService, private dateService: DateService) {}

  getOperations(
    companyId: number,
    from?: Date,
    to?: Date,
    offset: number = 0
  ): Observable<Operation[]> {
    return this.api.get<Operation[]>({
      api: this.operationApiUrl,
      companyId: companyId,
      offset: offset,
      limit: this.api.defaultLimit,
      params:
        from !== undefined && to !== undefined
          ? {
              from: this.dateService.convertToUtcDateOnly(from).toISOString(),
              to: this.dateService.convertToUtcDateOnly(to).toISOString(),
            }
          : {},
    });
  }

  getOperation(id: number): Observable<Operation> {
    return this.api.get<Operation>({ api: this.operationApiUrl, id: id });
  }

  addOperation(operation: Operation): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.operationApiUrl, {
      operationDate: operation.operationDate
        ? this.dateService.convertToUtcDateOnly(operation.operationDate)
        : null,
      amount: operation.amount || null,
      comment: operation.comment || null,
      contactId: operation.contactId || null,
      propertyId: operation.propertyId || null,
      incomeId: operation.incomeId || null,
      expenditureId: operation.expenditureId || null,
      companyId: operation.companyId || null,
    });
  }

  updateOperation(id: number, operation: Operation): Observable<void> {
    return this.api.put(this.operationApiUrl, id, {
      operationDate: operation.operationDate
        ? this.dateService.convertToUtcDateOnly(operation.operationDate)
        : null,
      amount: operation.amount || null,
      comment: operation.comment || null,
      contactId: operation.contactId || null,
      propertyId: operation.propertyId || null,
      incomeId: operation.incomeId || null,
      expenditureId: operation.expenditureId || null,
    });
  }

  deleteOperation(id: number): Observable<void> {
    return this.api.delete(this.operationApiUrl, id);
  }
}
