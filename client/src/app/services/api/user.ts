export class User {
  login: string;
  token: string;
  tokenExpiration: Date;
  _isAdmin: boolean = false;

  constructor(login?: string, token?: string, expiration?: Date) {
    this.login = login || '';
    this.token = token || '';
    this.tokenExpiration = expiration || new Date();
  }

  get isAdmin() {
    return this._isAdmin;
  }

  set isAdmin(isAdmin: boolean) {
    this._isAdmin = isAdmin;
  }
}
