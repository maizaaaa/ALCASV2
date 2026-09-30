import { Component, OnInit, inject, PLATFORM_ID, ElementRef, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'reminder' | 'system';
}

@Component({
  selector: 'app-navbar-student',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-student.html',
  styleUrl: './navbar-student.css',
})
export class NavbarStudent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  isDarkMode: boolean = false;
  isMobileMenuOpen: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEnabled: boolean = true;
  studentName: string = 'Ahmad Razak';

  notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Appointment Confirmed',
      message: 'Dr. Sarah Smith approved your consultation session for tomorrow at 10:00 AM in Room 302.',
      time: '10m ago',
      read: false,
      type: 'appointment',
    },
    {
      id: '2',
      title: 'Upcoming Session Reminder',
      message: 'Reminder: Consultation session with Prof. Aris starting in 2 hours.',
      time: '1h ago',
      read: false,
      type: 'reminder',
    },
    {
      id: '3',
      title: 'System Announcement',
      message: 'ConsultEase platform will undergo scheduled maintenance tonight at 12:00 AM.',
      time: '3h ago',
      read: true,
      type: 'system',
    },
  ];

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  get studentInitial(): string {
    return this.studentName ? this.studentName.charAt(0) : 'S';
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

      const savedNotifPref = localStorage.getItem('student_notifications_enabled');
      if (savedNotifPref !== null) {
        this.notificationsEnabled = savedNotifPref === 'true';
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
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

  toggleNotificationEnabled(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.notificationsEnabled = !this.notificationsEnabled;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('student_notifications_enabled', String(this.notificationsEnabled));
    }
  }

  markAllAsRead(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.notifications.forEach((n) => (n.read = true));
  }

  markAsRead(notif: NotificationItem, event?: Event) {
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

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isNotificationOpen = false;
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
