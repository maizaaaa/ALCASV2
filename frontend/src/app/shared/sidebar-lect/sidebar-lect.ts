import { Component, OnInit, inject, PLATFORM_ID, ElementRef, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';

export interface LecturerNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'reminder' | 'cancellation';
  group: 'Today' | 'Yesterday' | 'Earlier';
  studentName?: string;
  actionRequired?: boolean;
}

@Component({
  selector: 'app-sidebar-lect',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-lect.html',
  styleUrl: './sidebar-lect.css',
})
export class SidebarLect implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  isDarkMode: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEnabled: boolean = true;

  notifications: LecturerNotification[] = [
    {
      id: '1',
      title: 'New Consultation Request',
      message: 'Ahmad Razak requested a consultation session on 2026-10-08 at 10:00 AM.',
      time: '10m ago',
      read: false,
      type: 'booking',
      group: 'Today',
      studentName: 'Ahmad Razak',
      actionRequired: true,
    },
    {
      id: '2',
      title: 'Session Reminder',
      message: 'Upcoming consultation with Siti Aminah in 30 minutes (Room BK-34).',
      time: '45m ago',
      read: false,
      type: 'reminder',
      group: 'Today',
      studentName: 'Siti Aminah',
    },
    {
      id: '3',
      title: 'New Consultation Request',
      message: 'Jason Lee requested an online Webex consultation on 2026-10-09 at 02:30 PM.',
      time: '2h ago',
      read: false,
      type: 'booking',
      group: 'Today',
      studentName: 'Jason Lee',
      actionRequired: true,
    },
    {
      id: '4',
      title: 'Booking Cancelled',
      message: 'Muhammad Lee cancelled consultation request #1042.',
      time: 'Yesterday at 04:15 PM',
      read: true,
      type: 'cancellation',
      group: 'Yesterday',
      studentName: 'Muhammad Lee',
    },
    {
      id: '5',
      title: 'Session Log Completed',
      message: 'Consultation notes saved for Farhan Zulkifli (Matric A21EC0099).',
      time: 'Yesterday at 11:30 AM',
      read: true,
      type: 'reminder',
      group: 'Yesterday',
      studentName: 'Farhan Zulkifli',
    },
  ];

  get todayNotifications(): LecturerNotification[] {
    return this.notifications.filter((n) => n.group === 'Today');
  }

  get yesterdayNotifications(): LecturerNotification[] {
    return this.notifications.filter((n) => n.group === 'Yesterday' || n.group === 'Earlier');
  }

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
      if (this.isDarkMode) {
        this.document.documentElement.classList.add('dark');
      } else {
        this.document.documentElement.classList.remove('dark');
      }

      const savedNotifPref = localStorage.getItem('lecturer_notifications_enabled');
      if (savedNotifPref !== null) {
        this.notificationsEnabled = savedNotifPref === 'true';
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event?: Event) {
    if (this.isNotificationOpen) {
      this.isNotificationOpen = false;
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        this.document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        this.document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  toggleNotifications(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  closeDrawer() {
    this.isNotificationOpen = false;
  }

  toggleNotificationEnabled(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.notificationsEnabled = !this.notificationsEnabled;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lecturer_notifications_enabled', String(this.notificationsEnabled));
    }
  }

  markAllAsRead(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.notifications.forEach((n) => (n.read = true));
  }

  markAsRead(notif: LecturerNotification, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    notif.read = true;
  }

  deleteNotification(id: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }

  approveNotificationBooking(notif: LecturerNotification, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    notif.read = true;
    notif.actionRequired = false;
    alert(`Approved booking request for ${notif.studentName || 'student'}. Navigating to appointments page.`);
    this.router.navigate(['/lecturer/appointments']);
    this.closeDrawer();
  }

  viewNotificationDetails(notif: LecturerNotification, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    notif.read = true;
    this.router.navigate(['/lecturer/appointments']);
    this.closeDrawer();
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
