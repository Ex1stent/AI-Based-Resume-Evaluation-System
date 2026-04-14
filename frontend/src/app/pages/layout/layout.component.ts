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
      <nav class="nav">
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/candidates" routerLinkActive="active">Candidates</a>
        <a routerLink="/jobs" routerLinkActive="active">Jobs</a>
        <a routerLink="/matches" routerLinkActive="active">Matching</a>
        <span class="spacer"></span>
        <span>{{ auth.username() }} ({{ auth.role() }})</span>
        <button (click)="auth.logout()">Logout</button>
      </nav>
      <main class="main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .container { font-family: Arial, sans-serif; }
      .nav { display: flex; gap: 10px; align-items: center; padding: 10px; border-bottom: 1px solid #ddd; }
      .active { font-weight: 700; }
      .spacer { flex: 1; }
      .main { padding: 12px; }
      button { padding: 6px 10px; }
    `,
  ],
})
export class LayoutComponent {
  constructor(public auth: AuthService) {}
}

