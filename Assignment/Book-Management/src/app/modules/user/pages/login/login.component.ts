import { DataService } from './../../../../shared/services/data.service';
import { UserService } from './../../../../core/services/user.service';

import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, flatMap } from 'rxjs/operators';
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
  loading: boolean = false;
  afterRequest: boolean = false;
  error: string = "";

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
      username: new FormControl("", [Validators.required,Validators.maxLength(30)]),
      password: new FormControl("", [Validators.required,Validators.minLength(6),Validators.maxLength(30)])
    });
    this.loginForm.valueChanges.pipe(debounceTime(2000)).subscribe( () => {
        if (!this.loginForm.valid && !this.afterRequest) {
          let usernameError = this.loginForm.get("username").errors;
          let passwordError = this.loginForm.get("password").errors;
          this.error = "";
          if (usernameError?.required)
            this.error = "Username is required";
          if (usernameError?.maxlength) {
            this.error += this.error === "" ? "Username have at most 30 characters" : null;
          }
          if (passwordError?.required)
            this.error += this.error === "" ? "Password is required" : "; Password is required";
          else {
            if (passwordError?.minlength)
              this.error += this.error === "" ? "Password is include at least 6 characters" : "; Password is include at least 6 characters";

            if (passwordError?.maxlength)
              this.error += this.error === "" ? "Password have at most 30 characters" : "; Password have at most 30 characters";
          }

          this._snackBar.open(`${this.error}!`, "Ok", {
            duration: 5000,
          });
        }
        this.afterRequest = false;
      }
    )
  }

  login() : void {
    if (this.loginForm.valid) {
      this.loading = true;
      let user = this.loginForm.value;
      this.userService.login(user.username, user.password)
      .subscribe(val => {
        localStorage.setItem('loginData',JSON.stringify(val));
        this.dataService.setLoginData(val);
        this.loading = false;
        this.router.navigate(["../../book"]);
      }, err => {
        this.loading = false;
        this._snackBar.open(err.error.message, "Ok", {
          duration: 5000,
        });
        this.afterRequest = true;
        this.loginForm.get("password").setValue("");
      });
    } else {
      this._snackBar.open(`${this.error}!`, "Ok", {
        duration: 5000,
      });
    }
  }
}
