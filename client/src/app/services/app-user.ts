export class AppUser {
  id: number = 0;
  login: string = '';
  token: string = '';
  tokenExpirationDate: Date = new Date();
  admin: boolean = false;
  companyId: number = 0;
  companyLogo: string = '';
  companyName: string = '';
}
