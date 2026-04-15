import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../core/dashboard.service';
import { DashboardData } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-shell">
      <h2 class="page-title">Dashboard</h2>
      <p class="page-subtitle">Quick overview of hiring data and recent activity.</p>
      <div class="stat-grid" *ngIf="data">
        <div class="stat-card">
          <div class="stat-label">Total Candidates</div>
          <div class="stat-value">{{ data.total_candidates }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Jobs</div>
          <div class="stat-value">{{ data.total_jobs }}</div>
        </div>
      </div>

      <div class="grid-2" *ngIf="data">
        <div class="panel">
          <h3>Recent Candidates</h3>
          <div class="table-wrap">
            <table>
              <tr><th>ID</th><th>Name</th><th>Created</th></tr>
              <tr *ngFor="let c of data.recent_candidates">
                <td>{{ c.id }}</td>
                <td>{{ c.name }}</td>
                <td>{{ c.created_at | date:'short' }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="panel">
          <h3>Recent Jobs</h3>
          <div class="table-wrap">
            <table>
              <tr><th>ID</th><th>Title</th><th>Created</th></tr>
              <tr *ngFor="let j of data.recent_jobs">
                <td>{{ j.id }}</td>
                <td>{{ j.title }}</td>
                <td>{{ j.created_at | date:'short' }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-shell { gap: 14px; }
      .panel h3 { margin-bottom: 10px; }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  data: DashboardData | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getData().subscribe((res) => (this.data = res));
  }
}
