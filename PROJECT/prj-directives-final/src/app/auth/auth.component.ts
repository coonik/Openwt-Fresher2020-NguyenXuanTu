import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = false;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (this.isLoginMode) {

    } else {
      this.authService.signup(form.value.email, form.value.password).subscribe(
        req => {
          console.log(req);
        },
        error => {
          console.log(error);

        }
      );
    }
    form.reset();
  }
}
