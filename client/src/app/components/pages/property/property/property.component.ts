import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { Property } from 'src/app/services/api/models/property';
import { PropertyApiService } from 'src/app/services/api/property.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['../../detailsPage.css'],
})
export class PropertyComponent implements OnInit {
  item: Property = new Property();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyApi: PropertyApiService,
    private userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    const propertyId = parseInt(id);
    if (propertyId === 0) {
      this.isLoading = false;
    } else {
      this.propertyApi.getProperty(propertyId).subscribe({
        next: (property) => {
          this.item = property;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    let property = new Property({
      id: this.item.id,
      title: this.item.title,
      inventory_number: this.item.inventory_number,
      cost: this.item.cost,
      comment: this.item.comment,
      enabled: this.item.enabled,
      companyId: this.userPreferences.companyId,
    });

    if (property.id === 0) {
      this.propertyApi.addProperty(property).subscribe({
        next: () => {
          this.navigateToAllProperties();
        },
      });
    } else {
      this.propertyApi.updateProperty(property.id, property).subscribe({
        next: () => {
          this.navigateToAllProperties();
        },
      });
    }
  }

  onDeleteRequest() {
    this.propertyApi.deleteProperty(this.item.id).subscribe({
      next: () => {
        this.navigateToAllProperties();
      },
    });
  }

  private navigateToAllProperties(): void {
    this.router.navigate(['properties']);
  }
}
