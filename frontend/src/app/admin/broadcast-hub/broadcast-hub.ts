import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { BroadcastService, BroadcastItem } from '../../services/broadcast.service';

@Component({
  selector: 'app-broadcast-hub',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './broadcast-hub.html',
  styleUrls: ['./broadcast-hub.css'],
})
export class BroadcastHubComponent implements OnInit {
  // Composer State
  broadcast = {
    targetAudience: 'ALL', // 'ALL', 'STUDENTS', 'LECTURERS'
    sendInApp: true,
    sendEmail: false,
    subject: '',
    message: '',
  };

  isSending = false;
  isLoading = false;

  // History Database
  broadcastHistory: BroadcastItem[] = [];

  constructor(
    private router: Router,
    private broadcastService: BroadcastService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadBroadcastHistory();
  }

  loadBroadcastHistory(): void {
    this.isLoading = true;
    this.broadcastService.getBroadcasts().subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data && data.length > 0) {
          this.broadcastHistory = data;
        } else {
          this.useFallbackHistory();
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.warn('Failed to load broadcasts from backend, using default list:', err);
        this.isLoading = false;
        this.useFallbackHistory();
        this.cdr.detectChanges();
      },
    });
  }

  private useFallbackHistory(): void {
    this.broadcastHistory = [
      {
        id: 'BC-001',
        date: '2024-03-15 08:00 AM',
        subject: 'System Maintenance Tonight',
        audience: 'ALL',
        channels: ['In-App', 'Email'],
        status: 'SENT',
      },
      {
        id: 'BC-002',
        date: '2024-03-10 02:30 PM',
        subject: 'Reminder: Update Consultation Hours',
        audience: 'LECTURERS',
        channels: ['In-App'],
        status: 'SENT',
      },
      {
        id: 'BC-003',
        date: '2024-03-01 09:00 AM',
        subject: 'Welcome to Semester A232',
        audience: 'STUDENTS',
        channels: ['Email'],
        status: 'SENT',
      },
    ];
  }

  setAudience(target: string) {
    this.broadcast.targetAudience = target;
  }

  sendBroadcast() {
    if (!this.broadcast.subject?.trim() || !this.broadcast.message?.trim()) {
      alert('Please fill in both the subject and the message.');
      return;
    }
    if (!this.broadcast.sendInApp && !this.broadcast.sendEmail) {
      alert('Please select at least one delivery method (In-App or Email).');
      return;
    }

    this.isSending = true;

    const payload = {
      targetAudience: this.broadcast.targetAudience,
      sendInApp: this.broadcast.sendInApp,
      sendEmail: this.broadcast.sendEmail,
      subject: this.broadcast.subject.trim(),
      message: this.broadcast.message.trim(),
    };

    this.broadcastService.sendBroadcast(payload).subscribe({
      next: (savedItem) => {
        this.isSending = false;

        if (savedItem) {
          this.broadcastHistory.unshift(savedItem);
        } else {
          const channels: string[] = [];
          if (this.broadcast.sendInApp) channels.push('In-App');
          if (this.broadcast.sendEmail) channels.push('Email');

          this.broadcastHistory.unshift({
            id: 'BC-' + String(this.broadcastHistory.length + 1).padStart(3, '0'),
            date: 'Just Now',
            subject: payload.subject,
            audience: payload.targetAudience,
            channels: channels,
            status: 'SENT',
          });
        }

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('admin-notification-refresh'));
        }

        alert('Broadcast sent successfully!');

        // Reset form
        this.broadcast.subject = '';
        this.broadcast.message = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to send broadcast:', err);
        this.isSending = false;

        let msg = 'Failed to send broadcast. Please try again.';
        if (err?.error?.message) {
          msg = err.error.message;
        }
        alert(msg);
        this.cdr.detectChanges();
      },
    });
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
