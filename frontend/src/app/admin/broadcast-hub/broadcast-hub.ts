import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

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

  // Mock History Database
  broadcastHistory = [
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

  constructor(private router: Router) { }

  ngOnInit(): void { }

  setAudience(target: string) {
    this.broadcast.targetAudience = target;
  }

  sendBroadcast() {
    if (!this.broadcast.subject || !this.broadcast.message) {
      alert('Please fill in both the subject and the message.');
      return;
    }
    if (!this.broadcast.sendInApp && !this.broadcast.sendEmail) {
      alert('Please select at least one delivery method (In-App or Email).');
      return;
    }

    this.isSending = true;

    // Simulate API call delay
    setTimeout(() => {
      this.isSending = false;

      // Add to history
      const channels = [];
      if (this.broadcast.sendInApp) channels.push('In-App');
      if (this.broadcast.sendEmail) channels.push('Email');

      this.broadcastHistory.unshift({
        id: 'BC-00' + (this.broadcastHistory.length + 1),
        date: 'Just Now',
        subject: this.broadcast.subject,
        audience: this.broadcast.targetAudience,
        channels: channels,
        status: 'SENT',
      });

      alert('Broadcast sent successfully!');

      // Reset form
      this.broadcast.subject = '';
      this.broadcast.message = '';
    }, 1000);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
