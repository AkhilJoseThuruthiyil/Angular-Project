import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { login } from '../../../store/actions/login.actions';
import { Store } from '@ngrx/store';
import { selectLoginState } from '../../../store/selectors/login.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private router = inject(Router)

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.router.navigateByUrl('home');
    }
    this.initializeLoginForm();
    this.store.select(selectLoginState).subscribe(state => {
      if (state.accessToken) {
        localStorage.setItem('accessToken', state.accessToken);
        localStorage.setItem('User_Name', state.userName);
        localStorage.setItem('email', state.email);
        this.router.navigateByUrl('/home');
      }
    }
    );
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      emailID: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLoginFormSubmit() {
    this.store.dispatch(login({
      email: this.loginForm.value.emailID,
      password: this.loginForm.value.password
    }));
  }

  navigateToHomePage() {
    this.router.navigateByUrl('/home');
  }

  get emailID(): AbstractControl {
    return this.loginForm.controls['emailID'];
  }

  get password(): AbstractControl {
    return this.loginForm.controls['password'];
  }
}
