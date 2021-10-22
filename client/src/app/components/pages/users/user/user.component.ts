import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { User } from 'src/app/services/api/models/user';
import { UserApiService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  hidePassword = true;
  item: User = new User();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

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
    if (userId === 0) {
      this.isLoading = false;
    } else {
      this.userApi.getUser(userId).subscribe({
        next: (user) => {
          this.item = user;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    let user = new User({
      id: this.item.id,
      login: this.item.login,
      password: this.item.password,
      admin: this.item.admin,
      enabled: this.item.enabled,
    });

    if (user.id === 0) {
      this.userApi.addUser(user).subscribe({
        next: () => {
          this.navigateToAllUsers();
        },
      });
    } else {
      this.userApi.updateUser(user.id, user).subscribe({
        next: () => {
          this.navigateToAllUsers();
        },
      });
    }
  }

  onDeleteRequest() {
    this.userApi.deleteUser(this.item.id).subscribe({
      next: () => {
        this.navigateToAllUsers();
      },
    });
  }

  private navigateToAllUsers(): void {
    this.router.navigate(['users']);
  }
}
