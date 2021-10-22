export class Title {
  id: number = 0;
  name: string = '';
  rate: number = 0;
  enabled: boolean = true;
  created: Date = new Date();
  companyId: number = 0;

  public constructor(init?: Partial<Title>) {
    Object.assign(this, init);
  }
}
