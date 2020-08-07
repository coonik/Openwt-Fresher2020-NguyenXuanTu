import { ProfileSetChangePasswordService } from './../../services/profile-set-changepassword.service';
import { ProfileComponent } from './../../../modules/user/pages/profile/profile.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: object;
  isLogined: boolean = false;
  constructor(private profileSetChangePasswordService: ProfileSetChangePasswordService) { }

  ngOnInit(): void {
    this.profileSetChangePasswordService.currentIsLogined.subscribe(val => {
      this.isLogined = val;
      this.isLogined ? this.user = JSON.parse(localStorage.getItem('loginData')).user : null;
    });
  }
}
