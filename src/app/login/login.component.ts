import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeLoginForm();
    
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
        if (response?.registered) {
          sessionStorage.setItem('id_token', response.idToken);
          sessionStorage.setItem('User_Name', response.displayName);
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('refreshToken', response.refreshToken);
        }
      }
      )
    console.log(this.loginForm);
  }

  get emailID(): AbstractControl {
    return this.loginForm.controls['emailID'];
  }

  get password(): AbstractControl {
    return this.loginForm.controls['password'];
  }
}
