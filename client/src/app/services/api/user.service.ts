import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ItemCreatedResponse } from './models/itemCreatedResponse';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private allUsersEndpoint: string = '/users';

  private exactUserEndpoint(id: number): string {
    return `${this.allUsersEndpoint}/${id}`;
  }

  constructor(private api: ApiService) {}

  getUsers(offset: number = 0): Observable<User[]> {
    return this.api.get<User[]>(this.allUsersEndpoint, offset);
  }

  getUser(id: number): Observable<User> {
    return this.api.get<User>(this.exactUserEndpoint(id));
  }

  addUser(user: User): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.allUsersEndpoint, {
      login: user.login,
      password: user.password,
      name: user.name,
      avatar: user.avatar,
      admin: user.admin,
      enabled: user.enabled,
    });
  }

  updateUser(id: number, user: User): Observable<void> {
    return this.api.put(this.exactUserEndpoint(id), {
      login: user.login,
      name: user.name,
      avatar: user.avatar,
      admin: user.admin,
      enabled: user.enabled,
    });
  }

  changesPassword(
    id: number,
    currentPassword: string,
    newPassword: string
  ): Observable<void> {
    return this.api.patch(this.exactUserEndpoint(id), {
      password: currentPassword,
      newPassword: newPassword,
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.api.delete(this.exactUserEndpoint(id));
  }
}
