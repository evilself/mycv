import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;

  constructor() {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isAuthenticated = true;
        if (this.isAuthenticated) {
          resolve();
        } else {
          reject({ message: 'bad credentials' });
        }
      }, 500);
    });
  }

  logout() {
    this.isAuthenticated = false;
    return Promise.resolve(true);
  }
}
