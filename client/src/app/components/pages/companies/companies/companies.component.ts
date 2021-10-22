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
  isLoading = true;
  pageIndex: number = 1;

  constructor(private companyApi: CompanyApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(pageIndex: number = this.pageIndex): void {
    this.isLoading = true;
    this.companyApi.getCompanies((pageIndex - 1) * 10).subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
        this.pageIndex = pageIndex;
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
