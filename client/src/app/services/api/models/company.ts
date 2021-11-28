export class Company {
  id: number | null = null;
  name: string | null = null;
  logo: string | null = null;
  enabled: boolean = true;
  created: Date | null = null;

  public constructor(init?: Partial<Company>) {
    Object.assign(this, init);
  }
}
