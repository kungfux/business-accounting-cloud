import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';
import { ApiService } from './api.service';
import { CompanyApiService } from './company.service';
import { UserApiService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private serviceEndpoint: string = '/login';

  constructor(
    private api: ApiService,
    private userPreferences: UserPreferencesService,
    private userApi: UserApiService,
    private companyApi: CompanyApiService
  ) {}

  authenticate(login: string, password: string): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.api
        .post<AuthResponse>(this.serviceEndpoint, {
          username: login,
          password: password,
        })
        .subscribe({
          next: (data) => {
            this.userPreferences.setUser(
              data.id,
              login,
              data.token,
              data.expiration
            );
            subscriber.next(true);
            subscriber.complete();
            this.getUserPreferences();
            this.getCompanyInfo();
          },
          error: () => {
            subscriber.next(false);
            subscriber.complete();
          },
        });
    });
  }

  isAuthenticated(): boolean {
    if (this.userPreferences.id == 0) {
      this.userPreferences.restoreUser();
    }

    if (
      this.userPreferences.id != 0 &&
      Date.parse(new Date().toUTCString()) <
        Date.parse(this.userPreferences.tokenExpirationDate.toUTCString())
    ) {
      this.getUserPreferences();
      this.getCompanyInfo();
      return true;
    }

    this.userPreferences.resetUser();
    return false;
  }

  getCompanyDetails(companyId: number): void {
    if (companyId != 0) {
      this.companyApi.getCompany(companyId).subscribe({
        next: (company) => {
          this.userPreferences.setCompany(
            company.id,
            company.name,
            company.logo
          );
        },
      });
    }
  }

  private getCompanyInfo(): void {
    let companyId = this.userPreferences.companyId;

    if (companyId == 0) {
      // Get any company if no primary
      this.companyApi.getCompanies().subscribe({
        next: (companies) => {
          let enabledCompanies = companies.filter((company) => company.enabled);
          if (enabledCompanies.length > 0) {
            companyId = enabledCompanies[0].id;
            this.getCompanyDetails(companyId);
            return;
          }
        },
      });
    } else {
      this.getCompanyDetails(companyId);
    }
  }

  logout(): void {
    this.userPreferences.resetUser();
  }

  private getUserPreferences(): void {
    if (this.userPreferences.id != 0) {
      this.userApi.getUser(this.userPreferences.id).subscribe({
        next: (user) => {
          this.userPreferences.setUserDetails(
            user.name,
            user.avatar,
            user.admin
          );
        },
      });
    }
  }
}

interface AuthResponse {
  id: number;
  token: string;
  expiration: Date;
}
