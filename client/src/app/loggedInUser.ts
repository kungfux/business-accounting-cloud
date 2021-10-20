export class LoggedInUser {
  id: number;
  login: string;
  token: string;
  tokenExpirationDate: Date;
  _isAdmin: boolean = false;
  _companyId: number = 0;
  _companyLogo: string = '';
  _companyName: string = '';

  constructor(
    id?: number,
    login?: string,
    token?: string,
    tokenExpirationDate?: Date
  ) {
    this.id = id || 0;
    this.login = login || '';
    this.token = token || '';
    this.tokenExpirationDate = tokenExpirationDate || new Date();
  }

  get isAdmin() {
    return this._isAdmin;
  }

  set isAdmin(admin: boolean) {
    this._isAdmin = admin;
  }

  get companyId() {
    return this._companyId;
  }

  setCompany(id: number, logo: string, name: string): void {
    this._companyId = id;
    this._companyLogo = logo;
    this._companyName = name;
  }
}
