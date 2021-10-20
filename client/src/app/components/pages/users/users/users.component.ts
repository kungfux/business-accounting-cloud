import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { User } from 'src/app/services/api/models/user';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  data: User[] = [];
  selectedItem?: User;
  toolBarMode: ToolBarMode = ToolBarMode.List;

  private readonly apiEndpoint = '/users';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.get<User[]>(this.apiEndpoint).subscribe({
      next: (data) => {
        this.data = data;
      },
    });
  }

  selectItem(item: User) {
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
}
