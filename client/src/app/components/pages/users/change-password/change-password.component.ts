import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { UserApiService } from 'src/app/services/api/user.service';

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
    private userApi: UserApiService
  ) {}

  ngOnInit(): void {
    const userId: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (!userId) {
      // TODO: Handle this case
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
          this.goBack();
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  goBack(): void {
    this.location.back();
  }
}
