import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../services/api/models/contact';

@Pipe({ name: 'contact' })
export class ContactPipe implements PipeTransform {
  transform(contacts: Contact[], id: number): string | null | undefined {
    return contacts.find((x) => x.id == id)?.name;
  }
}
