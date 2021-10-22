import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ItemCreatedResponse } from './models/itemCreatedResponse';
import { Title } from './models/title';

@Injectable({
  providedIn: 'root',
})
export class TitleApiService {
  private allTitlesEndpoint: string = '/titles';

  private exactTitleEndpoint(id: number): string {
    return `${this.allTitlesEndpoint}/${id}`;
  }

  constructor(private api: ApiService) {}

  getTitles(companyId: number, offset: number = 0): Observable<Title[]> {
    return this.api.get<Title[]>(this.allTitlesEndpoint, offset, companyId);
  }

  getTitle(id: number): Observable<Title> {
    return this.api.get<Title>(this.exactTitleEndpoint(id));
  }

  addTitle(title: Title): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.allTitlesEndpoint, {
      name: title.name,
      rate: title.rate,
      enabled: title.enabled,
      companyId: title.companyId,
    });
  }

  updateTitle(id: number, title: Title): Observable<void> {
    return this.api.put(this.exactTitleEndpoint(id), {
      name: title.name,
      rate: title.rate,
      enabled: title.enabled,
    });
  }

  deleteTitle(id: number): Observable<void> {
    return this.api.delete(this.exactTitleEndpoint(id));
  }
}
