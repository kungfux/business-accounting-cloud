import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { User } from 'src/app/services/api/models/user';
import { UserApiService } from 'src/app/services/api/user.service';
import { AppUser } from 'src/app/services/appUser';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../detailsPage.css'],
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  appUser: AppUser = new AppUser();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

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
          this.user = user;
          this.isLoading = false;
        },
      });
    }
    this.appUser.locale = this.userPreferences.locale;
    this.appUser.limit = this.userPreferences.limit;
  }

  onSaveRequest() {
    this.isLoading = true;
    this.userPreferences.setUserSettings(
      this.appUser.locale,
      this.appUser.limit
    );
    this.userApi.updateUser(this.userPreferences.id!, this.user).subscribe({
      next: () => {
        this.userPreferences.setUserDetails(
          this.user.name!,
          this.user.avatar!,
          this.user.admin
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
