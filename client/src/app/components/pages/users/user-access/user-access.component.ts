import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { ApiService } from 'src/app/services/api/api.service';
import { CompanyApiService } from 'src/app/services/api/company.service';
import { Access } from 'src/app/services/api/models/access';
import { Company } from 'src/app/services/api/models/company';
import { User } from 'src/app/services/api/models/user';
import { UserApiService } from 'src/app/services/api/user.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
})
export class UserAccessComponent implements OnInit {
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;
  user: User = new User();
  access: Access[] = [];
  companies: Company[] = [];

  @ViewChild('list') list: any;

  constructor(
    public userPreferences: UserPreferencesService,
    private route: ActivatedRoute,
    private location: Location,
    private userApi: UserApiService,
    private companyApi: CompanyApiService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const userId: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (!userId) {
      this.isLoading = false;
    } else {
      this.userApi.getUser(userId).subscribe({
        next: (user) => {
          this.user = user;

          this.companyApi.getCompanies(0, this.api.maxLimit).subscribe({
            next: (companies) => {
              this.companies = companies;

              this.userApi.getAccess(this.user.id!).subscribe({
                next: (access) => {
                  this.access = access;
                  this.isLoading = false;
                },
              });
            },
          });
        },
      });
    }
  }

  isAccessGranted(companyId: number) {
    return this.access.find((x) => x.companyId == companyId);
  }

  onSaveRequest() {
    this.isLoading = true;
    let companies: number[] = [];
    for (let i = 0; i < this.list!.selectedOptions.selected.length; i++) {
      const selectedCompanyId = this.list!.selectedOptions.selected[i].value;
      companies.push(selectedCompanyId);
    }

    this.userApi.setAccess(this.user.id!, companies).subscribe({
      next: () => {
        this.goBackToUser();
      },
    });
  }

  goBackToUser() {
    this.location.back();
  }
}
