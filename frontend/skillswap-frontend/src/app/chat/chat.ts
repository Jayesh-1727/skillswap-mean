import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf,NgClass } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  imports: [NgFor, NgIf, NgClass, FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {

  sessionId!: string;
  messages: any[] | null = null;
  newMessage: string = '';
  currentUserId: string = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    const token = localStorage.getItem('token');
if (token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  this.currentUserId = payload.id;
}

  }

  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId')!;
    this.loadMessages();
  }

  loadMessages() {
    this.auth.getMessages(this.sessionId)
      .subscribe(data => {
        this.messages = data;
        this.cdr.detectChanges();
      });
  }

  send() {
    if (!this.newMessage.trim()) return;

    this.auth.sendMessage(this.sessionId, this.newMessage)
      .subscribe(() => {
        this.newMessage = '';
        this.loadMessages();
      });
  }
}