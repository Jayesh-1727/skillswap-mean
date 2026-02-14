import { Component } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-discovery',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './discovery.html',
  styleUrl: './discovery.css',
})

export class Discovery implements OnInit {

  users: any[] = [];
  search = new FormControl('');

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();

    this.search.valueChanges.subscribe(value => {
      this.loadUsers();
    });
  }

  loadUsers() {
    this.auth.discoverBySkill(this.search.value || '')
      .subscribe(data => {
        this.users = data;
        this.cdr.detectChanges();
      });
  }

  getStars(rating: any) {
  const numeric = Number(rating);
  return Array(Math.round(numeric)).fill(0);
}

}

