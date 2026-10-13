import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { Subscription, interval } from 'rxjs';

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'user' | 'consultation' | 'attendance' | 'broadcast' | 'system';
  group: 'Today' | 'Yesterday' | 'Earlier';
  link?: string;
  actionRequired?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  isDarkMode: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEnabled: boolean = true;

  notifications: AdminNotification[] = [];
  private pollingSub!: Subscription;

  get todayNotifications(): AdminNotification[] {
    return this.notifications.filter((n) => n.group === 'Today');
  }

  get yesterdayNotifications(): AdminNotification[] {
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

      const savedNotifPref = localStorage.getItem('admin_notifications_enabled');
      if (savedNotifPref !== null) {
        this.notificationsEnabled = savedNotifPref === 'true';
      }

      this.fetchRealNotifications();
      this.pollingSub = interval(15000).subscribe(() => {
        this.fetchRealNotifications();
      });
    }
  }

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  fetchRealNotifications() {
    const token = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    const dismissedIds: string[] = JSON.parse(localStorage.getItem('admin_dismissed_notifs') || '[]');
    const readIds: string[] = JSON.parse(localStorage.getItem('admin_read_notifs') || '[]');

    // Seed standard administrative status notifications if not dismissed
    const defaultNotifs: AdminNotification[] = [
      {
        id: 'sys-welcome',
        title: 'System Operational',
        message: 'ALCAS Academic Portal running normally. All services (Consultations, Attendance, Calendar) active.',
        time: 'Just now',
        read: readIds.includes('sys-welcome'),
        type: 'system',
        group: 'Today',
        link: '/admin/settings',
      },
      {
        id: 'sys-backup',
        title: 'Daily Data Audit',
        message: 'Daily consultation log backup and audit check completed successfully.',
        time: '2h ago',
        read: readIds.includes('sys-backup'),
        type: 'system',
        group: 'Today',
        link: '/admin/logs',
      }
    ];

    defaultNotifs.forEach((d) => {
      if (!dismissedIds.includes(d.id) && !this.notifications.some((x) => x.id === d.id)) {
        this.notifications.push(d);
      }
    });

    if (!token) {
      return;
    }

    const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    const headers = { Authorization: authHeader };

    // 1. Fetch In-App DB Notifications
    this.http.get<any[]>('http://localhost:8080/api/notifications', { headers }).subscribe({
      next: (dbNotifs) => {
        if (Array.isArray(dbNotifs)) {
          dbNotifs.forEach((n) => {
            const dbId = `db-${n.id}`;
            if (dismissedIds.includes(dbId)) return;
            const exists = this.notifications.find((x) => x.id === dbId);
            const isRead = n.isRead || readIds.includes(dbId);
            if (!exists) {
              this.notifications.unshift({
                id: dbId,
                title: n.title || 'System Notification',
                message: n.message || '',
                time: this.formatRelativeTime(n.createdAt),
                read: isRead,
                type: (n.type || '').toLowerCase() === 'broadcast' ? 'broadcast' : 'system',
                group: this.calculateGroup(n.createdAt),
              });
            } else {
              exists.read = isRead;
            }
          });
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.warn('Failed to load DB notifications for admin:', err),
    });

    // 2. Fetch Recent Consultations
    this.http.get<any[]>('http://localhost:8080/api/admin/consultations', { headers }).subscribe({
      next: (consultations) => {
        if (Array.isArray(consultations)) {
          consultations.slice(0, 15).forEach((c) => {
            const statusUpper = (c.status || '').toUpperCase();
            let notifId = '';
            let title = '';
            let message = '';
            let type: 'consultation' | 'attendance' = 'consultation';
            let link = '/admin/logs';

            if (statusUpper === 'PENDING') {
              notifId = `pending-consult-${c.id}`;
              title = 'Pending Consultation Request';
              message = `${c.studentName || 'Student'} requested session with ${c.lecturerName || 'Lecturer'} on ${c.scheduledDate} at ${c.scheduledTime}.`;
              type = 'consultation';
              link = '/admin/logs';
            } else if (statusUpper === 'NO_SHOW' || statusUpper === 'NO-SHOW') {
              notifId = `noshow-consult-${c.id}`;
              title = 'Attendance Alert: Missed Session';
              message = `Absence flagged: ${c.studentName || 'Student'} did not attend consultation with ${c.lecturerName || 'Lecturer'} on ${c.scheduledDate}.`;
              type = 'attendance';
              link = '/admin/attendance';
            } else if (statusUpper === 'CANCELLED') {
              notifId = `cancel-consult-${c.id}`;
              title = 'Consultation Cancelled';
              message = `Consultation between ${c.studentName || 'Student'} and ${c.lecturerName || 'Lecturer'} was cancelled.`;
              type = 'consultation';
              link = '/admin/logs';
            }

            if (notifId && !dismissedIds.includes(notifId)) {
              const exists = this.notifications.find((x) => x.id === notifId);
              const isRead = readIds.includes(notifId);
              if (!exists) {
                this.notifications.unshift({
                  id: notifId,
                  title,
                  message,
                  time: c.scheduledDate ? `${c.scheduledDate}` : 'Recent',
                  read: isRead,
                  type,
                  group: this.calculateGroup(c.createdAt || c.scheduledDate),
                  link,
                });
              }
            }
          });
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.warn('Failed to load consultations for admin notifications:', err),
    });

    // 3. Fetch Recent Users
    this.http.get<any[]>('http://localhost:8080/api/admin/users', { headers }).subscribe({
      next: (users) => {
        if (Array.isArray(users)) {
          users.slice(-8).reverse().forEach((u) => {
            const notifId = `user-reg-${u.id}`;
            if (dismissedIds.includes(notifId)) return;
            const exists = this.notifications.find((x) => x.id === notifId);
            const isRead = readIds.includes(notifId);
            if (!exists) {
              this.notifications.unshift({
                id: notifId,
                title: 'User Account Registered',
                message: `${u.name} registered as ${u.role} (${u.email}) - Status: ${u.status}.`,
                time: 'Recent User',
                read: isRead,
                type: 'user',
                group: 'Today',
                link: '/admin/users',
              });
            }
          });
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.warn('Failed to load users for admin notifications:', err),
    });

    // 4. Fetch Broadcast Announcements
    this.http.get<any[]>('http://localhost:8080/api/admin/broadcasts', { headers }).subscribe({
      next: (broadcasts) => {
        if (Array.isArray(broadcasts)) {
          broadcasts.slice(0, 5).forEach((b) => {
            const notifId = `broadcast-${b.id}`;
            if (dismissedIds.includes(notifId)) return;
            const exists = this.notifications.find((x) => x.id === notifId);
            const isRead = readIds.includes(notifId);
            if (!exists) {
              this.notifications.unshift({
                id: notifId,
                title: b.subject || 'Campus Announcement',
                message: b.message || '',
                time: 'Broadcast',
                read: isRead,
                type: 'broadcast',
                group: this.calculateGroup(b.createdAt),
                link: '/admin/broadcasts',
              });
            }
          });
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.warn('Failed to load broadcasts for admin notifications:', err),
    });
  }

  calculateGroup(dateStr?: string): 'Today' | 'Yesterday' | 'Earlier' {
    if (!dateStr) return 'Today';
    try {
      const d = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      return 'Earlier';
    } catch {
      return 'Today';
    }
  }

  formatRelativeTime(dateStr?: string): string {
    if (!dateStr) return 'Recent';
    try {
      const d = new Date(dateStr);
      const now = new Date();
      const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
      if (diffMin < 1) return 'Just now';
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch {
      return 'Recent';
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
      localStorage.setItem('admin_notifications_enabled', String(this.notificationsEnabled));
    }
  }

  markAllAsRead(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const readIds: string[] = JSON.parse(localStorage.getItem('admin_read_notifs') || '[]');
    this.notifications.forEach((n) => {
      n.read = true;
      if (!readIds.includes(n.id)) {
        readIds.push(n.id);
      }
      if (n.id.startsWith('db-')) {
        const rawId = n.id.replace('db-', '');
        this.markDbNotifRead(rawId);
      }
    });
    localStorage.setItem('admin_read_notifs', JSON.stringify(readIds));
    this.cdr.detectChanges();
  }

  markAsRead(notif: AdminNotification, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    notif.read = true;
    const readIds: string[] = JSON.parse(localStorage.getItem('admin_read_notifs') || '[]');
    if (!readIds.includes(notif.id)) {
      readIds.push(notif.id);
      localStorage.setItem('admin_read_notifs', JSON.stringify(readIds));
    }
    if (notif.id.startsWith('db-')) {
      const rawId = notif.id.replace('db-', '');
      this.markDbNotifRead(rawId);
    }
    this.cdr.detectChanges();
  }

  markDbNotifRead(id: string) {
    const token = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : null;
    if (token) {
      this.http.put(`http://localhost:8080/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        error: (err) => console.warn('Could not mark notification as read on backend', err)
      });
    }
  }

  deleteNotification(id: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.notifications = this.notifications.filter((n) => n.id !== id);
    const dismissedIds: string[] = JSON.parse(localStorage.getItem('admin_dismissed_notifs') || '[]');
    if (!dismissedIds.includes(id)) {
      dismissedIds.push(id);
      localStorage.setItem('admin_dismissed_notifs', JSON.stringify(dismissedIds));
    }
    this.cdr.detectChanges();
  }

  goToLink(notif: AdminNotification, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.markAsRead(notif);
    if (notif.link) {
      this.router.navigate([notif.link]);
    }
    this.closeDrawer();
  }

  getLinkName(link?: string): string {
    if (!link) return 'Details';
    if (link.includes('users')) return 'User Management';
    if (link.includes('attendance')) return 'Attendance';
    if (link.includes('logs')) return 'Consultation Logs';
    if (link.includes('broadcasts')) return 'Announcements';
    if (link.includes('settings')) return 'Settings';
    return 'Details';
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
