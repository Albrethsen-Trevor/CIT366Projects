import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Contact } from '../contact.model';
import {ContactService} from '../contact.service';



@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  term: string = '';
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
    );
  }

  onKeyPress(value: string) {
    this.term = value;
  }
}
