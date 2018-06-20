import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserData } from './user-data.model';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private firstName: string;
  private lastName: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getUserFirstName() {
    return this.firstName;
  }

  getUserLastName() {
    return this.lastName;
  }

  getUserId() {
    return this.userId;
  }

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener;
  }

  createUser(email: string, password: string, firstName: string, lastName: string) {
    const authData: AuthData = { email: email, password: password, firstName: firstName, lastName: lastName};
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password, firstName: null, lastName: null};
    this.http.post<{
      token: string,
      expiresIn: number,
      userId: string,
      firstName: string,
      lastName: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.firstName = response.firstName;
          this.lastName = response.lastName;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          const user: UserData = { userId: this.userId, firstName: this.firstName, lastName: this.lastName };
          this.saveAuthData(token, expirationDate, user);
          this.router.navigate(['/spendings']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.firstName = authInformation.firstName;
      this.lastName = authInformation.lastName;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, user: UserData) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      firstName: firstName,
      lastName: lastName
    };
  }
}
