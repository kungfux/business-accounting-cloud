import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ItemCreatedResponse } from './itemCreatedResponse';
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

  getCompanies(): Observable<Company[]> {
    return this.api.get<Company[]>(this.allCompaniesEndpoint);
  }

  getCompany(id: number): Observable<Company> {
    return this.api.get<Company>(this.exactCompanyEndpoint(id));
  }

  addCompany(company: Company): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.allCompaniesEndpoint, {
      name: company.name,
      picture: company.picture,
      enabled: company.enabled,
    });
  }

  updateCompany(id: number, company: Company): Observable<void> {
    return this.api.put(this.exactCompanyEndpoint(id), {
      name: company.name,
      picture: company.picture,
      enabled: company.enabled,
    });
  }

  deleteCompany(id: number): Observable<void> {
    return this.api.delete(this.exactCompanyEndpoint(id));
  }
}
