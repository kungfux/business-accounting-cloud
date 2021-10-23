export class Property {
  id: number = 0;
  title: string = '';
  inventory_number: string = '';
  cost: number = 0;
  comment: string = '';
  enabled: boolean = true;
  created: Date = new Date();
  companyId: number = 0;

  public constructor(init?: Partial<Property>) {
    Object.assign(this, init);
  }
}
