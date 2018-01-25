import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(
      '1',
      'Trevor Albrethsen',
      'trevor.albrethsen@gmail.com',
      '541-971-9212',
      'https://pbs.twimg.com/profile_images/642923299043868672/_QrM-TQR_400x400.jpg',
      null)
  ];

  constructor() { }

  ngOnInit() {
  }

}
