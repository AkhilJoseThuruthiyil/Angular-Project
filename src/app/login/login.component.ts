import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private authenticateService = inject(AuthService);
  private router = inject(Router)

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.router.navigateByUrl('home');
    } else {
      this.initializeLoginForm();
    }
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      emailID: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLoginFormSubmit() {
    this.authenticateService.onLogin(this.loginForm.value.emailID, this.loginForm.value.password).
      subscribe((response: any) => {
        if (response?._tokenResponse.registered) {
          localStorage.setItem('accessToken', response.user.accessToken);
          localStorage.setItem('User_Name', response._tokenResponse.displayName);
          localStorage.setItem('email', response._tokenResponse.email);
          localStorage.setItem('refreshToken', response._tokenResponse.refreshToken);
          this.router.navigateByUrl('/home');
        }
      });
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
