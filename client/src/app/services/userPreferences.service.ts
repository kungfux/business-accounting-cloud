import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppUser } from './appUser';
import { LocalStorageService } from './localStorage.service';
import { OperationDefaults } from './operationDefaults';

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

  get limit(): number {
    return this.appUser.limit;
  }

  getOperationDefaults(): OperationDefaults | undefined {
    return this.appUser.operationDefaults?.find(
      (x) => x.companyId === this.companyId!
    );
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
      this.appUser.limit = user.limit;
      this.appUser.operationDefaults = user.operationDefaults;
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

  resetCompany(): void {
    this.appUser.companyId = null;
    this.appUser.companyLogo = null;
    this.appUser.companyName = null;
    this.userPreferencesSubject.next(this.appUser);
    this.saveUserToStorage();
  }

  setUserSettings(locale: string, limit: number): void {
    this.appUser.locale = locale;
    this.appUser.limit = limit;
    this.saveUserToStorage();
  }

  setOperationDefaults(operationDefaults: OperationDefaults): void {
    const existingOperationDefaults = this.getOperationDefaults();
    if (existingOperationDefaults !== undefined) {
      existingOperationDefaults.titleId =
        operationDefaults.titleId || existingOperationDefaults.titleId;
      existingOperationDefaults.contactId =
        operationDefaults.contactId || existingOperationDefaults.contactId;
      existingOperationDefaults.propertyId =
        operationDefaults.propertyId || existingOperationDefaults.propertyId;
      existingOperationDefaults.incomeId =
        operationDefaults.incomeId || existingOperationDefaults.incomeId;
      existingOperationDefaults.expenditureId =
        operationDefaults.expenditureId ||
        existingOperationDefaults.expenditureId;
    } else {
      const newOperationDefaults = new OperationDefaults();
      newOperationDefaults.companyId = this.companyId!;
      newOperationDefaults.titleId = operationDefaults.titleId || undefined;
      newOperationDefaults.contactId = operationDefaults.contactId || undefined;
      newOperationDefaults.propertyId =
        operationDefaults.propertyId || undefined;
      newOperationDefaults.incomeId = operationDefaults.incomeId || undefined;
      newOperationDefaults.expenditureId =
        operationDefaults.expenditureId || undefined;
      this.appUser.operationDefaults = [];
      this.appUser.operationDefaults?.push(newOperationDefaults);
    }
    this.saveUserToStorage();
  }

  resetUser(): void {
    const companyId = this.appUser.companyId;
    const locale = this.appUser.locale;
    const operationDefaults = this.appUser.operationDefaults;
    this.appUser = new AppUser();
    this.appUser.companyId = companyId;
    this.appUser.locale = locale;
    this.appUser.operationDefaults = operationDefaults;
    this.saveUserToStorage();
    this.userPreferencesSubject.next(this.appUser);
  }

  private saveUserToStorage(): void {
    this.localStorage.set(this.storageUserKey, this.getUserJSON());
  }

  private getUserJSON() {
    return JSON.stringify({
      id: this.appUser.id,
      token: this.appUser.token,
      tokenExpirationDate: this.appUser.tokenExpirationDate,
      companyId: this.appUser.companyId,
      locale: this.appUser.locale,
      limit: this.appUser.limit,
      operationDefaults: this.appUser.operationDefaults,
    });
  }
}
