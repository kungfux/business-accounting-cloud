import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { CompanyApiService } from 'src/app/services/api/company.service';
import { Company } from 'src/app/services/api/models/company';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../../listPage.css'],
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany?: Company;
  toolBarMode: ToolBarMode = ToolBarMode.List;
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
      next: (companies) => {
        this.companies = companies;
        this.isLoading = false;
      },
    });
  }

  selectCompany(company: Company) {
    if (this.selectedCompany != company) {
      this.selectedCompany = company;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/companies/new']);
  }

  onEditRequest() {
    this.router.navigate(['/companies', this.selectedCompany?.id]);
  }
}
