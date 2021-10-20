import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { ApiService } from 'src/app/services/api/api.service';
import { ItemCreatedResponse } from 'src/app/services/api/itemCreatedResponse';
import { Company } from 'src/app/services/api/models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  item: Company = new Company();
  toolBarMode: ToolBarMode = ToolBarMode.Details;

  private readonly apiEndpoint = '/companies';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    const companyId = parseInt(id);
    if (companyId !== 0) {
      this.api.get<Company>(`${this.apiEndpoint}/${id}`).subscribe({
        next: (company) => {
          this.item = company;
        },
      });
    }
  }

  onSaveRequest() {
    if (this.item.id == 0) {
      this.api
        .post<ItemCreatedResponse>(this.apiEndpoint, {
          name: this.item.name,
          picture: this.item.picture,
          enabled: this.item.enabled,
        })
        .subscribe({
          next: (data) => {
            this.router.navigate(['companies']);
          },
        });
    } else {
      this.api
        .put(`${this.apiEndpoint}/${this.item.id}`, {
          name: this.item.name,
          picture: this.item.picture,
          enabled: this.item.enabled,
        })
        .subscribe({
          next: (data) => {
            this.router.navigate(['companies']);
          },
        });
    }
  }

  onDeleteRequest() {
    this.api.delete(`${this.apiEndpoint}/${this.item.id}`).subscribe({
      next: () => {
        this.router.navigate(['companies']);
      },
    });
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
