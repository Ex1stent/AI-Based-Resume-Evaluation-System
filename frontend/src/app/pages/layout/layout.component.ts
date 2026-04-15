import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container">
      <nav class="nav panel">
        <div class="brand">
          <h3>Hire Up</h3>
          <span class="muted">Resume Evaluation Platform</span>
        </div>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/candidates" routerLinkActive="active">Candidates</a>
        <a routerLink="/jobs" routerLinkActive="active">Jobs</a>
        <a routerLink="/matches" routerLinkActive="active">Matching</a>
        <span class="spacer"></span>
        <span class="user-pill">{{ auth.username() }} ({{ auth.role() }})</span>
        <button class="btn btn-secondary" (click)="auth.logout()">Logout</button>
      </nav>
      <main class="main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .container { max-width: 1200px; margin: 14px auto; padding: 0 14px; }
      .nav { display: flex; gap: 10px; align-items: center; margin-bottom: 12px; }
      .brand { margin-right: 16px; }
      .brand h3 { font-size: 18px; }
      .brand span { font-size: 12px; display: block; margin-top: 3px; }
      a { text-decoration: none; color: #2e4568; font-weight: 600; padding: 8px 10px; border-radius: 8px; }
      .active { background: #ecf4ff; color: #194f94; }
      .spacer { flex: 1; }
      .main { padding: 12px; }
      .user-pill { background: #f3f8ff; border: 1px solid #d7e6ff; border-radius: 999px; padding: 6px 10px; font-size: 13px; }
      @media (max-width: 900px) {
        .nav { flex-wrap: wrap; }
      }
    `,
  ],
})
export class LayoutComponent {
  constructor(public auth: AuthService) {}
}
