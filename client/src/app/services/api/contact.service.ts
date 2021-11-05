import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateService } from '../converters/date.service';
import { ApiService } from './api.service';
import { Contact } from './models/contact';
import { ItemCreatedResponse } from './models/itemCreatedResponse';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private contactApiUrl: string = '/contacts';

  constructor(private api: ApiService, private dateService: DateService) {}

  getContacts(
    companyId: number,
    active: boolean,
    offset: number = 0
  ): Observable<Contact[]> {
    return this.api.get<Contact[]>({
      api: this.contactApiUrl,
      companyId: companyId,
      offset: offset,
      limit: this.api.defaultLimit,
      params: {
        active: active,
      },
    });
  }

  getExactContacts(ids: number[]): Observable<Contact[]> {
    const range = ids.join(',');
    return this.api.get<Contact[]>({
      api: this.contactApiUrl,
      params: {
        list: range,
      },
    });
  }

  getContact(id: number): Observable<Contact> {
    return this.api.get<Contact>({ api: this.contactApiUrl, id: id });
  }

  addContact(contact: Contact): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.contactApiUrl, {
      name: contact.name || null,
      phone: contact.phone || null,
      cellphone: contact.cellphone || null,
      email: contact.email || null,
      address: contact.address || null,
      passport: contact.passport || null,
      dob: contact.dob
        ? this.dateService.convertToUtcDateOnly(contact.dob)
        : null,
      note: contact.note || null,
      hired: contact.hired
        ? this.dateService.convertToUtcDateOnly(contact.hired)
        : null,
      fired: contact.fired
        ? this.dateService.convertToUtcDateOnly(contact.fired)
        : null,
      firedNote: contact.firedNote || null,
      photo: contact.photo || null,
      titleId: contact.titleId || null,
      companyId: contact.companyId || null,
    });
  }

  updateContact(id: number, contact: Contact): Observable<void> {
    return this.api.put(this.contactApiUrl, id, {
      name: contact.name || null,
      phone: contact.phone || null,
      cellphone: contact.cellphone || null,
      email: contact.email || null,
      address: contact.address || null,
      passport: contact.passport || null,
      dob: contact.dob
        ? this.dateService.convertToUtcDateOnly(contact.dob)
        : null,
      note: contact.note || null,
      hired: contact.hired
        ? this.dateService.convertToUtcDateOnly(contact.hired)
        : null,
      fired: contact.fired
        ? this.dateService.convertToUtcDateOnly(contact.fired)
        : null,
      firedNote: contact.firedNote || null,
      photo: contact.photo || null,
      titleId: contact.titleId || null,
    });
  }

  deleteContact(id: number): Observable<void> {
    return this.api.delete(this.contactApiUrl, id);
  }
}
