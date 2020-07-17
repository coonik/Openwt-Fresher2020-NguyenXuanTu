import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoading = false;
  isLoginMode = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;

    if (this.isLoginMode) {

    } else {
      this.authService.signup(form.value.email, form.value.password).subscribe(
        req => {
          console.log(req);
          this.isLoading = false;
        },
        tusn => {
          this.error = tusn;
          this.isLoading = false;
        }
      );
    }
    console.log(this.isLoading);

    // form.reset();
  }
}
