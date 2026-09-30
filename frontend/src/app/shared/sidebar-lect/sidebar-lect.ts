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
      title: 'New Booking Request',
      message: 'Ahmad Razak requested a consultation session for tomorrow at 10:00 AM.',
      time: '5m ago',
      read: false,
      type: 'booking',
    },
    {
      id: '2',
      title: 'Session Starting Soon',
      message: 'Upcoming consultation with Siti Aminah in 30 minutes (Room 302).',
      time: '25m ago',
      read: false,
      type: 'reminder',
    },
    {
      id: '3',
      title: 'Booking Cancelled',
      message: 'Muhammad Lee cancelled consultation request #1042.',
      time: '2h ago',
      read: true,
      type: 'cancellation',
    },
  ];

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

  onLogout() {
    this.router.navigate(['/login']);
  }
}
