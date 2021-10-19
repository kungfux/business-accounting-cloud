import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { User } from 'src/app/services/api/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}
  hidePassword = true;
  user: User = new User();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    const userId = parseInt(id);
    if (userId !== 0) {
      this.api.get<User>(`/users/${id}`).subscribe({
        next: (user) => {
          this.user = user;
        },
      });
    }
  }

  onSaveClick() {
    if (this.user.id == 0) {
      this.api
        .post<UserCreatedResponse>('/users', {
          login: this.user.login,
          password: this.user.password,
        })
        .subscribe({
          next: (data) => {
            this.router.navigate(['users']);
          },
        });
    } else {
      this.api
        .put(`/users/${this.user.id}`, {
          login: this.user.login,
          password: this.user.password,
        })
        .subscribe({
          next: (data) => {
            this.router.navigate(['users']);
          },
        });
    }
  }
}

interface UserCreatedResponse {
  id: number;
}
