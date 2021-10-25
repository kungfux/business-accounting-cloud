import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ItemCreatedResponse } from './models/itemCreatedResponse';
import { Company } from './models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyApiService {
  private allCompaniesEndpoint: string = '/companies';

  private exactCompanyEndpoint(id: number): string {
    return `${this.allCompaniesEndpoint}/${id}`;
  }

  constructor(private api: ApiService) {}

  getCompanies(offset: number = 0): Observable<Company[]> {
    return this.api.get<Company[]>(this.allCompaniesEndpoint, offset);
  }

  getCompany(id: number): Observable<Company> {
    return this.api.get<Company>(this.exactCompanyEndpoint(id));
  }

  addCompany(company: Company): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.allCompaniesEndpoint, {
      name: company.name,
      logo: company.logo,
      enabled: company.enabled,
    });
  }

  updateCompany(id: number, company: Company): Observable<void> {
    return this.api.put(this.exactCompanyEndpoint(id), {
      name: company.name,
      logo: company.logo,
      enabled: company.enabled,
    });
  }

  deleteCompany(id: number): Observable<void> {
    return this.api.delete(this.exactCompanyEndpoint(id));
  }
}