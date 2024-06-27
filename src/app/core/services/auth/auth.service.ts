import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: Auth, private router: Router
  ) { }

  onLogin(email: string, password: string) {
    const promise = signInWithEmailAndPassword(
      this.fireAuth, email, password
    ).then((res) => {
      return res
    });
    return from(promise);
  }

  onRegister(email: string, userName: string, password: string) {
    const promise = createUserWithEmailAndPassword(
      this.fireAuth, email, password
    ).then((response) => updateProfile(response.user, { displayName: userName }));
    return from(promise)
  }

  returnAuth() {
    return this.fireAuth;
  }

  listenToUserAuthentication() {
    onAuthStateChanged(this.fireAuth, (user: any) => {
      if (user.accessToken) {
      }
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') ? true : false;
  }
}
