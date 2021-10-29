export class Title {
  id: number | null = null;
  name: string | null = null;
  rate: number | null = null;
  enabled: boolean = true;
  created: Date | null = null;
  companyId: number | null = null;

  public constructor(init?: Partial<Title>) {
    Object.assign(this, init);
  }
}
