import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ItemCreatedResponse } from './models/itemCreatedResponse';
import { Property } from './models/property';

@Injectable({
  providedIn: 'root',
})
export class PropertyApiService {
  private propertyApiUrl: string = '/properties';

  constructor(private api: ApiService) {}

  getProperties(companyId: number, offset: number = 0): Observable<Property[]> {
    return this.api.get<Property[]>({
      api: this.propertyApiUrl,
      companyId: companyId,
      offset: offset,
      limit: this.api.defaultLimit,
    });
  }

  getExactProperties(ids: number[]): Observable<Property[]> {
    const range = ids.join(',');
    return this.api.get<Property[]>({
      api: this.propertyApiUrl,
      params: {
        list: range,
      },
    });
  }

  getEnabledProperties(
    companyId: number,
    offset: number = 0,
    limit: number = this.api.maxLimit
  ): Observable<Property[]> {
    return this.api.get<Property[]>({
      api: this.propertyApiUrl,
      companyId: companyId,
      offset: offset,
      limit: limit,
      params: { enabled: true },
    });
  }

  getProperty(id: number): Observable<Property> {
    return this.api.get<Property>({ api: this.propertyApiUrl, id: id });
  }

  addProperty(property: Property): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.propertyApiUrl, {
      title: property.title || null,
      inventoryNumber: property.inventoryNumber || null,
      cost: property.cost || null,
      comment: property.comment || null,
      enabled: property.enabled || null,
      companyId: property.companyId || null,
    });
  }

  updateProperty(id: number, property: Property): Observable<void> {
    return this.api.put(this.propertyApiUrl, id, {
      title: property.title || null,
      inventoryNumber: property.inventoryNumber || null,
      cost: property.cost || null,
      comment: property.comment || null,
      enabled: property.enabled || null,
    });
  }

  deleteProperty(id: number): Observable<void> {
    return this.api.delete(this.propertyApiUrl, id);
  }
}
