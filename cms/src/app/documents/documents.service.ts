import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  private documents: Document[] = [];

  constructor(private http: Http) {
    this.initDocuments();
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

  // deleteDocument(document: Document) {
  //   if (document === null) {
  //     return;
  //   }
  //
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //
  //   this.documents.splice(pos, 1);
  //   this.documentChangedEvent.emit(this.documents.slice());
  //
  // }

  getMaxId(): number {
    let maxId = 0;
    for (const document in this.documents) {
      const currentId = parseInt(this.documents[document].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if ((!newDocument) || (newDocument === null)) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if ((!originalDocument) || (!newDocument)) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  storeDocuments() {
    return this.http.put('https://albrethsencms.firebaseio.com/documents.json',
                          JSON.stringify(this.documents),
                          'Content-type: application/json', )
                          .subscribe(() =>
                          (this.documentListChangedEvent.next(this.documents.slice()))
      );

  }

  initDocuments() {
    this.http.get('https://albrethsencms.firebaseio.com/documents.json')
      .map(
        (response: Response) => {
          const documents: Document[] = response.json();
          return documents;
        }
      )
      .subscribe(
        (documentsReturned: Document[]) => {
          this.documents = documentsReturned;
          this.maxDocumentId = this.getMaxId();
          const documentsListClone = this.documents.slice();
          this.documentListChangedEvent.next(documentsListClone);
        }
      );
  }
}
