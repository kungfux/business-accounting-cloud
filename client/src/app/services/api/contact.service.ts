import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Contact } from './models/contact';
import { ItemCreatedResponse } from './models/itemCreatedResponse';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private allContactsEndpoint: string = '/contacts';

  private exactContactEndpoint(id: number): string {
    return `${this.allContactsEndpoint}/${id}`;
  }

  constructor(private api: ApiService) {}

  getContacts(companyId: number, offset: number = 0): Observable<Contact[]> {
    return this.api.get<Contact[]>(this.allContactsEndpoint, offset, companyId);
  }

  getContact(id: number): Observable<Contact> {
    return this.api.get<Contact>(this.exactContactEndpoint(id));
  }

  addContact(contact: Contact): Observable<ItemCreatedResponse> {
    return this.api.post<ItemCreatedResponse>(this.allContactsEndpoint, {
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
      photo: contact.photo,
      avatar: contact.avatar,
      title: contact.title,
      companyId: contact.companyId,
    });
  }

  updateContact(id: number, contact: Contact): Observable<void> {
    return this.api.put(this.exactContactEndpoint(id), {
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
      photo: contact.photo,
      avatar: contact.avatar,
      title: contact.title,
    });
  }

  deleteContact(id: number): Observable<void> {
    return this.api.delete(this.exactContactEndpoint(id));
  }
}
