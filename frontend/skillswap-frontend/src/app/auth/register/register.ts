import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('learner', Validators.required),
  });

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.registerForm.invalid) return;

    this.auth.register(this.registerForm.value as any)
      .subscribe({
        next: () => {
          alert('Registration successful. Please login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err.error.message || 'Registration failed');
        }
      });
  }
}
