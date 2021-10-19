export class User {
  login: string;
  token: string;
  tokenExpirationDate: Date;
  // TODO: Fethc from server
  _isAdmin: boolean = true;

  constructor(login?: string, token?: string, tokenExpirationDate?: Date) {
    this.login = login || '';
    this.token = token || '';
    this.tokenExpirationDate = tokenExpirationDate || new Date();
  }

  get isAdmin() {
    return this._isAdmin;
  }

  set isAdmin(isAdmin: boolean) {
    this._isAdmin = isAdmin;
  }
}
