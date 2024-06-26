import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  private authenticateService = inject(AuthService);

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
    this.authenticateService.onRegister(this.registerForm.value.emailID, userName, this.registerForm.value.password).subscribe();
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
