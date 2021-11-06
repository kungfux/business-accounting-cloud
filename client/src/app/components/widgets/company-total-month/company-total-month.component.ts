import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReportApiService } from 'src/app/services/api/report.service';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-company-total-month',
  templateUrl: './company-total-month.component.html',
})
export class CompanyTotalMonthComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  title?: string;
  currentYearTotal?: string;
  lastYearTotal?: string;

  constructor(
    private reportApi: ReportApiService,
    private userPreferences: UserPreferencesService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.title = 'Доход за этот месяц';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCurrentMonthTotal();
    }, 3000);
  }

  getCurrentMonthTotal(): void {
    if (this.userPreferences.companyId) {
      const today = new Date();
      const from = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
        0,
        0,
        0,
        0
      );
      const to = new Date(
        today.getFullYear(),
        today.getMonth(),
        31,
        23,
        59,
        59,
        999
      );
      this.reportApi
        .getTotal(this.userPreferences.companyId, from, to)
        .subscribe({
          next: (total) => {
            if (total.total) {
              this.currentYearTotal = this.currencyService.convert(total.total);
            } else {
              this.currentYearTotal = this.currencyService.convert(0)!;
            }
            this.getLastYearSameMonthTotal();
          },
        });
    }
  }

  getLastYearSameMonthTotal(): void {
    if (this.userPreferences.companyId) {
      const today = new Date();
      const from = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        1,
        0,
        0,
        0,
        0
      );
      const to = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        31,
        23,
        59,
        59,
        999
      );
      this.reportApi
        .getTotal(this.userPreferences.companyId, from, to)
        .subscribe({
          next: (total) => {
            if (total.total) {
              this.lastYearTotal = this.currencyService.convert(total.total);
            } else {
              this.lastYearTotal = this.currencyService.convert(0)!;
            }
            this.lastYearTotal = `В прошлом году: ${this.lastYearTotal}`;
            this.isLoading = false;
          },
        });
    }
  }
}
