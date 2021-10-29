import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { Property } from 'src/app/services/api/models/property';
import { PropertyApiService } from 'src/app/services/api/property.service';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['../../listPage.css'],
})
export class PropertiesComponent implements OnInit {
  data: Property[] = [];
  selectedItem?: Property;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;
  pageIndex: number = 1;

  constructor(
    private propertyApi: PropertyApiService,
    private router: Router,
    public userPreferences: UserPreferencesService,
    public currency: CurrencyService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(pageIndex: number = this.pageIndex): void {
    this.isLoading = true;
    this.propertyApi
      .getProperties(this.userPreferences.companyId!, (pageIndex - 1) * 10)
      .subscribe({
        next: (data) => {
          this.data = data;
          this.isLoading = false;
          this.pageIndex = pageIndex;
        },
      });
  }

  selectItem(item: Property) {
    if (this.selectedItem != item) {
      this.selectedItem = item;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/properties/new']);
  }

  onEditRequest() {
    this.router.navigate(['/properties', this.selectedItem?.id]);
  }
}
