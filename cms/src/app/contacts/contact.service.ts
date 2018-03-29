import {EventEmitter, Injectable} from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  contacts: Contact[] = [];

  constructor(private http: Http) {
    this.initContacts();
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

  // deleteContact(contacts: Contact) {
  //   if (contacts === null) {
  //     return;
  //   }
  //
  //   const pos = this.contacts.indexOf(contacts);
  //   if (pos < 0) {
  //     return;
  //   }
  //
  //   this.contacts.splice(pos, 1);
  //   this.contactChangedEvent.emit(this.contacts.slice());
  // }

  getMaxId(): number {
    let maxId = 0;
    for (let contact in this.contacts) {
      let currentId = parseInt(this.contacts[contact].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact == null) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if ((!originalContact) || (!newContact)) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  storeContacts() {
    return this.http.put('https://albrethsencms.firebaseio.com/contacts.json',
      JSON.stringify(this.contacts),
      'Content-type: application/json', )
      .subscribe(() =>
        (this.contactListChangedEvent.next(this.contacts.slice())));
  }

  initContacts() {
    this.http.get('https://albrethsencms.firebaseio.com/contacts.json')
      .map(
        (response: Response) => {
          const contacts: Contact[] = response.json();
          return contacts;
        }
      )
      .subscribe(
        (contactsReturned: Contact[]) => {
          this.contacts = contactsReturned;
          this.maxContactId = this.getMaxId();
          const contactsListClone = this.contacts.slice();
          this.contactListChangedEvent.next(contactsListClone);
        }
      );
  }
}
