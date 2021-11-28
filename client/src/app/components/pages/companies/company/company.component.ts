import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { CompanyApiService } from 'src/app/services/api/company.service';
import { Company } from 'src/app/services/api/models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['../../detailsPage.css'],
})
export class CompanyComponent implements OnInit {
  company: Company = new Company();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyApi: CompanyApiService
  ) {}

  ngOnInit(): void {
    const companyId: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (!companyId) {
      this.isLoading = false;
    } else {
      this.companyApi.getCompany(companyId).subscribe({
        next: (company) => {
          this.company = company;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    this.isLoading = true;
    let company = new Company({
      id: this.company.id,
      name: this.company.name,
      logo: this.company.logo,
      enabled: this.company.enabled,
    });

    if (!company.id) {
      this.companyApi.addCompany(company).subscribe({
        next: () => {
          this.navigateToAllCompanies();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.companyApi.updateCompany(company.id!, company).subscribe({
        next: () => {
          this.navigateToAllCompanies();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onDeleteRequest() {
    this.isLoading = true;
    this.companyApi.deleteCompany(this.company.id!).subscribe({
      next: () => {
        this.navigateToAllCompanies();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  private navigateToAllCompanies(): void {
    this.router.navigate(['/companies']);
  }
}
