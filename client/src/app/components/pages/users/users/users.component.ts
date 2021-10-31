import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/api/models/user';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { UserApiService } from 'src/app/services/api/user.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

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

  constructor(
    private userApi: UserApiService,
    private router: Router,
    public userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(offset: number = 0): void {
    this.isLoading = true;
    this.userApi.getUsers(offset).subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
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
