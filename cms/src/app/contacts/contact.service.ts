import {EventEmitter, Injectable} from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const contact in this.contacts) {
      if (this.contacts[contact].id === id) {
        return this.contacts[contact];
      }
    }
    return null;
  }

  deleteContact(contacts: Contact) {
    if (contacts === null) {
      return;
    }

    const pos = this.contacts.indexOf(contacts);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
