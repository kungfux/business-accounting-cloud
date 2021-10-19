export class User {
  login: string;
  token: string;
  tokenExpirationDate: Date;
  admin: boolean = false;

  constructor(
    login?: string,
    token?: string,
    tokenExpirationDate?: Date,
    admin?: boolean
  ) {
    this.login = login || '';
    this.token = token || '';
    this.tokenExpirationDate = tokenExpirationDate || new Date();
    // TODO: Take from db
    this.admin = admin || true;
  }

  get isAdmin() {
    return this.admin;
  }
}
