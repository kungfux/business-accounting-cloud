export class Income {
  id: number | null = null;
  title: string | null = null;
  rate: number | null = null;
  comment: string | null = null;
  enabled: boolean = true;
  created: Date | null = null;
  companyId: number | null = null;

  public constructor(init?: Partial<Income>) {
    Object.assign(this, init);
  }
}
