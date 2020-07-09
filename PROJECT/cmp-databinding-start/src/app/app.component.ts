import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];

  public theBoundCallback: Function;

  ngOnInit(): void {
    this.theBoundCallback = this.theCallback.bind(this);
  }

  theCallback(temp: []) {
    this.serverElements = temp;
  }
}
