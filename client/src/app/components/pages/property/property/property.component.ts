import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { Property } from 'src/app/services/api/models/property';
import { PropertyApiService } from 'src/app/services/api/property.service';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['../../detailsPage.css'],
})
export class PropertyComponent implements OnInit {
  property: Property = new Property();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

  constructor(
    public currency: CurrencyService,
    private route: ActivatedRoute,
    private router: Router,
    private propertyApi: PropertyApiService,
    private userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    const propertyId: number = parseInt(
      this.route.snapshot.paramMap.get('id')!
    );
    if (!propertyId) {
      this.isLoading = false;
    } else {
      this.propertyApi.getProperty(propertyId).subscribe({
        next: (property) => {
          this.property = property;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    this.isLoading = true;
    const property = new Property({
      id: this.property.id,
      title: this.property.title,
      inventoryNumber: this.property.inventoryNumber,
      cost: this.property.cost,
      comment: this.property.comment,
      enabled: this.property.enabled,
      companyId: this.userPreferences.companyId,
    });

    if (!property.id) {
      this.propertyApi.addProperty(property).subscribe({
        next: () => {
          this.navigateToAllProperties();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.propertyApi.updateProperty(property.id, property).subscribe({
        next: () => {
          this.navigateToAllProperties();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onDeleteRequest() {
    this.isLoading = true;
    this.propertyApi.deleteProperty(this.property.id!).subscribe({
      next: () => {
        this.navigateToAllProperties();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  private navigateToAllProperties(): void {
    this.router.navigate(['/properties']);
  }
}
