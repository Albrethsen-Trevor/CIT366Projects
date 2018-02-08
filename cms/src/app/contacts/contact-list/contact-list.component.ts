import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact(
      '1',
      'Trevor Albrethsen',
      'trevor.albrethsen@gmail.com',
      '541-971-9212',
      'https://pbs.twimg.com/profile_images/642923299043868672/_QrM-TQR_400x400.jpg',
      null),
    new Contact(
      '2',
      'Anna Albrethsen',
      'kirachem@yahoo.com',
      '541-971-9121',
      'https://pbs.twimg.com/profile_images/3080404703/3478d02d1b03c505b06fc41c5047a862_400x400.jpeg',
      null
    )
  ];

  constructor() { }

  ngOnInit() {
  }

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }

}
