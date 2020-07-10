import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadingFeature: string = 'recipe';

  setLoadingFeature(featureSelect: string) {
    this.loadingFeature = featureSelect;
  }
}
