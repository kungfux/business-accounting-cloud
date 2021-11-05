export class Operation {
  id: number | null = null;
  operationDate: Date | null = null;
  amount: number | null = null;
  comment: string | null = null;
  created: Date | null = null;
  contactId: number | null = null;
  propertyId: number | null = null;
  expenditureId: number | null = null;
  companyId: number | null = null;

  public constructor(init?: Partial<Operation>) {
    Object.assign(this, init);
  }
}
