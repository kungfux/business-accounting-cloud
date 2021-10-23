export class Expenditure {
  id: number = 0;
  title: string = '';
  rate: number = 0;
  comment: string = '';
  enabled: boolean = true;
  created: Date = new Date();
  companyId: number = 0;

  public constructor(init?: Partial<Expenditure>) {
    Object.assign(this, init);
  }
}
