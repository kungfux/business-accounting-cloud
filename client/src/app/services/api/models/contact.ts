export class Contact {
  id: number | null = null;
  name: string | null = null;
  phone: string | null = null;
  cellphone: string | null = null;
  email: string | null = null;
  address: string | null = null;
  passport: string | null = null;
  dob: Date | null = null;
  note: string | null = null;
  hired: Date | null = null;
  fired: Date | null = null;
  photo: string | null = null;
  avatar: string | null = null;
  title?: string | null = null;
  companyId?: number | null = null;
  created?: Date | null = null;

  public constructor(init?: Partial<Contact>) {
    Object.assign(this, init);
  }
}
