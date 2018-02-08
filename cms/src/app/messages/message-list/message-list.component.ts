import {Component, OnInit} from '@angular/core';

import {Message} from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(
      '1',
      'Greetings',
      'Hello. How are you doing?',
      'Trevor Albrethsen'
    ),
    new Message(
      '2',
      'Salutations',
      'Not bad. How are you doing?',
      'Anna Albrethsen'
    ),
    new Message(
      '3',
      'Same',
      'Same. Are you doing anything after work?',
      'Trevor Albrethsen'
    ),
    new Message(
      '4',
      'Dinner',
      'I was actually wondering if you wanted to go out to dinner tonight?',
      'Anna Albrethsen'
    ),
    new Message(
      '5',
      'Date',
      'Sounds like a date!',
      'Trevor Albrethsen'
    )
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
