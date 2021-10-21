import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppUser } from './app-user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  userPreferencesSubject = new Subject<AppUser>();

  private appUser = new AppUser();
  private storageUserKey: string = 'app-user';

  get id(): number {
    return this.appUser.id;
  }

  get login(): string {
    return this.appUser.login;
  }

  get token(): string {
    return this.appUser.token;
  }

  get tokenExpirationDate(): Date {
    return this.appUser.tokenExpirationDate;
  }

  get admin(): boolean {
    return this.appUser.admin;
  }

  set admin(admin: boolean) {
    this.appUser.admin = admin;
    this.userPreferencesSubject.next(this.appUser);
  }

  get companyId(): number {
    return this.appUser.companyId;
  }

  get companyPicture(): string {
    return this.appUser.companyPicture;
  }

  get companyName(): string {
    return this.appUser.companyName;
  }

  constructor(private localStorage: LocalStorageService) {}

  restoreUser() {
    let userJSON = this.localStorage.get(this.storageUserKey);
    if (userJSON !== null) {
      let user = JSON.parse(userJSON);
      if (
        user.id !== null &&
        user.token !== null &&
        user.tokenExpirationDate !== null
      ) {
        this.appUser.id = user.id;
        this.appUser.token = user.token;
        this.appUser.tokenExpirationDate = new Date(
          Date.parse(user.tokenExpirationDate)
        );
        this.appUser.companyId = user.companyId;
        this.userPreferencesSubject.next(this.appUser);
      }
    }
  }

  getUserJSON() {
    return JSON.stringify({
      id: this.appUser.id,
      token: this.appUser.token,
      tokenExpirationDate: this.appUser.tokenExpirationDate,
      companyId: this.appUser.companyId,
    });
  }

  setUser(id: number, login: string, token: string, tokenExpirationDate: Date) {
    this.appUser.id = id;
    this.appUser.login = login;
    this.appUser.token = token;
    this.appUser.tokenExpirationDate = tokenExpirationDate;
    this.userPreferencesSubject.next(this.appUser);
    this.saveUserToStorage();
  }

  setCompany(id: number, name: string, picture: string): void {
    this.appUser.companyId = id;
    this.appUser.companyPicture = picture;
    this.appUser.companyName = name;
    this.userPreferencesSubject.next(this.appUser);
    this.saveUserToStorage();
  }

  resetUser(): void {
    let companyId = this.appUser.companyId;
    this.appUser = new AppUser();
    this.appUser.companyId = companyId;
    this.saveUserToStorage();
    this.userPreferencesSubject.next(this.appUser);
  }

  private saveUserToStorage(): void {
    this.localStorage.set(this.storageUserKey, this.getUserJSON());
  }
}
