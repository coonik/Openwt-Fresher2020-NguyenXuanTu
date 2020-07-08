import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-servers',
  templateUrl: './servers.component.html',
  // styleUrls: ['./servers.component.css']
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreate = false;
  serverName = "";
  showSecret = false;
  count = 0;
  // public svName = "tu";
  servers = ['123', '456'];
  createServerStatus = "No server was created!"


  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreate = true;
    this.servers.push(this.serverName);
    this.createServerStatus = "Server was created! Name is " + this.serverName;
  }

  onUpdateServerName(even: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  onToggleSecret() {
    this.showSecret = !this.showSecret;
    this.count++;
  }
}
