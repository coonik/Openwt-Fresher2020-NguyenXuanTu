import { DataService } from './../../services/data.service';
import { ProfileComponent } from './../../../modules/user/pages/profile/profile.component';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: object;
  isLogined: boolean = false;
  userSub: Subscription;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentLoginData.subscribe(val => {
      if (val === null) {
        this.isLogined = false;
      } else {
        this.isLogined = true;
        this.user = val.user;
      }
    })
  }
}
