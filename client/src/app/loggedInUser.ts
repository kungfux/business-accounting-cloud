export class LoggedInUser {
  id: number;
  login: string;
  token: string;
  tokenExpirationDate: Date;
  admin: boolean = false;

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
    return this.admin;
  }

  set isAdmin(admin: boolean) {
    this.admin = admin;
  }
}
