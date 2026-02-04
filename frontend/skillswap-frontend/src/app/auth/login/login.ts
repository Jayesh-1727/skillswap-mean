import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private auth: AuthService) {}

  submit() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value as any)
      .subscribe({
        next: (res) => {
          this.auth.saveToken(res.token);
          alert('Login successful');
        },
        error: (err) => {
          alert(err.error.message || 'Login failed');
        }
      });
  }
}
