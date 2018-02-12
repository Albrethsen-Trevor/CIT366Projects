import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document (
      '1',
      'CIT 260 - Object Oriented Programming',
      'In this course you will the Java programming language by designing and creating a simple game.',
      'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html',
      null
    ),
    new Document (
      '2',
      'CIT 366 - Full Stack Web Development',
      'Learn how to develop modern web applications using the MEAN stack.',
      'http://www.byui.edu/computer-information-technology/courses',
      null
    ),
    new Document (
      '3',
      'CIT 425 - Data Warehousing',
      'The course is a continuation of CIT 320 and focuses on the development of data warehousing systems.',
      'http://emp.byui.edu/mclaughlinm/IS425.htm',
      null
    ),
    new Document (
      '4',
      'CIT 460 - Enterprise Development',
      'An overview of the architecture for N-tier applications with a focus on the use of effective design patterns.',
      'http://www.byui.edu/computer-information-technology/courses',
      null
    ),
    new Document (
      '5',
      'CIT 495 - Senior Practicum',
      'This is a capstone experience for the Computer Information Technology major.',
      'http://www.byui.edu/computer-information-technology/courses',
      null
    )
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
