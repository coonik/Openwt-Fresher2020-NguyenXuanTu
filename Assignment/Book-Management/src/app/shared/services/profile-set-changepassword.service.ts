import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProfileSetChangePasswordService {
  private isChangePassword = new BehaviorSubject<boolean>(false);
  currentIsChangePassword = this.isChangePassword.asObservable();
  private isLogined = new BehaviorSubject<boolean>(false);
  currentIsLogined = this.isLogined.asObservable();

  constructor() { }

  setIsChangePassword(isChangePassword: boolean) {
    this.isChangePassword.next(isChangePassword);
  }

  setIsLogined(isLogined: boolean) {
    this.isLogined.next(isLogined);
  }
}
