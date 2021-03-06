import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoading = false;
  isLoginMode = true;
  error: string = null;
  authObs: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const pass = form.value.password;

    if (this.isLoginMode) {
      this.authObs = this.authService.login(email, pass)
    } else {
      this.authObs = this.authService.signup(email, pass);
    }

    this.authObs.subscribe(
      req => {
        console.log(req);
        this.isLoading = false;
        // this.router.navigate(['./recipes']);
      },
      tusn => {
        console.log(tusn);

        this.error = tusn;
        this.isLoading = false;
      }
    );

    // form.reset();
  }
}
