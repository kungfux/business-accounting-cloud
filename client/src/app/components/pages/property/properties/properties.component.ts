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
  properties: Property[] = [];
  selectedProperty?: Property;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;

  constructor(
    private propertyApi: PropertyApiService,
    private router: Router,
    public userPreferences: UserPreferencesService,
    public currency: CurrencyService
  ) {}

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(offset: number = 0): void {
    this.isLoading = true;
    this.propertyApi
      .getProperties(this.userPreferences.companyId!, offset)
      .subscribe({
        next: (properties) => {
          this.properties = properties;
          this.isLoading = false;
        },
      });
  }

  selectProperty(property: Property) {
    if (this.selectedProperty != property) {
      this.selectedProperty = property;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/properties/new']);
  }

  onEditRequest() {
    this.router.navigate(['/properties', this.selectedProperty?.id]);
  }
}
