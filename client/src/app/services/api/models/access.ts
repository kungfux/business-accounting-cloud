export class Access {
  id: number | null = null;
  userId: number | null = null;
  companyId: number | null = null;
  created: Date | null = null;

  public constructor(init?: Partial<Access>) {
    Object.assign(this, init);
  }
}
