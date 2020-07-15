import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('f', {static: true})
  signupForm: NgForm
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];

  emailValid: boolean;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  // onSubmit(elRef: NgForm) {
  //   console.log(elRef.value);

  // }

  // onSubmit() {
  //   console.log(this.signupForm.value);
  //   console.log(this.signupForm.valid);
  // }

  ngOnInit() {

    // (
    //   (adsas) => {
    //     console.log();

    //   }
    // )
  }

  onChange() {

    const email: string = this.signupForm.value.userData.email;
    this.emailValid = email.split('@').length === 2 && email.split('@')[1].split('.').length>1;

  }

  onSubmit() {
    console.log(this.signupForm);

  }
}
