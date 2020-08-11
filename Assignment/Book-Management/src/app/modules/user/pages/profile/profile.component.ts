import { DataService } from './../../../../shared/services/data.service';
import { debounceTime } from 'rxjs/operators';
import { UserService } from './../../../../core/services/user.service';
import { User } from './../../../../shared/auth.guard';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  loginData: any;
  nameErrorString: string = "";
  oldPwErrorString: string = "";
  newPwErrorString: string = "";
  nameSub: Subscription;
  oldPwSub: Subscription;
  newPwSub: Subscription;
  isProcess: boolean = false;
  isChangePassword: boolean = false;
  constructor(private userService: UserService,
    private _snackBar: MatSnackBar,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem("loginData"));
    this.user = JSON.parse(localStorage.getItem("loginData")).user;
    this.userForm = new FormGroup({
      username: new FormControl({value: this.user.username, disabled: true}),
      name: new FormControl(this.user.name, [Validators.required, Validators.minLength(6), Validators.maxLength(30)])
    });
    this.dataService.currentIsChangePassword.subscribe(val => {
      this.isChangePassword = val;
    });
    this.nameSub = this.userForm.get("name").valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.checkValid();
      })
  }

  onChangePassword($event?) {
    $event?.stopPropagation();
    this._snackBar.dismiss();
    this.nameSub.unsubscribe();
    this.oldPwSub?.unsubscribe();
    this.newPwSub?.unsubscribe();
    this.isChangePassword = !this.isChangePassword;
    if (this.isChangePassword) {
      this.userForm = new FormGroup({
        username: new FormControl({value: this.user.username, disabled: true}),
        name: new FormControl(this.user.name, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        oldPw: new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        newPw: new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      })

      this.nameSub = this.userForm.get("name").valueChanges
        .pipe(debounceTime(1000))
        .subscribe(() => {
          this.checkValid();
        })

      this.oldPwSub = this.userForm.get("oldPw").valueChanges
        .pipe(debounceTime(1000))
        .subscribe(() => {
          this.checkValid();
      })
      this.newPwSub = this.userForm.get("newPw").valueChanges
        .pipe(debounceTime(1000))
        .subscribe(() => {
          this.checkValid();
      })
    } else {
      this.userForm = new FormGroup({
        username: new FormControl({value: this.user.username, disabled: true}),
        name: new FormControl(this.loginData.user.name, [Validators.required, Validators.minLength(6), Validators.maxLength(30)])
      })
      this.nameSub = this.userForm.get("name").valueChanges
        .pipe(debounceTime(1000))
        .subscribe(() => {
          this.checkValid();
        })
    }
  }

  checkValid() {
    let nameError = this.userForm.get("name").errors;
    this.nameErrorString = nameError?.required ? "Name is required" : nameError?.minlength ? "Name is include at least 6 characters" : nameError?.maxlength ? "Name have at most 30 characters" : "";

    let oldPwError = this.userForm.get("oldPw")?.errors;
    this.oldPwErrorString = oldPwError?.required ? "Old Password is required" : oldPwError?.minlength ? "Old Password is include at least 6 characters" : oldPwError?.maxlength ? "Old Password have at most 30 characters" : "";

    let newPwError = this.userForm.get("newPw")?.errors;
    this.newPwErrorString = newPwError?.required ? "New Password is required" : newPwError?.minlength ? "New Password is include at least 6 characters" : newPwError?.maxlength ? "New Password have at most 30 characters" : "";
    if (!this.userForm.valid)
      this._snackBar.open(`${this.nameErrorString} ${this.nameErrorString!=="" && this.oldPwErrorString!=="" ? `; ${this.oldPwErrorString}` : this.oldPwErrorString} ${(this.nameErrorString!=="" || this.oldPwErrorString!=="") && this.newPwErrorString!=="" ? `; ${this.newPwErrorString}` : this.newPwErrorString}`, "Ok", {
        duration: 5000,
      })
  }

  sendRequest($event?) {
    $event?.stopPropagation();

    //Change Name and Password
    if (this.isChangePassword) {
      if (this.userForm.get("newPw").value === this.userForm.get("oldPw").value) {
        this._snackBar.open("The new password must be different from the old password!", "Ok", {
          duration: 2000,
        });
      } else {
        this.isProcess = true;
        this.userService.login(this.user.username, this.userForm.get("oldPw").value).subscribe(() => {
          this.userService.updateUser(Number.parseInt(this.user.id), {
            username: this.user.username,
            name: this.userForm.get("name").value,
            password: this.userForm.get("newPw").value,
            role: this.user.role
          }).subscribe(() => {
            this.loginData.user.name = this.userForm.get("name").value;
            this.loginData.user.password = this.userForm.get("newPw").value;
            localStorage.setItem("loginData", JSON.stringify(this.loginData));
            this.dataService.setLoginData(this.loginData);
            this._snackBar.open("Your account has been Update!", "Ok", {
              duration: 2000,
            });
            this.onChangePassword();
            this.isProcess = false;
          }, err => {
            this._snackBar.open(err.error.message, "Ok", {
              duration: 2000,
            });
            this.isProcess = false;
          });
        },() => {
          this._snackBar.open("Old Password isn't valid!", "Ok", {
            duration: 2000,
          });
          this.isProcess = false;
          this.userForm.get("oldPw").setErrors(Validators.required);
        });
      }
    }
    //Only change Name
    else {
      if (this.userForm.get("name").value === this.user.name) {
        this._snackBar.open("No change", "Ok", {
          duration: 2000,
        });
      } else {
        this.isProcess = true;
        this.userService.updateUser(Number.parseInt(this.user.id), {
          username: this.user.username,
          name: this.userForm.get("name").value,
          role: this.user.role
        }).subscribe(val => {
          this.loginData.user.name = this.userForm.get("name").value;
          localStorage.setItem("loginData", JSON.stringify(this.loginData));
          this.dataService.setLoginData(this.loginData);
          this._snackBar.open("Your account has been Update!", "Ok", {
            duration: 2000,
          });
          this.isChangePassword = true;
          this.onChangePassword();
          this.isProcess = false;
        }, err => {
          this._snackBar.open(err.error.message, "Ok", {
            duration: 2000,
          });
          this.isProcess = false;
        });
      }
    }
  }
}
