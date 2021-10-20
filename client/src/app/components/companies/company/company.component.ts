import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ItemCreatedResponse } from 'src/app/services/api/itemCreatedResponse';
import { Company } from 'src/app/services/api/models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  company: Company = new Company();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    const companyId = parseInt(id);
    if (companyId !== 0) {
      this.api.get<Company>(`/companies/${id}`).subscribe({
        next: (company) => {
          this.company = company;
        },
      });
    }
  }

  onSaveClick() {
    if (this.company.id == 0) {
      this.api
        .post<ItemCreatedResponse>('/companies', {
          name: this.company.name,
          picture: this.company.picture,
          enabled: this.company.enabled,
        })
        .subscribe({
          next: (data) => {
            this.router.navigate(['companies']);
          },
        });
    } else {
      this.api
        .put(`/companies/${this.company.id}`, {
          name: this.company.name,
          picture: this.company.picture,
          enabled: this.company.enabled,
        })
        .subscribe({
          next: (data) => {
            this.router.navigate(['companies']);
          },
        });
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
