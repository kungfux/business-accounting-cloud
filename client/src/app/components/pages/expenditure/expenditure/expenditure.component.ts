import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { ExpenditureApiService } from 'src/app/services/api/expenditure.service';
import { Expenditure } from 'src/app/services/api/models/expenditure';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['../../detailsPage.css'],
})
export class ExpenditureComponent implements OnInit {
  expenditure: Expenditure = new Expenditure();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenditureApi: ExpenditureApiService,
    private userPreferences: UserPreferencesService,
    public currency: CurrencyService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    const propertyId = parseInt(id);
    if (!propertyId) {
      this.isLoading = false;
    } else {
      this.expenditureApi.getExpenditure(propertyId).subscribe({
        next: (expenditure) => {
          this.expenditure = expenditure;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    this.isLoading = true;
    const expenditure = new Expenditure({
      id: this.expenditure.id,
      title: this.expenditure.title,
      rate: this.expenditure.rate || null,
      comment: this.expenditure.comment || null,
      enabled: this.expenditure.enabled,
      companyId: this.userPreferences.companyId,
    });

    if (!expenditure.id) {
      this.expenditureApi.addExpenditure(expenditure).subscribe({
        next: () => {
          this.navigateToAllExpenditure();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.expenditureApi
        .updateExpenditure(expenditure.id!, expenditure)
        .subscribe({
          next: () => {
            this.navigateToAllExpenditure();
          },
          error: () => {
            this.isLoading = false;
          },
        });
    }
  }

  onDeleteRequest() {
    this.isLoading = true;
    this.expenditureApi.deleteExpenditure(this.expenditure.id!).subscribe({
      next: () => {
        this.navigateToAllExpenditure();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  private navigateToAllExpenditure(): void {
    this.router.navigate(['/expenditures']);
  }
}
