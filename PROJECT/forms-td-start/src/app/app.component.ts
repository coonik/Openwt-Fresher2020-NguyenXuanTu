import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f')
  signupForm: NgForm

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(elRef: NgForm) {
  //   console.log(elRef.value);

  // }

  onSubmit() {
    console.log(this.signupForm.value);

  }
}
