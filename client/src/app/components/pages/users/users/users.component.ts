import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/api/models/user';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { UserApiService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  data: User[] = [];
  selectedItem?: User;
  toolBarMode: ToolBarMode = ToolBarMode.List;

  constructor(private userApi: UserApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userApi.getUsers().subscribe({
      next: (data) => {
        this.data = data;
      },
    });
  }

  selectItem(item: User) {
    if (this.selectedItem != item) {
      this.selectedItem = item;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['users/0']);
  }

  onEditRequest() {
    this.router.navigate(['users', this.selectedItem?.id]);
  }
}
