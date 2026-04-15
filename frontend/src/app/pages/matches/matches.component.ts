import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CandidateService } from '../../core/candidate.service';
import { JobService } from '../../core/job.service';
import { MatchingService } from '../../core/matching.service';
import { Candidate, CandidateMatchView, Job, JobMatchView } from '../../core/models';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-shell">
      <h2 class="page-title">Smart Matching</h2>
      <p class="page-subtitle">Run ranking logic and review candidate-job fit from both perspectives.</p>
      <div class="panel">
        <button class="btn" (click)="runMatch()" [disabled]="running">{{ running ? 'Running...' : 'Run Full Matching' }}</button>
        <p class="success-text" *ngIf="runMessage">{{ runMessage }}</p>
        <p class="error-text" *ngIf="runError">{{ runError }}</p>
      </div>

      <div class="grid-2">
        <div class="panel">
          <h3>Candidate-Centric View</h3>
          <div class="row">
            <select class="select" [(ngModel)]="selectedCandidateId">
              <option [ngValue]="null">Select Candidate</option>
              <option *ngFor="let c of candidates" [ngValue]="c.id">{{ c.name }}</option>
            </select>
            <button class="btn btn-secondary" (click)="loadCandidateView()">Load</button>
          </div>
          <div class="table-wrap">
            <table>
              <tr><th>Job</th><th>Skill %</th><th>Exp %</th><th>Overall</th></tr>
              <tr *ngFor="let row of candidateView">
                <td>{{ row.job_title }}</td>
                <td>{{ row.skill_match_pct }}</td>
                <td>{{ row.experience_match_pct }}</td>
                <td>{{ row.overall_score }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="panel">
          <h3>Job-Centric Ranked List</h3>
          <div class="row">
            <select class="select" [(ngModel)]="selectedJobId">
              <option [ngValue]="null">Select Job</option>
              <option *ngFor="let j of jobs" [ngValue]="j.id">{{ j.title }}</option>
            </select>
            <button class="btn btn-secondary" (click)="loadJobView()">Load</button>
          </div>
          <div class="table-wrap">
            <table>
              <tr><th>Candidate</th><th>Overall</th><th>Skill %</th><th>Exp %</th></tr>
              <tr *ngFor="let row of jobView">
                <td>{{ row.candidate_name }}</td>
                <td>{{ row.overall_score }}</td>
                <td>{{ row.skill_match_pct }}</td>
                <td>{{ row.experience_match_pct }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .row { margin: 10px 0; }
      .select { min-width: 220px; }
    `,
  ],
})
export class MatchesComponent implements OnInit {
  candidates: Candidate[] = [];
  jobs: Job[] = [];
  selectedCandidateId: number | null = null;
  selectedJobId: number | null = null;
  candidateView: CandidateMatchView[] = [];
  jobView: JobMatchView[] = [];
  running = false;
  runMessage = '';
  runError = '';

  constructor(
    private matchingService: MatchingService,
    private candidateService: CandidateService,
    private jobService: JobService,
  ) {}

  ngOnInit(): void {
    this.candidateService.list({}).subscribe((res) => (this.candidates = res));
    this.jobService.list().subscribe((res) => (this.jobs = res));
  }

  runMatch(): void {
    this.running = true;
    this.runMessage = '';
    this.runError = '';
    this.matchingService.run().subscribe({
      next: (rows) => {
        this.running = false;
        this.runMessage = `Matching completed. ${rows.length} result(s) updated.`;
        this.loadCandidateView();
        this.loadJobView();
      },
      error: (err) => {
        this.running = false;
        this.runError = err?.error?.detail ?? 'Failed to run matching.';
      },
    });
  }

  loadCandidateView(): void {
    if (!this.selectedCandidateId) {
      this.candidateView = [];
      return;
    }
    this.matchingService.byCandidate(this.selectedCandidateId).subscribe((res) => (this.candidateView = res));
  }

  loadJobView(): void {
    if (!this.selectedJobId) {
      this.jobView = [];
      return;
    }
    this.matchingService.byJob(this.selectedJobId).subscribe((res) => (this.jobView = res));
  }
}
