import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ItemCreatedResponse } from './models/itemCreatedResponse';
import { Property } from './models/property';

@Injectable({
  providedIn: 'root',
})
export class PropertyApiService {
  private allPropertiesEndpoint: string = '/properties';

  private exactPropertyEndpoint(id: number): string {
    return `${this.allPropertiesEndpoint}/${id}`;
  }

  constructor(private api: ApiService) {}

  getProperties(companyId: number, offset: number = 0): Observable<Property[]> {
    return this.api.get<Property[]>(
      this.allPropertiesEndpoint,
      offset,
      companyId
    );
  }

  getProperty(id: number): Observable<Property> {
    return this.api.get<Property>(this.exactPropertyEndpoint(id));
  }

  addProperty(property: Property): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.allPropertiesEndpoint, {
      title: property.title,
      inventoryNumber: property.inventoryNumber,
      cost: property.cost,
      comment: property.comment,
      enabled: property.enabled,
      companyId: property.companyId,
    });
  }

  updateProperty(id: number, property: Property): Observable<void> {
    return this.api.put(this.exactPropertyEndpoint(id), {
      title: property.title,
      inventoryNumber: property.inventoryNumber,
      cost: property.cost,
      comment: property.comment,
      enabled: property.enabled,
    });
  }

  deleteProperty(id: number): Observable<void> {
    return this.api.delete(this.exactPropertyEndpoint(id));
  }
}
