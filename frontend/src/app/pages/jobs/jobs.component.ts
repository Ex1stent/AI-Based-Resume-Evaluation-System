import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { JobService } from '../../core/job.service';
import { Job } from '../../core/models';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page-shell">
      <h2 class="page-title">Job Management</h2>
      <p class="page-subtitle">Create and maintain role requirements for intelligent matching.</p>
      <form [formGroup]="form" (ngSubmit)="save()" class="panel">
        <h3>{{ editingId ? 'Edit Job' : 'Create Job' }}</h3>
        <div class="grid-2">
          <input class="input" placeholder="Title" formControlName="title" />
          <input class="input" placeholder="Department" formControlName="department" />
          <input class="input" placeholder="Skills (comma separated)" formControlName="skills" />
          <input class="input" type="number" placeholder="Experience required" formControlName="experience_required" />
        </div>
        <textarea rows="4" placeholder="Description" formControlName="description"></textarea>
        <div class="row">
          <button class="btn" type="submit" [disabled]="form.invalid">{{ editingId ? 'Update' : 'Create' }}</button>
          <button class="btn btn-secondary" type="button" *ngIf="editingId" (click)="reset()">Cancel</button>
        </div>
      </form>

      <div class="panel">
        <div class="table-wrap">
          <table>
            <tr>
              <th>ID</th><th>Title</th><th>Department</th><th>Skills</th><th>Exp</th><th>Actions</th>
            </tr>
            <tr *ngFor="let j of jobs">
              <td>{{ j.id }}</td>
              <td>{{ j.title }}</td>
              <td>{{ j.department }}</td>
              <td>{{ j.skills.join(', ') }}</td>
              <td>{{ j.experience_required }}</td>
              <td class="row">
                <button class="btn btn-secondary" (click)="edit(j)">Edit</button>
                <button class="btn btn-danger" *ngIf="auth.role() === 'Admin'" (click)="remove(j.id)">Delete</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div *ngIf="selectedJob" class="panel">
        <h3>Improved Description (AI)</h3>
        <p class="muted">{{ selectedJob.improved_description }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      textarea { margin: 10px 0; width: 100%; }
    `,
  ],
})
export class JobsComponent implements OnInit {
  private fb = inject(FormBuilder);

  jobs: Job[] = [];
  selectedJob: Job | null = null;
  editingId: number | null = null;

  form = this.fb.group({
    title: ['', Validators.required],
    department: ['', Validators.required],
    skills: ['', Validators.required],
    experience_required: [0, [Validators.required, Validators.min(0)]],
    description: ['', Validators.required],
  });

  constructor(private jobService: JobService, public auth: AuthService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.jobService.list().subscribe((res) => (this.jobs = res));
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    const raw = this.form.getRawValue();
    const payload = {
      title: raw.title ?? '',
      department: raw.department ?? '',
      skills: (raw.skills ?? '')
        .split(',')
        .map((v) => v.trim())
        .filter((v) => !!v),
      experience_required: Number(raw.experience_required ?? 0),
      description: raw.description ?? '',
    };

    if (this.editingId) {
      this.jobService.update(this.editingId, payload).subscribe((job) => {
        this.selectedJob = job;
        this.reset();
        this.load();
      });
      return;
    }
    this.jobService.create(payload).subscribe((job) => {
      this.selectedJob = job;
      this.reset();
      this.load();
    });
  }

  edit(job: Job): void {
    this.editingId = job.id;
    this.form.patchValue({
      title: job.title,
      department: job.department,
      skills: job.skills.join(', '),
      experience_required: job.experience_required,
      description: job.description,
    });
    this.selectedJob = job;
  }

  remove(id: number): void {
    this.jobService.delete(id).subscribe(() => this.load());
  }

  reset(): void {
    this.editingId = null;
    this.form.reset({
      title: '',
      department: '',
      skills: '',
      experience_required: 0,
      description: '',
    });
  }
}
