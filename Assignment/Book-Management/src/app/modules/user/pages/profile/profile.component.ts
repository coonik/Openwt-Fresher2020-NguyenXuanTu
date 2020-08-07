import { ProfileSetChangePasswordService } from './../../../../shared/services/profile-set-changepassword.service';
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
  isProcess: boolean = false;
  passwordSub: Subscription;
  isChangePassword: boolean = false;
  noChange: boolean = true;
  constructor(private userService: UserService,
    private _snackBar: MatSnackBar,
    private profileSetChangePasswordService: ProfileSetChangePasswordService) { }

  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem("loginData"));
    this.user = JSON.parse(localStorage.getItem("loginData")).user;
    this.userForm = new FormGroup({
      username: new FormControl({value: this.user.username, disabled: true}),
      name: new FormControl(this.user.name)
    })
    this.profileSetChangePasswordService.currentIsChangePassword.subscribe(val => {
      this.isChangePassword = val;
    });
  }

  onChangePassword($event?) {
    $event?.stopPropagation();
    this.passwordSub?.unsubscribe();
    this.isChangePassword = !this.isChangePassword;
    if (this.isChangePassword) {
      this.userForm = new FormGroup({
        username: new FormControl({value: this.user.username, disabled: true}),
        name: new FormControl(this.user.name),
        oldPw: new FormControl("",[Validators.required, Validators.minLength(6)]),
        newPw: new FormControl("",[Validators.required, Validators.minLength(6)]),
      })

      this.userForm.get("oldPw").valueChanges
        .pipe(debounceTime(1000))
        .subscribe(() => {
          if (!this.userForm.get("oldPw").valid)
            this._snackBar.open("Old password is required and Include at least 6 characters!", "Ok", {
              duration: 2000,
            });
      })
      this.userForm.get("newPw").valueChanges
        .pipe(debounceTime(1000))
        .subscribe(() => {
          if (!this.userForm.get("newPw").valid)
            this._snackBar.open("New password is required and Include at least 6 characters!", "Ok", {
              duration: 2000,
            });
      })
    } else {
      this.userForm = new FormGroup({
        username: new FormControl({value: this.user.username, disabled: true}),
        name: new FormControl(this.loginData.user.name)
      })
    }
  }

  sendRequest($event?) {
    $event?.stopPropagation();
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
    } else {
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
      }
    }
  }

}
