export class Property {
  id: number | null = null;
  title: string | null = null;
  inventoryNumber: string | null = null;
  cost: number | null = null;
  comment: string | null = null;
  enabled: boolean | null = true;
  created: Date | null = null;
  companyId: number | null = null;

  public constructor(init?: Partial<Property>) {
    Object.assign(this, init);
  }
}
