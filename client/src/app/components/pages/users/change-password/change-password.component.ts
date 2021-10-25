import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/services/api/user.service';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  id: number = 0;
  currentPassword: string = '';
  newPassword: string = '';
  repeatPassword: string = '';
  hidePassword = true;

  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = false;

  constructor(
    private location: Location,
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
      this.navigateToAllUsers();
      return;
    }
    this.id = userId;
  }

  changePassword(): void {
    this.isLoading = true;
    this.userApi
      .changesPassword(this.id, this.currentPassword, this.newPassword)
      .subscribe({
        next: () => {
          this.navigateToUser();
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  private navigateToUser(): void {
    this.router.navigate(['/users', this.id]);
  }

  private navigateToAllUsers(): void {
    this.router.navigate(['/users']);
  }

  goBack(): void {
    this.location.back();
  }
}
