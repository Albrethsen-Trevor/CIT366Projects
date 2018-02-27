import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();

  private documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (const document in this.documents) {
      if (this.documents[document].id === id) {
        return this.documents[document];
      }
    }
    return null;
  }
}
