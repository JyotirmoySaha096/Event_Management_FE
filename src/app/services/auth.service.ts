import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginCredentials } from '../Models/auth.model';
import { HttpClient } from '@angular/common/http';

interface LoginState{
  isLoggedIn:boolean,
  authToken:string | null,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private isLoggedIn = new BehaviorSubject<boolean>(false);
  // authToken = new Subject<string | null>();
  loggedInState = new BehaviorSubject<LoginState>({ isLoggedIn: false, authToken: null });
  private loginUrl = 'https://localhost:7236/api/User/login';
  constructor(private http: HttpClient) {
    this.loggedInState.next({ isLoggedIn: this.checkLoginState(), authToken:localStorage.getItem('authToken') });
    // this.loggedInState.next({ isLoggedIn: false,authToken:null });
  }

  login(loginCredentials: LoginCredentials) {
    // console.log(loginCredentials);
    return this.http.post<number>(this.loginUrl, loginCredentials);
  }

  logout() {
    this.loggedInState.next({ isLoggedIn: false, authToken:null }); // Emit false when user logs out
    localStorage.removeItem('authToken');
  }

  // Method to check if the user is logged in from token initially
  private checkLoginState(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // return true if there's a valid token
    // return false; // Default
  }
}
