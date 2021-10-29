import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppUser } from './appUser';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  userPreferencesSubject = new Subject<AppUser>();

  private appUser = new AppUser();
  private storageUserKey: string = 'Preferences';

  get id() {
    return this.appUser.id;
  }

  get login() {
    return this.appUser.login;
  }

  get token() {
    return this.appUser.token;
  }

  get tokenExpirationDate() {
    return this.appUser.tokenExpirationDate;
  }

  get name() {
    return this.appUser.name;
  }

  get avatar() {
    return this.appUser.avatar;
  }

  get admin() {
    return this.appUser.admin;
  }

  get companyId() {
    return this.appUser.companyId;
  }

  get companyLogo() {
    return this.appUser.companyLogo;
  }

  get companyName() {
    return this.appUser.companyName;
  }

  get locale(): string {
    return this.appUser.locale;
  }

  constructor(private localStorage: LocalStorageService) {}

  restoreUser() {
    const userJSON = this.localStorage.get(this.storageUserKey);
    if (userJSON !== null) {
      const user = JSON.parse(userJSON);
      this.appUser.id = user.id;
      this.appUser.token = user.token;
      this.appUser.tokenExpirationDate = new Date(
        Date.parse(user.tokenExpirationDate)
      );
      this.appUser.companyId = user.companyId;
      this.appUser.locale = user.locale;
      this.userPreferencesSubject.next(this.appUser);
    }
  }

  setUser(id: number, login: string, token: string, tokenExpirationDate: Date) {
    this.appUser.id = id;
    this.appUser.login = login;
    this.appUser.token = token;
    this.appUser.tokenExpirationDate = tokenExpirationDate;
    this.userPreferencesSubject.next(this.appUser);
    this.saveUserToStorage();
  }

  setUserDetails(name: string, avatar: string, admin: boolean) {
    this.appUser.name = name;
    this.appUser.avatar = avatar;
    this.appUser.admin = admin;
    this.userPreferencesSubject.next(this.appUser);
  }

  setCompany(id: number, name: string, logo: string): void {
    this.appUser.companyId = id;
    this.appUser.companyLogo = logo;
    this.appUser.companyName = name;
    this.userPreferencesSubject.next(this.appUser);
    this.saveUserToStorage();
  }

  setUserSettings(locale: string): void {
    this.appUser.locale = locale;
    this.saveUserToStorage();
  }

  resetUser(): void {
    const companyId = this.appUser.companyId;
    const locale = this.appUser.locale;
    this.appUser = new AppUser();
    this.appUser.companyId = companyId;
    this.appUser.locale = locale;
    this.saveUserToStorage();
    this.userPreferencesSubject.next(this.appUser);
  }

  private saveUserToStorage(): void {
    // TODO: Remove next time
    this.localStorage.remove('app-user');
    this.localStorage.set(this.storageUserKey, this.getUserJSON());
  }

  getUserJSON() {
    return JSON.stringify({
      id: this.appUser.id,
      token: this.appUser.token,
      tokenExpirationDate: this.appUser.tokenExpirationDate,
      companyId: this.appUser.companyId,
      locale: this.appUser.locale,
    });
  }
}
