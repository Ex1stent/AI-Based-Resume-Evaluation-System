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
    <div class="page-shell">
      <div class="hero">
        <h2>Hire Up</h2>
        <p>Secure login for Admin and HR teams</p>
      </div>
      <form [formGroup]="form" (ngSubmit)="submit()" class="panel card">
        <label>Username</label>
        <input class="input" type="text" formControlName="username" />
        <label>Password</label>
        <input class="input" type="password" formControlName="password" />
        <button class="btn" type="submit" [disabled]="form.invalid || loading">{{ loading ? 'Loading...' : 'Login' }}</button>
      </form>
      <p class="help">Demo users: admin/admin123 (Admin), hr/hr123 (HR)</p>
      <p class="error-text" *ngIf="error">{{ error }}</p>
    </div>
  `,
  styles: [
    `
      .page-shell { max-width: 440px; margin: 70px auto; padding: 0 14px; }
      .hero { text-align: center; margin-bottom: 10px; }
      .hero p { color: #5d6e8b; margin-top: 6px; }
      .card { display: grid; gap: 8px; }
      .help { color: #5d6e8b; font-size: 13px; margin-top: 6px; }
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

  constructor(private auth: AuthService, private router: Router) { }

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
