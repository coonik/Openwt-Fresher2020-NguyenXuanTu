import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online{
      color: white
    }
  `]
})
export class ServerComponent {
  serverId: number = 1998;
  @Input() svName: string;
  serverStatus: string = 'online';

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
