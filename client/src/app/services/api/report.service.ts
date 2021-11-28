import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateService } from '../converters/date.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ReportApiService {
  private reportApiUrl: string = '/reports';

  constructor(private api: ApiService, private dateService: DateService) {}

  getPureIncome(companyId: number, from?: Date, to?: Date): Observable<any> {
    return this.api.get<any>({
      api: `${this.reportApiUrl}/pureIncome`,
      companyId: companyId,
      params:
        from !== undefined && to !== undefined
          ? {
              from: this.dateService.convertToUtcDateOnly(from).toISOString(),
              to: this.dateService.convertToUtcDateOnly(to).toISOString(),
            }
          : {},
    });
  }

  getPureIncomeDetalized(
    companyId: number,
    from: Date,
    to: Date,
    detalization: Detalization
  ): Observable<any> {
    return this.api.get<any>({
      api: `${this.reportApiUrl}/pureIncome`,
      companyId: companyId,
      params: {
        from: this.dateService.convertToUtcDateOnly(from).toISOString(),
        to: this.dateService.convertToUtcDateOnly(to).toISOString(),
        detalization: detalization,
      },
    });
  }
}

export enum Detalization {
  month = 'month',
  week = 'week',
  day = 'day',
}
