import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { ExpenditureApiService } from 'src/app/services/api/expenditure.service';
import { Expenditure } from 'src/app/services/api/models/expenditure';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrls: ['../../listPage.css'],
})
export class ExpendituresComponent implements OnInit {
  expenditures: Expenditure[] = [];
  selectedExpenditure?: Expenditure;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;

  constructor(
    private expenditureApi: ExpenditureApiService,
    private router: Router,
    public userPreferences: UserPreferencesService,
    public currency: CurrencyService
  ) {}

  ngOnInit(): void {
    this.getExpenditures();
  }

  getExpenditures(offset: number = 0): void {
    this.isLoading = true;
    this.expenditureApi
      .getExpenditures(this.userPreferences.companyId!, offset)
      .subscribe({
        next: (expenditures) => {
          this.expenditures = expenditures;
          this.isLoading = false;
        },
      });
  }

  selectExpenditure(expenditure: Expenditure) {
    if (this.selectedExpenditure != expenditure) {
      this.selectedExpenditure = expenditure;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/expenditures/new']);
  }

  onEditRequest() {
    this.router.navigate(['/expenditures', this.selectedExpenditure?.id]);
  }
}
