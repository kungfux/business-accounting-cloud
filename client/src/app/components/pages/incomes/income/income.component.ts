import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { IncomeApiService } from 'src/app/services/api/income.service';
import { Income } from 'src/app/services/api/models/income';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['../../detailsPage.css'],
})
export class IncomeComponent implements OnInit {
  income: Income = new Income();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

  constructor(
    public currency: CurrencyService,
    private route: ActivatedRoute,
    private router: Router,
    private incomeApi: IncomeApiService,
    private userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    const incomeId: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (!incomeId) {
      this.isLoading = false;
    } else {
      this.incomeApi.getIncome(incomeId).subscribe({
        next: (income) => {
          this.income = income;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    this.isLoading = true;
    const income = new Income({
      id: this.income.id,
      title: this.income.title,
      rate: this.income.rate,
      comment: this.income.comment,
      enabled: this.income.enabled,
      companyId: this.userPreferences.companyId,
    });

    if (!income.id) {
      this.incomeApi.addIncome(income).subscribe({
        next: () => {
          this.navigateToAllIncomes();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.incomeApi.updateIncome(income.id!, income).subscribe({
        next: () => {
          this.navigateToAllIncomes();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onDeleteRequest() {
    this.isLoading = true;
    this.incomeApi.deleteIncome(this.income.id!).subscribe({
      next: () => {
        this.navigateToAllIncomes();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  private navigateToAllIncomes(): void {
    this.router.navigate(['/incomes']);
  }
}
