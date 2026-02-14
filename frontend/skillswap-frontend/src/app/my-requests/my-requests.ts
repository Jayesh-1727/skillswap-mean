import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './my-requests.html',
  styleUrl: './my-requests.css',
})
export class MyRequests {
  requests: any[] | null = null;

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.auth.getMyRequests()
      .subscribe(data => {
        this.requests = data;
        this.cdr.detectChanges();
      });

      this.reload();
  }

  submitFeedback(id: string, rating: number, review: string) {
  this.auth.submitFeedback(id, rating, review)
    .subscribe({
      next: () => {
        alert('Feedback submitted');
        this.reload();
      },
      error: err => {
        alert(err.error?.message || 'Failed to submit feedback');
      }
    });
}

reload() {
  this.auth.getMyRequests()
    .subscribe(data => {
      this.requests = data;
      this.cdr.detectChanges();
    });
}

}
