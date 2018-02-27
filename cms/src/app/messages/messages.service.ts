import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable()
export class MessagesService {
  messagesChangeEvent = new EventEmitter<Message[]>();
  private messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
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

  addMessage(messages: Message) {
    this.messages.push(messages);
    this.messagesChangeEvent.emit(this.messages.slice());
  }
}
