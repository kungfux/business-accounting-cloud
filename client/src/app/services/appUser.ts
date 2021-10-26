export class AppUser {
  id: number = 0;
  login: string = '';
  token: string = '';
  tokenExpirationDate: Date = new Date();
  name: string = '';
  avatar: string = '';
  admin: boolean = false;
  companyId: number = 0;
  companyLogo: string = '';
  companyName: string = '';
  locale: string = 'en-US';
}
