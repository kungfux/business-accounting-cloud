import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { ApiService } from 'src/app/services/api/api.service';
import { ItemCreatedResponse } from 'src/app/services/api/itemCreatedResponse';
import { User } from 'src/app/services/api/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  hidePassword = true;
  item: User = new User();
  toolBarMode: ToolBarMode = ToolBarMode.Details;

  private readonly apiEndpoint = '/users';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    const userId = parseInt(id);
    if (userId !== 0) {
      this.api.get<User>(`${this.apiEndpoint}/${id}`).subscribe({
        next: (user) => {
          this.item = user;
        },
      });
    }
  }

  onSaveRequest() {
    if (this.item.id == 0) {
      this.api
        .post<ItemCreatedResponse>(this.apiEndpoint, {
          login: this.item.login,
          password: this.item.password,
          admin: this.item.admin,
          enabled: this.item.enabled,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['users']);
          },
        });
    } else {
      this.api
        .put(`${this.apiEndpoint}/${this.item.id}`, {
          login: this.item.login,
          password: this.item.password,
          admin: this.item.admin,
          enabled: this.item.enabled,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['users']);
          },
        });
    }
  }

  onDeleteRequest() {
    this.api.delete(`${this.apiEndpoint}/${this.item.id}`).subscribe({
      next: () => {
        this.router.navigate(['users']);
      },
    });
  }
}
