import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyApiService } from 'src/app/services/api/company.service';
import { Company } from 'src/app/services/api/models/company';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../../listPage.css'],
})
export class CompaniesComponent implements OnInit {
  data: Company[] = [];
  selectedItem?: Company;
  isLoading = true;

  constructor(
    private companyApi: CompanyApiService,
    private router: Router,
    public userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(offset: number = 0): void {
    this.isLoading = true;
    this.companyApi.getCompanies(offset).subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
      },
    });
  }

  selectItem(item: Company) {
    if (this.selectedItem != item) {
      this.selectedItem = item;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/companies/new']);
  }

  onEditRequest() {
    this.router.navigate(['/companies', this.selectedItem?.id]);
  }
}
