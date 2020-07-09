import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
//   styleUrls: [
//     `
//       ./header.component.css
//     `
// ]
})
export class HeaderComponent {
  collapsed = [true, true, true];

  setCollapse(i: number) {
    this.collapsed[i] = !this.collapsed[i];
  }
}
