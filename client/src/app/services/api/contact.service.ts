import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Contact } from './models/contact';
import { ItemCreatedResponse } from './models/itemCreatedResponse';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private contactApiUrl: string = '/contacts';

  constructor(private api: ApiService) {}

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

  getContact(id: number): Observable<Contact> {
    return this.api.get<Contact>({ api: this.contactApiUrl, id: id });
  }

  addContact(contact: Contact): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.contactApiUrl, {
      name: contact.name,
      phone: contact.phone,
      cellphone: contact.cellphone,
      email: contact.email,
      address: contact.address,
      passport: contact.passport,
      dob: contact.dob,
      note: contact.note,
      hired: contact.hired,
      fired: contact.fired,
      firedNote: contact.firedNote,
      photo: contact.photo,
      titleId: contact.titleId,
      companyId: contact.companyId,
    });
  }

  updateContact(id: number, contact: Contact): Observable<void> {
    return this.api.put(this.contactApiUrl, id, {
      name: contact.name,
      phone: contact.phone,
      cellphone: contact.cellphone,
      email: contact.email,
      address: contact.address,
      passport: contact.passport,
      dob: contact.dob,
      note: contact.note,
      hired: contact.hired,
      fired: contact.fired,
      firedNote: contact.firedNote,
      photo: contact.photo,
      titleId: contact.titleId,
    });
  }

  deleteContact(id: number): Observable<void> {
    return this.api.delete(this.contactApiUrl, id);
  }
}
