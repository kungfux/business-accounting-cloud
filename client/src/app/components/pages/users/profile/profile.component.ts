import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CustomButton,
  ToolBarMode,
} from 'src/app/components/common/toolbar/toolbar.component';
import { User } from 'src/app/services/api/models/user';
import { UserApiService } from 'src/app/services/api/user.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../detailsPage.css'],
})
export class ProfileComponent implements OnInit {
  item: User = new User();
  locale: string = '';
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;
  changePasswordButton: CustomButton = new CustomButton(
    'Изменить пароль',
    'pin'
  );

  constructor(
    private userApi: UserApiService,
    private userPreferences: UserPreferencesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.userPreferences.id;
    if (!id) {
      this.isLoading = false;
    } else {
      this.userApi.getUser(id).subscribe({
        next: (user) => {
          this.item = user;
          this.isLoading = false;
        },
      });
    }
    this.locale = this.userPreferences.getLocale();
  }

  onSaveRequest() {
    this.isLoading = true;
    this.userPreferences.setUserSettings(this.locale);
    this.userApi.updateUser(this.userPreferences.id, this.item).subscribe({
      next: () => {
        this.userPreferences.setUserDetails(
          this.item.name,
          this.item.avatar,
          this.item.admin
        );
        this.navigateToDashboard();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onChangePasswordRequest() {
    this.router.navigate([`users/${this.userPreferences.id}/password`]);
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  private navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
