import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  private authenticateService = inject(AuthService);
  private router = inject(Router);

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initializeRegisterForm();
  }


  initializeRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailID: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLoginFormSubmit() {
    const userName = this.registerForm.value.firstName + this.registerForm.value.lastName;
    this.authenticateService.onRegister(this.registerForm.value.emailID, userName, this.registerForm.value.password)
      .subscribe((response: any) => {
        if (response?._tokenResponse.registered) {
          localStorage.setItem('accessToken', response.user.accessToken);
          localStorage.setItem('User_Name', response._tokenResponse.displayName);
          localStorage.setItem('email', response._tokenResponse.email);
          localStorage.setItem('refreshToken', response._tokenResponse.refreshToken);
          this.router.navigateByUrl('/home');
        }
      });
  }

  get firstName(): AbstractControl {
    return this.registerForm.controls['firstName'];
  }

  get lastName(): AbstractControl {
    return this.registerForm.controls['lastName'];
  }
  get emailID(): AbstractControl {
    return this.registerForm.controls['emailID'];
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }

}
