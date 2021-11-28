import { OperationDefaults } from './operationDefaults';

export class AppUser {
  id: number | null = null;
  login: string | null = null;
  token: string | null = null;
  tokenExpirationDate: Date | null = null;
  name: string | null = null;
  avatar: string | null = null;
  admin: boolean = false;
  companyId: number | null = null;
  companyLogo: string | null = null;
  companyName: string | null = null;
  locale: string = 'ru';
  limit: number = 10;
  operationDefaults?: OperationDefaults[] = [];
}
