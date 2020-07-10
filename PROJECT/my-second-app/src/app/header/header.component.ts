import { Component, Output, EventEmitter } from '@angular/core';
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
  @Output('loadingFeature')
  featureSelect = new EventEmitter<string>();
  collapsed = [true, true, true];

  setCollapse(i: number) {
    this.collapsed[i] = !this.collapsed[i];
  }

  onSelect(feature: string) {
    this.featureSelect.emit(feature);
  }
}
