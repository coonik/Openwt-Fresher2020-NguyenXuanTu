import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-servers',
  template: '<p>Test</p>',
  // styleUrls: ['./servers.component.css']
  styles: [
    `
    p {
      color: yellow;
    }
    `
  ]
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
