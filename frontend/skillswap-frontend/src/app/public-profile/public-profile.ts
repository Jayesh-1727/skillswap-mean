import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './public-profile.html',
  styleUrls: ['./public-profile.css'],
})
export class PublicProfile implements OnInit {

  user: any = null;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.auth.getPublicProfile(id).subscribe(data => {
      console.log('PUBLIC PROFILE DATA', data);
      this.user = data;
      this.cdr.detectChanges(); // 🔥 THIS is the key line
    });
  }

  requestSession(skillId: string) {
    this.auth.requestSession(this.user._id, skillId).subscribe({
      next: () => alert('Session request sent'),
      error: err => alert(err.error?.message || 'Request failed')
    });
  }
}
