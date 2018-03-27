import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Document } from '../document.model';
import {DocumentsService} from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[];
  private subscription: Subscription;

  constructor(private documentsService: DocumentsService) {
    this.documents = this.documentsService.getDocuments();
  }

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();
    this.subscription = this.documentsService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
