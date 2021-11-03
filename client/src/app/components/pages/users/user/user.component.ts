import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CustomButton,
  ToolBarMode,
} from 'src/app/components/common/toolbar/toolbar.component';
import { User } from 'src/app/services/api/models/user';
import { UserApiService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../detailsPage.css'],
})
export class UserComponent implements OnInit {
  hidePassword = true;
  user: User = new User();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;
  changePasswordButton: CustomButton = new CustomButton(
    'Изменить пароль',
    'pin'
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    const userId = parseInt(id);
    if (!userId) {
      this.isLoading = false;
    } else {
      this.userApi.getUser(userId).subscribe({
        next: (user) => {
          this.user = user;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    this.isLoading = true;
    const item = new User({
      id: this.user.id,
      login: this.user.login,
      name: this.user.name,
      avatar: this.user.avatar,
      password: this.user.password,
      admin: this.user.admin,
      enabled: this.user.enabled,
    });

    if (!item.id) {
      this.userApi.addUser(item).subscribe({
        next: () => {
          this.navigateToAllUsers();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.userApi.updateUser(item.id!, item).subscribe({
        next: () => {
          this.navigateToAllUsers();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onDeleteRequest() {
    this.isLoading = true;
    this.userApi.deleteUser(this.user.id!).subscribe({
      next: () => {
        this.navigateToAllUsers();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onChangePasswordRequest() {
    this.router.navigate([`users/${this.user.id}/password`]);
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  private navigateToAllUsers(): void {
    this.router.navigate(['/users']);
  }
}
