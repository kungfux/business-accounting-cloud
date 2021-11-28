import { AfterViewInit, Component } from '@angular/core';
import { ReportApiService } from 'src/app/services/api/report.service';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-company-total-overall',
  templateUrl: './company-total-overall.component.html',
})
export class CompanyTotalOverallComponent implements AfterViewInit {
  isLoading: boolean = true;
  total?: string;

  constructor(
    private reportApi: ReportApiService,
    private userPreferences: UserPreferencesService,
    private currencyService: CurrencyService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCompanyTotal();
    }, 2000);
  }

  getCompanyTotal(): void {
    if (this.userPreferences.companyId) {
      this.reportApi.getTotal(this.userPreferences.companyId).subscribe({
        next: (total) => {
          if (total.total) {
            this.total = this.currencyService.convert(total.total);
          } else {
            this.total = this.currencyService.convert(0)!;
          }
          this.isLoading = false;
        },
      });
    }
  }
}
