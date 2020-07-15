import { UserService } from './user/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  sub: Subscription
  activedEmitter: boolean;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.sub = this.userService.activedEmitter.subscribe(
      (emit) => {
        this.activedEmitter = emit
      }
    )
  }

  ngOnDestroy(){
    // this.userService.setActive(false)
    this.sub.unsubscribe()
  }
}
