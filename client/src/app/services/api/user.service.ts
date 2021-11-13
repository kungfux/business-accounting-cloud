import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Access } from './models/access';
import { ItemCreatedResponse } from './models/itemCreatedResponse';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private userApiUrl: string = '/users';
  private userAccessApi: string = '/access';

  constructor(private api: ApiService) {}

  getUsers(offset: number = 0): Observable<User[]> {
    return this.api.get<User[]>({
      api: this.userApiUrl,
      offset: offset,
      limit: this.api.defaultLimit,
    });
  }

  getUser(id: number): Observable<User> {
    return this.api.get<User>({ api: this.userApiUrl, id: id });
  }

  addUser(user: User): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.userApiUrl, {
      login: user.login || null,
      password: user.password || null,
      name: user.name || null,
      avatar: user.avatar || null,
      admin: user.admin || null,
      enabled: user.enabled || null,
    });
  }

  updateUser(id: number, user: User): Observable<void> {
    return this.api.put(this.userApiUrl, id, {
      login: user.login || null,
      name: user.name || null,
      avatar: user.avatar || null,
      admin: user.admin || null,
      enabled: user.enabled || null,
    });
  }

  changePassword(
    id: number,
    currentPassword: string,
    newPassword: string
  ): Observable<void> {
    return this.api.patch(this.userApiUrl, id, {
      password: currentPassword || null,
      newPassword: newPassword || null,
    });
  }

  getAccess(id: number): Observable<Access[]> {
    return this.api.get<Access[]>({
      api: this.userAccessApi,
      id: id,
    });
  }

  setAccess(id: number, companyIds: number[]) {
    return this.api.post<ItemCreatedResponse>(this.userAccessApi, {
      id: id,
      companyId: companyIds,
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.api.delete(this.userApiUrl, id);
  }
}
