import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: object;
  hidden: boolean;
  isShowProfile: boolean;
  constructor() { }

  ngOnInit(): void {
    this.isShowProfile = false;
    this.hidden = localStorage.getItem("loginData") === "" || !localStorage.getItem("loginData");
    !this.hidden ? this.user = JSON.parse(localStorage.getItem('loginData')).user : null;
  }

  setShowProfile() {
    this.isShowProfile = !this.isShowProfile;
  }
}
