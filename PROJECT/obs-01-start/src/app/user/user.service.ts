import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  activedEmitter = new Subject<boolean>();
  // actived = false;

  setActive(value) {
    this.activedEmitter.next(value);
  }
}
