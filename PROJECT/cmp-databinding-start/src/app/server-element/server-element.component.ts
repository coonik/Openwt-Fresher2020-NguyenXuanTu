import { Component, OnInit, Input, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementsComponent implements OnInit, AfterContentInit{
  @Input('item')
  serverElement: {name: string, content: string};

  // @Input()
  // item;

  constructor() { }

  ngOnInit(): void {
  }

  @ContentChild('paragraph')
  paragraph: ElementRef;

  ngAfterContentInit() {
    console.log(this.paragraph.nativeElement.textContent);
  }
}
