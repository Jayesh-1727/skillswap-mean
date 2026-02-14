import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  imports: [NgFor, NgIf, FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {

  sessionId!: string;
  messages: any[] | null = null;
  newMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

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