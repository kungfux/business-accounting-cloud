export class User {
  login: string;
  token: string;

  constructor(login: string, token: string) {
    this.login = login;
    this.token = token;
  }
}
