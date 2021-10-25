import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/api/models/user';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { UserApiService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../listPage.css'],
})
export class UsersComponent implements OnInit {
  data: User[] = [];
  selectedItem?: User;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;
  pageIndex: number = 1;

  constructor(private userApi: UserApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(pageIndex: number = this.pageIndex): void {
    this.isLoading = true;
    this.userApi.getUsers((pageIndex - 1) * 10).subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
        this.pageIndex = pageIndex;
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
    this.router.navigate(['/users/new']);
  }

  onEditRequest() {
    this.router.navigate(['/users', this.selectedItem?.id]);
  }
}
