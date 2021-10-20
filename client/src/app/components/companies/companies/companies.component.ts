import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Company } from 'src/app/services/api/models/company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany?: Company;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.get<Company[]>('/companies').subscribe({
      next: (data) => {
        this.companies = data;
      },
    });
  }

  selectCompany(company: Company) {
    if (this.selectedCompany != company) {
      this.selectedCompany = company;
    } else {
      this.onEditClick();
    }
  }

  onCreateClick() {
    this.router.navigate(['companies/0']);
  }
  onEditClick() {
    this.router.navigate(['companies/', this.selectedCompany?.id]);
  }
  onDeleteClick() {
    if (this.selectedCompany) {
      this.api.delete(`/companies/${this.selectedCompany.id}`).subscribe({
        next: (data) => {
          this.ngOnInit();
        },
      });
    }
  }
}
