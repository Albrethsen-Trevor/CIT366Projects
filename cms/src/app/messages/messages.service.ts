import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MessagesService {
  messagesChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  private messages: Message[] = [];

  constructor(private http: Http) {
    this.initMessages();
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (const message in this.messages) {
      if (this.messages[message].id === id) {
        return this.messages[message];
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message in this.messages) {
      const currentId = parseInt(this.messages[message].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(messages: Message) {
    this.messages.push(messages);
    this.messagesChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  storeMessages() {
    return this.http.put('https://albrethsencms.firebaseio.com/messages.json',
      JSON.stringify(this.messages),
      'Content-type: application/json', )
      .subscribe( () =>
        (this.messagesChangeEvent.next(this.messages.slice()))
      );
  }

  initMessages() {
    this.http.get('https://albrethsencms.firebaseio.com/messages.json')
      .map(
        (response: Response) => {
          const messages: Message[] = response.json();
          return messages;
        }
      )
      .subscribe(
        (messagesReturned: Message[]) => {
          this.messages = messagesReturned;
          this.maxMessageId = this.getMaxId();
          const messagesListClone = this.messages.slice();
          this.messagesChangeEvent.next(messagesListClone);
        }
      );
  }
}
