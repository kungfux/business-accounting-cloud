import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any = [];
  selectedUser?: User;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.users = this.api.get<User[]>('/users').subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  onCreateClick() {}
  onEditClick() {}
  onDeleteClick() {}
}

export interface User {
  id: number;
  login: string;
}
