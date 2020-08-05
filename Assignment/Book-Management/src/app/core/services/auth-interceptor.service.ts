import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  token: string = null;
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('loginData') && localStorage.getItem('loginData')!=="") {
      if (!this.token)
        this.token = "Bearer " + JSON.parse(localStorage.getItem('loginData'))?.token;
    } else {
      this.token = null;
    }
    const modifiedRequest = req.clone({
      headers: this.token ? req.headers.append('Authorization',this.token)
        : null
    })
    return next.handle(modifiedRequest);
  }
}
