import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyApiService } from 'src/app/services/api/company.service';
import { Company } from 'src/app/services/api/models/company';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent implements OnInit {
  companies: Company[] = [];
  isLoading: boolean = true;

  constructor(
    private companyApi: CompanyApiService,
    private userPreferences: UserPreferencesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.companyApi.getEnabledCompanies().subscribe({
      next: (companies) => {
        this.companies = companies.filter((company) => company.enabled);
        this.isLoading = false;
      },
    });
  }

  onSwitchCompany(id: number, name: string, logo: string): void {
    this.userPreferences.setCompany(id, name, logo);
    this.router.navigate(['/dashboard']);
  }
}
