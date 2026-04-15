import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { CandidateService } from '../../core/candidate.service';
import { Candidate, CandidateDetail } from '../../core/models';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="page-shell">
      <h2 class="page-title">Candidate Management</h2>
      <p class="page-subtitle">Create profiles, upload resumes, and filter candidates by fit.</p>

      <form [formGroup]="createForm" (ngSubmit)="createCandidate()" class="panel">
        <h3>Create Candidate</h3>
        <div class="row form-row">
          <input class="input" placeholder="Name" formControlName="name" />
          <input class="input" placeholder="Email" formControlName="email" />
          <input class="input" placeholder="Phone" formControlName="phone" />
          <button class="btn" type="submit" [disabled]="createForm.invalid">Create</button>
        </div>
      </form>

      <div class="panel">
        <h3>Filters</h3>
        <div class="row form-row">
          <input class="input" [(ngModel)]="skillsFilter" placeholder="Skills (comma separated)" />
          <input class="input" type="number" [(ngModel)]="minExperience" placeholder="Min experience" />
          <button class="btn btn-secondary" (click)="loadCandidates()">Apply Filters</button>
        </div>
      </div>

      <div class="panel">
        <div class="table-wrap">
          <table>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Skills</th><th>Experience</th><th>Action</th>
            </tr>
            <tr *ngFor="let c of candidates">
              <td>{{ c.id }}</td>
              <td>{{ c.name }}</td>
              <td>{{ c.email }}</td>
              <td>{{ c.skills.join(', ') }}</td>
              <td>{{ c.experience_years }}</td>
              <td class="row">
                <button class="btn btn-secondary" (click)="selectCandidate(c.id)">View</button>
                <button class="btn btn-danger" *ngIf="auth.role() === 'Admin'" (click)="deleteCandidate(c.id)">Delete</button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div *ngIf="selected" class="panel">
        <h3>Candidate Detail - {{ selected.name }}</h3>
        <div class="detail-grid">
          <p><b>Summary:</b> {{ selected.summary || '-' }}</p>
          <p><b>Education:</b> {{ selected.education || '-' }}</p>
          <p><b>Skills:</b> {{ selected.skills.join(', ') || '-' }}</p>
          <p><b>Experience:</b> {{ selected.experience_years }} years</p>
        </div>

        <div class="row">
          <input class="input" type="file" (change)="onFileChange($event)" />
          <button class="btn" (click)="uploadResume()" [disabled]="!selectedFile">Upload Resume</button>
          <p class="success-text">{{ message }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .form-row .input { flex: 1 1 200px; }
      .detail-grid { display: grid; gap: 8px; margin: 8px 0 12px; }
    `,
  ],
})
export class CandidatesComponent implements OnInit {
  private fb = inject(FormBuilder);

  candidates: Candidate[] = [];
  selected: CandidateDetail | null = null;
  selectedFile: File | null = null;
  message = '';

  skillsFilter = '';
  minExperience: number | null = null;

  createForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });

  constructor(private candidateService: CandidateService, public auth: AuthService) {}

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.candidateService
      .list({ skills: this.skillsFilter || undefined, min_experience: this.minExperience })
      .subscribe((res) => (this.candidates = res));
  }

  createCandidate(): void {
    if (this.createForm.invalid) {
      return;
    }
    const raw = this.createForm.getRawValue();
    this.candidateService
      .create({
        name: raw.name ?? '',
        email: raw.email ?? '',
        phone: raw.phone ?? '',
      })
      .subscribe(() => {
        this.createForm.reset();
        this.loadCandidates();
      });
  }

  selectCandidate(id: number): void {
    this.message = '';
    this.selectedFile = null;
    this.candidateService.detail(id).subscribe((res) => (this.selected = res));
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files?.[0] ?? null;
  }

  uploadResume(): void {
    if (!this.selected || !this.selectedFile) {
      return;
    }
    this.candidateService.uploadResume(this.selected.id, this.selectedFile).subscribe((res) => {
      this.message = res.message;
      this.selectCandidate(this.selected!.id);
      this.loadCandidates();
    });
  }

  deleteCandidate(id: number): void {
    this.candidateService.delete(id).subscribe(() => {
      if (this.selected?.id === id) {
        this.selected = null;
        this.selectedFile = null;
        this.message = '';
      }
      this.loadCandidates();
    });
  }
}
