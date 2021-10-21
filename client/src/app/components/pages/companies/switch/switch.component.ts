import { Component, OnInit } from '@angular/core';
import { CompanyApiService } from 'src/app/services/api/company.service';
import { Company } from 'src/app/services/api/models/company';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent implements OnInit {
  companies: Company[] = [];
  hover: string = '';

  constructor(private companyApi: CompanyApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.companyApi.getCompanies().subscribe({
      next: (data) => {
        this.companies = data.filter((company) => company.enabled);
      },
    });
  }

  onSwitchCompany(id: number): void {
    // TODO: Switch company and navigate to dashboard
  }
}
