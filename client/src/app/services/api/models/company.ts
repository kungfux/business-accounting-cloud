export class Company {
  id: number = 0;
  name: string = '';
  picture: string = '';
  enabled: boolean = false;
  created: Date = new Date();

  public constructor(init?: Partial<Company>) {
    Object.assign(this, init);
  }
}
