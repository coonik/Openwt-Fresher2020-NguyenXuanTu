import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProfileSetChangePasswordService {
  private isChangePassword = new BehaviorSubject<boolean>(false);
  currentIsChangePassword = this.isChangePassword.asObservable();

  constructor() { }

  setIsChangePassword(isChangePassword: boolean) {
    this.isChangePassword.next(isChangePassword);
  }
}
