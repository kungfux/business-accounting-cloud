import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { ExpenditureApiService } from 'src/app/services/api/expenditure.service';
import { Expenditure } from 'src/app/services/api/models/expenditure';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrls: ['../../listPage.css'],
})
export class ExpendituresComponent implements OnInit {
  data: Expenditure[] = [];
  selectedItem?: Expenditure;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;
  pageIndex: number = 1;

  constructor(
    private expenditureApi: ExpenditureApiService,
    private router: Router,
    private userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(pageIndex: number = this.pageIndex): void {
    this.isLoading = true;
    this.expenditureApi
      .getExpenditures(this.userPreferences.companyId, (pageIndex - 1) * 10)
      .subscribe({
        next: (data) => {
          this.data = data;
          this.isLoading = false;
          this.pageIndex = pageIndex;
        },
      });
  }

  selectItem(item: Expenditure) {
    if (this.selectedItem != item) {
      this.selectedItem = item;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/expenditures/new']);
  }

  onEditRequest() {
    this.router.navigate(['/expenditures', this.selectedItem?.id]);
  }
}
