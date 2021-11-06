import { DatePipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { CompanyApiService } from 'src/app/services/api/company.service';
import { Company } from 'src/app/services/api/models/company';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-company-age',
  templateUrl: './company-age.component.html',
})
export class CompanyAgeComponent implements AfterViewInit {
  isLoading: boolean = true;
  company?: Company = undefined;
  companyAge: string | undefined = undefined;
  companyFound: string | undefined = undefined;

  constructor(
    private companyApi: CompanyApiService,
    private userPreferences: UserPreferencesService,
    private datePipe: DatePipe
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCompanyAge();
    }, 1000);
  }

  getCompanyAge(): void {
    if (this.userPreferences.companyId) {
      this.companyApi.getCompany(this.userPreferences.companyId).subscribe({
        next: (company) => {
          this.company = company;
          this.companyFound = `Основана ${this.datePipe.transform(
            company.created,
            'longDate',
            undefined,
            this.userPreferences.locale
          )}`;
          this.companyAge = this.getAge(company.created!);
          this.isLoading = false;
        },
      });
    }
  }

  getAge(created: Date): string {
    var today = new Date();
    var birthDate = new Date(created);
    var years = today.getFullYear() - birthDate.getFullYear();
    var months = today.getMonth() - birthDate.getMonth();
    var days = today.getDay() - birthDate.getDay();
    if (years > 0) {
      if (years == 1) return `${years} год`;
      if (years < 5) return `${years} года`;
      if (years >= 5) return `${years} лет`;
    }
    if (months > 0) {
      if (months == 1) return `${months} месяц`;
      if (months < 5) return `${months} месяца`;
      if (months >= 5) return `${months} месяцев`;
    }
    if (days > 0) {
      if (days == 1) return `${days} день`;
      if (days < 5) return `${days} дня`;
      if (days >= 5) return `${days} дней`;
    }
    return '0 дней';
  }
}
