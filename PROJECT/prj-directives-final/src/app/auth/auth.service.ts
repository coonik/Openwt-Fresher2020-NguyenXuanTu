import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken:	string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  register?: boolean
}

@Injectable({ providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_MI0sjUFVqKvurZtdic80wjVsDFZFVu4',
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError))

  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_MI0sjUFVqKvurZtdic80wjVsDFZFVu4',
      {
        email,
        password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData);

          this.router.navigate(['./recipes']);
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
      )
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['./auth']);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error occurred!';console.log(errorRes.error.error.message);

          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }

          switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already!';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exists already!';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This password is not correct!';
              break;

          }
          return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
