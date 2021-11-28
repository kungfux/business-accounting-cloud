export class User {
  id: number | null = null;
  login: string | null = null;
  name: string | null = null;
  avatar: string | null = null;
  password: string | null = null;
  admin: boolean = false;
  enabled: boolean = false;
  created: Date | null = null;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
