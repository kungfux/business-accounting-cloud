import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';
import { ApiService } from './api.service';
import { CompanyApiService } from './company.service';
import { UserApiService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private loginApiUrl: string = '/login';

  constructor(
    private api: ApiService,
    private userPreferences: UserPreferencesService,
    private userApi: UserApiService,
    private companyApi: CompanyApiService
  ) {}

  authenticate(login: string, password: string): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.api
        .post<LoginResponse>(this.loginApiUrl, {
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
    if (!this.userPreferences.id) {
      this.userPreferences.restoreUser();
    }

    if (
      this.userPreferences.id &&
      Date.parse(new Date().toUTCString()) <
        Date.parse(this.userPreferences.tokenExpirationDate!.toUTCString())
    ) {
      this.getUserPreferences();
      this.getCompanyInfo();
      return true;
    }

    this.userPreferences.resetUser();
    return false;
  }

  getCompanyDetails(companyId: number): void {
    if (companyId) {
      this.companyApi.getCompany(companyId).subscribe({
        next: (company) => {
          this.userPreferences.setCompany(
            company.id!,
            company.name!,
            company.logo!
          );
        },
      });
    }
  }

  private getCompanyInfo(): void {
    let prefferedCompanyId = this.userPreferences.companyId;

    this.companyApi.getEnabledCompanies().subscribe({
      next: (companies) => {
        if (
          prefferedCompanyId &&
          companies.length > 0 &&
          companies.find((x) => x.id == prefferedCompanyId)
        ) {
          this.getCompanyDetails(prefferedCompanyId);
          return;
        }

        if (companies.length > 0) {
          prefferedCompanyId = companies[0].id!;
          this.getCompanyDetails(prefferedCompanyId);
          return;
        }

        this.userPreferences.resetCompany();
      },
    });
  }

  logout(): void {
    this.userPreferences.resetUser();
  }

  private getUserPreferences(): void {
    if (this.userPreferences.id != 0) {
      this.userApi.getUser(this.userPreferences.id!).subscribe({
        next: (user) => {
          this.userPreferences.setUserDetails(
            user.name!,
            user.avatar!,
            user.admin
          );
        },
      });
    }
  }
}

interface LoginResponse {
  id: number;
  token: string;
  expiration: Date;
}
