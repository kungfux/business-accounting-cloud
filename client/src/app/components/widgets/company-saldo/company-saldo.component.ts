import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ReportApiService } from 'src/app/services/api/report.service';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-company-saldo',
  templateUrl: './company-saldo.component.html',
})
export class CompanySaldoComponent implements AfterViewInit {
  isLoading: boolean = true;
  saldo?: string;

  constructor(
    private reportApi: ReportApiService,
    private userPreferences: UserPreferencesService,
    private currencyService: CurrencyService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCompanySaldo();
    }, 5000);
  }

  getCompanySaldo(): void {
    if (this.userPreferences.companyId) {
      this.reportApi.getSaldo(this.userPreferences.companyId).subscribe({
        next: (saldo) => {
          if (saldo.saldo) {
            this.saldo = this.currencyService.convert(saldo.saldo);
          } else {
            this.saldo = this.currencyService.convert(0)!;
          }
          this.isLoading = false;
        },
      });
    }
  }
}
