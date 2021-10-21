import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyApiService } from 'src/app/services/api/company.service';
import { Company } from 'src/app/services/api/models/company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  data: Company[] = [];
  selectedItem?: Company;

  constructor(private companyApi: CompanyApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.companyApi.getCompanies().subscribe({
      next: (data) => {
        this.data = data;
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
    this.router.navigate(['companies/0']);
  }

  onEditRequest() {
    this.router.navigate(['companies', this.selectedItem?.id]);
  }
}
