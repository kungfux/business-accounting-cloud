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
  data: Company[] = [];
  selectedItem?: Company;

  private readonly apiEndpoint = '/companies';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.get<Company[]>(this.apiEndpoint).subscribe({
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
    this.router.navigate([`${this.apiEndpoint}/0`]);
  }

  onEditRequest() {
    this.router.navigate([`${this.apiEndpoint}/`, this.selectedItem?.id]);
  }

  onDeleteRequest() {
    if (this.selectedItem) {
      this.api.delete(`${this.apiEndpoint}/${this.selectedItem.id}`).subscribe({
        next: () => {
          this.ngOnInit();
        },
      });
    }
  }
}
