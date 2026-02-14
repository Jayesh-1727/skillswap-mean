import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-requests',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './teacher-requests.html',
  styleUrl: './teacher-requests.css',
  standalone: true,
})
export class TeacherRequests {
requests: any[] | null = null;

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.auth.getTeacherRequests()
      .subscribe({
        next: data => {
          console.log('Teacher Requests:', data);
          this.requests = data;
          this.cdr.detectChanges();   // 🔥 THIS fixes it
        },
        error: err => {
          console.error('ERROR LOADING REQUESTS:', err);
          this.requests = [];
          this.cdr.detectChanges();   // 🔥 also here
        }
      });

      this.reload();
  }

  updateStatus(id: string, status: string) {
  this.auth.updateRequestStatus(id, status)
    .subscribe({
      next: () => {
        alert('Request updated');
        this.reload();
      },
      error: err => {
        alert(err.error?.message || 'Update failed');
      }
    });
}

reload() {
  this.auth.getTeacherRequests()
    .subscribe(data => {
      this.requests = data;
      this.cdr.detectChanges();
    });
}

markCompleted(id: string) {
  this.auth.markSessionCompleted(id)
    .subscribe({
      next: () => {
        alert('Session marked as completed');
        this.reload();
      },
      error: err => {
        alert(err.error?.message || 'Failed to complete session');
      }
    });
}



}
