export class Property {
  id: number | null = null;
  title: string | null = null;
  inventory_number: string | null = null;
  cost: number | null = null;
  comment: string | null = null;
  enabled: boolean | null = null;
  created: Date | null = null;
  companyId: number | null = null;

  public constructor(init?: Partial<Property>) {
    Object.assign(this, init);
  }
}
