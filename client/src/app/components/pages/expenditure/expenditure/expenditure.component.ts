import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { ExpenditureApiService } from 'src/app/services/api/expenditure.service';
import { Expenditure } from 'src/app/services/api/models/expenditure';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['../../detailsPage.css'],
})
export class ExpenditureComponent implements OnInit {
  item: Expenditure = new Expenditure();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenditureApi: ExpenditureApiService,
    private userPreferences: UserPreferencesService
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
          this.item = expenditure;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    this.isLoading = true;
    let expenditure = new Expenditure({
      id: this.item.id,
      title: this.item.title,

      rate: this.item.rate,
      comment: this.item.comment,
      enabled: this.item.enabled,
      companyId: this.userPreferences.companyId,
    });

    if (expenditure.id === 0) {
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
        .updateExpenditure(expenditure.id, expenditure)
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
    this.expenditureApi.deleteExpenditure(this.item.id).subscribe({
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
