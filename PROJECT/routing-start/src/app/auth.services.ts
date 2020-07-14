import { resolve } from "dns";
import { rejects } from "assert";

export class AuthServivce {
  loggedIn = false;

  isAuthencated() {
    const promise = new Promise(
      (resolve, rejects) => {
        setTimeout(() => {
          resolve(this.loggedIn)
        }, 1500);
      }
    )
    return promise;
  }

  loggin() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
