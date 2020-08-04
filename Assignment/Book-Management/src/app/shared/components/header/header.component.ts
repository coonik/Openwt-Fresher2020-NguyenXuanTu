import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: object;
  hidden: boolean;
  constructor() { }

  ngOnInit(): void {
    this.hidden = localStorage.getItem("loginData") === "" || !localStorage.getItem("loginData");
    !this.hidden ? this.user = JSON.parse(localStorage.getItem('loginData')).user : null;
  }

}
