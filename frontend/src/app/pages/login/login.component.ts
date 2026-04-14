import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page">
      <h2>AI Resume Tool - Login</h2>
      <form [formGroup]="form" (ngSubmit)="submit()" class="card">
        <label>Username</label>
        <input type="text" formControlName="username" />
        <label>Password</label>
        <input type="password" formControlName="password" />
        <button type="submit" [disabled]="form.invalid || loading">{{ loading ? 'Loading...' : 'Login' }}</button>
      </form>
      <p class="help">Demo users: admin/admin123 (Admin), hr/hr123 (HR)</p>
      <p class="error" *ngIf="error">{{ error }}</p>
    </div>
  `,
  styles: [
    `
      .page { max-width: 420px; margin: 40px auto; font-family: Arial, sans-serif; }
      .card { border: 1px solid #d7d7d7; padding: 16px; display: grid; gap: 8px; }
      input, button { padding: 8px; }
      .error { color: #b00020; }
      .help { color: #555; font-size: 13px; }
    `,
  ],
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  loading = false;
  error = '';
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.error = '';
    this.loading = true;
    this.auth.login(this.form.getRawValue() as { username: string; password: string }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.detail ?? 'Login failed';
      },
    });
  }
}
