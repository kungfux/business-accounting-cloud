export class Company {
  id: number = 0;
  name: string = '';
  logo: string = '';
  enabled: boolean = false;
  created?: Date;

  public constructor(init?: Partial<Company>) {
    Object.assign(this, init);
  }
}
