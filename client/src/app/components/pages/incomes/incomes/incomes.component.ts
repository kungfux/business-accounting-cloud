import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { IncomeApiService } from 'src/app/services/api/income.service';
import { Income } from 'src/app/services/api/models/income';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['../../listPage.css'],
})
export class IncomesComponent implements OnInit {
  incomes: Income[] = [];
  selectedIncome?: Income;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;

  constructor(
    public userPreferences: UserPreferencesService,
    public currency: CurrencyService,
    private incomeApi: IncomeApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIncomes();
  }

  getIncomes(offset: number = 0): void {
    this.isLoading = true;
    this.incomeApi
      .getIncomes(this.userPreferences.companyId!, offset)
      .subscribe({
        next: (incomes) => {
          this.incomes = incomes;
          this.isLoading = false;
        },
      });
  }

  selectIncome(income: Income) {
    if (this.selectedIncome != income) {
      this.selectedIncome = income;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/incomes/new']);
  }

  onEditRequest() {
    this.router.navigate(['/incomes', this.selectedIncome?.id]);
  }
}
