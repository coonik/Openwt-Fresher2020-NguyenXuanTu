import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { resolve } from 'dns';
import { rejects } from 'assert';

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
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenMails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })

    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log(status);

      }
    )
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  onAddHobby() {
    const hobby = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(hobby);
  }

  forbiddenMails(control: FormControl): Promise<any> | Observable<any> {

      const promise = new Promise<any>(
        (resolve, rejects) => {
          setTimeout(() => {
            if (control.value === "12312@tsy.vn") {
              console.log("ngu");

              resolve({'emailIsForbidden': true});
            } else {
              resolve(null)
            }
          }, 100);
        })
        return promise
  }
}
