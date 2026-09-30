import { Component, OnInit, inject, PLATFORM_ID, ElementRef, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'security' | 'user' | 'system';
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  isDarkMode: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEnabled: boolean = true;

  notifications: AdminNotification[] = [
    {
      id: '1',
      title: 'New User Registration',
      message: 'Dr. Emily Vance registered a new lecturer account awaiting verification.',
      time: '12m ago',
      read: false,
      type: 'user',
    },
    {
      id: '2',
      title: 'System Health Alert',
      message: 'Database backup completed successfully at 03:00 AM.',
      time: '1h ago',
      read: false,
      type: 'system',
    },
    {
      id: '3',
      title: 'Security Log Flag',
      message: 'Multiple failed login attempts detected for IP 192.168.1.45.',
      time: '4h ago',
      read: true,
      type: 'security',
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

      const savedNotifPref = localStorage.getItem('admin_notifications_enabled');
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
      localStorage.setItem('admin_notifications_enabled', String(this.notificationsEnabled));
    }
  }

  markAllAsRead(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.notifications.forEach((n) => (n.read = true));
  }

  markAsRead(notif: AdminNotification, event?: Event) {
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
