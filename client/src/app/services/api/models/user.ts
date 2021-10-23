export class User {
  id: number = 0;
  login: string = '';
  name: string = '';
  avatar: string = '';
  password: string = '';
  admin: boolean = false;
  enabled: boolean = false;
  created: Date = new Date();

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
