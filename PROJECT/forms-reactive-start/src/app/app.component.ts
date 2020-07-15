import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenMailAddress = ['12312@tsy.vn'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email, this.forbiddenMails.bind(this)])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  onAddHobby() {
    const hobby = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(hobby);
  }

  forbiddenMails(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenMailAddress.indexOf(control.value)===0)
      return {"mailIsForbidden": true};
    return {"mailIsForbidden": false};

  }
}
