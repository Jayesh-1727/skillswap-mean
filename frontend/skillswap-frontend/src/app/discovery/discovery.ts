import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-discovery',
  imports: [NgFor, ReactiveFormsModule, RouterLink],
  templateUrl: './discovery.html',
  styleUrl: './discovery.css',
})
export class Discovery {
users: any[] = [];
  search = new FormControl('');

  constructor(private auth: AuthService) {
    this.loadUsers();
  }

  loadUsers() {
    this.auth.discoverBySkill(this.search.value || '')
      .subscribe(data => this.users = data);
  }
}
