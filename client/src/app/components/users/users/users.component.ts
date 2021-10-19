import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { User } from 'src/app/services/api/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.get<User[]>('/users').subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  onCreateClick() {
    this.router.navigate(['users/0']);
  }
  onEditClick() {
    this.router.navigate(['users/', this.selectedUser?.id]);
  }
  onDeleteClick() {
    if (this.selectedUser) {
      this.api.delete(`/users/${this.selectedUser.id}`).subscribe({
        next: (data) => {
          this.ngOnInit();
        },
      });
    }
  }
}
