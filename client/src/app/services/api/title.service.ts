import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ItemCreatedResponse } from './models/itemCreatedResponse';
import { Title } from './models/title';

@Injectable({
  providedIn: 'root',
})
export class TitleApiService {
  private titleApiUrl: string = '/titles';

  constructor(private api: ApiService) {}

  getTitles(companyId: number, offset: number = 0): Observable<Title[]> {
    return this.api.get<Title[]>({
      api: this.titleApiUrl,
      companyId: companyId,
      offset: offset,
      limit: this.api.defaultLimit,
    });
  }

  getEnabledTitles(companyId: number): Observable<Title[]> {
    return this.api.get<Title[]>({
      api: this.titleApiUrl,
      companyId: companyId,
      params: {
        enabled: true,
        limit: 999,
      },
    });
  }

  getExactTitles(ids: number[]): Observable<Title[]> {
    const range = ids.join(',');
    return this.api.get<Title[]>({
      api: this.titleApiUrl,
      params: {
        list: range,
      },
    });
  }

  getTitle(id: number): Observable<Title> {
    return this.api.get<Title>({ api: this.titleApiUrl, id: id });
  }

  addTitle(title: Title): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.titleApiUrl, {
      name: title.name,
      rate: title.rate,
      enabled: title.enabled,
      companyId: title.companyId,
    });
  }

  updateTitle(id: number, title: Title): Observable<void> {
    return this.api.put(this.titleApiUrl, id, {
      name: title.name,
      rate: title.rate,
      enabled: title.enabled,
    });
  }

  deleteTitle(id: number): Observable<void> {
    return this.api.delete(this.titleApiUrl, id);
  }
}
