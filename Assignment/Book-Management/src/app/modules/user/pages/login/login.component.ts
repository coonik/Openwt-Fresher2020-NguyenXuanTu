import { DataService } from './../../../../shared/services/data.service';
import { UserService } from './../../../../core/services/user.service';

import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService) { }
  username: string;
  password: string;

  ngOnInit() {
    if (this.activatedRoute.snapshot.routeConfig.path === "logout") {
      localStorage.setItem("loginData","");
      this.dataService.setLoginData(null);
      this.router.navigate(["./user/auth"]);
    }

    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required,Validators.minLength(6)])
    });
    this.loginForm.valueChanges.pipe(debounceTime(2000)).subscribe( () => {
        if (!this.loginForm.get("username").valid)
          this._snackBar.open("Username is required!", "Ok", {
            duration: 2000,
          });
        if (!this.loginForm.get("password").valid && this.loginForm.get("password").touched)
          this._snackBar.open("Password is required and Include at least 6 characters!", "Ok", {
            duration: 2000,
          });
      }
    )
  }

  login() : void {
    if (this.loginForm.valid) {
      let user = this.loginForm.value;
      this.userService.login(user.username, user.password)
      .subscribe(val => {
        localStorage.setItem('loginData',JSON.stringify(val));
        this.dataService.setLoginData(val);
        this.router.navigate(["../../book"]);
      }, err => {
        this._snackBar.open(err.error.message, "Ok", {
          duration: 5000,
        });
        this.loginForm.get("password").setValue("");
        this.loginForm.get("password").markAsUntouched();
      });
    } else {
      this._snackBar.open("Form isn't Valid, Please enter the correct information before login!", "Ok", {
        duration: 5000,
      });
    }
  }
}
