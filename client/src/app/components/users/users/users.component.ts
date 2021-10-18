import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.users = this.api.get<User[]>('/users').subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }
}

class User {}
