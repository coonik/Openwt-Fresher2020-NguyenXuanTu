import { AuthServivce } from './../auth.services';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthServivce) {}

  ngOnInit() {}

  onLoadServers(id: number) {
    this.router.navigate(["/servers", id, 'edit'], {queryParams: { allowEdit: '1'}, fragment: 'loading'});
  }

  onLogin() {
    this.authService.loggedIn = true;
  }

  onLogout() {
    this.authService.loggedIn = false;
  }
}
