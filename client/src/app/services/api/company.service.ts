import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ItemCreatedResponse } from './models/itemCreatedResponse';
import { Company } from './models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyApiService {
  private companyApiUrl: string = '/companies';

  constructor(private api: ApiService) {}

  getCompanies(offset: number = 0): Observable<Company[]> {
    return this.api.get<Company[]>({
      api: this.companyApiUrl,
      offset: offset,
      limit: this.api.defaultLimit,
    });
  }

  getCompany(id: number): Observable<Company> {
    return this.api.get<Company>({
      api: this.companyApiUrl,
      id: id,
    });
  }

  addCompany(company: Company): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.companyApiUrl, {
      name: company.name || null,
      logo: company.logo || null,
      enabled: company.enabled || null,
    });
  }

  updateCompany(id: number, company: Company): Observable<void> {
    return this.api.put(this.companyApiUrl, id, {
      name: company.name || null,
      logo: company.logo || null,
      enabled: company.enabled || null,
    });
  }

  deleteCompany(id: number): Observable<void> {
    return this.api.delete(this.companyApiUrl, id);
  }
}
