import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_MI0sjUFVqKvurZtdic80wjVsDFZFVu4',
      {
        email,
        password,
        returnSecureToke: true
      }
    )
      .pipe(
        catchError(errorRes => {
          let errorMessage = 'An unknow error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }

          switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already!'
          }
          return throwError(errorMessage);
        })
      )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_MI0sjUFVqKvurZtdic80wjVsDFZFVu4',
      {
        email,
        password,
        returnSecureToke: true
      }
    )

  }
}
