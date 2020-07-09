import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementsComponent implements OnInit {
  @Input('item')
  serverElement: {name: string, content: string};

  // @Input()
  // item;

  constructor() { }

  ngOnInit(): void {
  }

}
