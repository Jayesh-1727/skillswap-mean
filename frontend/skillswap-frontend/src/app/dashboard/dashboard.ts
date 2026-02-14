import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgFor } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})


export class Dashboard implements OnInit {
role: string | null = null;
inboxCount = 0;
myRequestCount = 0;
recentSessions: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit() {

  this.auth.getTeacherRequests().subscribe(data => {
    console.log('TeacherRequests:', data);
    this.inboxCount = data.length;
    this.cdr.detectChanges();
  });

  this.auth.getMyRequests().subscribe(data => {
    console.log('MyRequests:', data);
    this.myRequestCount = data.length;
    this.cdr.detectChanges();
  });

  this.auth.getSessionHistory().subscribe(data => {
    this.recentSessions = data.slice(0, 3);
    this.cdr.detectChanges();
  });
}




  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
