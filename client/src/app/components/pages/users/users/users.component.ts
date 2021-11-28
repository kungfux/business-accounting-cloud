import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { User } from 'src/app/services/api/models/user';
import { UserApiService } from 'src/app/services/api/user.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../listPage.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;

  constructor(
    public userPreferences: UserPreferencesService,
    private userApi: UserApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(offset: number = 0): void {
    this.isLoading = true;
    this.userApi.getUsers(offset).subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
    });
  }

  selectUser(user: User) {
    if (this.selectedUser != user) {
      this.selectedUser = user;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/users/new']);
  }

  onEditRequest() {
    this.router.navigate(['/users', this.selectedUser?.id]);
  }
}
