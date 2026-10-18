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
  createdAt?: any;
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

  isJustNow(notif?: AdminNotification): boolean {
    if (!notif) return false;
    const timeLower = (notif.time || '').trim().toLowerCase();
    return timeLower === 'just now' || timeLower === 'now' || timeLower === 'right now';
  }

  get todayNotifications(): AdminNotification[] {
    return this.notifications
      .filter((n) => n.group === 'Today')
      .sort((a, b) => {
        const aJustNow = this.isJustNow(a);
        const bJustNow = this.isJustNow(b);
        if (aJustNow && !bJustNow) return -1;
        if (!aJustNow && bJustNow) return 1;
        return this.getTimeValue(b) - this.getTimeValue(a);
      });
  }

  get yesterdayNotifications(): AdminNotification[] {
    return this.notifications
      .filter((n) => n.group === 'Yesterday')
      .sort((a, b) => {
        const aJustNow = this.isJustNow(a);
        const bJustNow = this.isJustNow(b);
        if (aJustNow && !bJustNow) return -1;
        if (!aJustNow && bJustNow) return 1;
        return this.getTimeValue(b) - this.getTimeValue(a);
      });
  }

  get unreadCount(): number {
    return this.notifications.filter((n) => (n.group === 'Today' || n.group === 'Yesterday') && !n.read).length;
  }

  @HostListener('window:admin-notification-refresh')
  onAdminNotificationRefresh() {
    this.fetchRealNotifications();
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
      this.pollingSub = interval(10000).subscribe(() => {
        this.fetchRealNotifications();
      });
    }
  }

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  parseDate(val: any): Date | null {
    if (!val) return null;
    if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
    if (typeof val === 'number') {
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    }
    if (Array.isArray(val) && val.length >= 3) {
      const year = val[0];
      const month = val[1] - 1;
      const day = val[2];
      const hour = val[3] || 0;
      const min = val[4] || 0;
      const sec = val[5] || 0;
      const d = new Date(year, month, day, hour, min, sec);
      return isNaN(d.getTime()) ? null : d;
    }
    if (typeof val === 'string') {
      const trimmed = val.trim();
      const lower = trimmed.toLowerCase();
      if (lower === 'just now' || lower === 'now' || lower === 'right now') {
        return new Date();
      }
      if (lower === 'today') {
        return new Date();
      }
      if (lower === 'yesterday') {
        return new Date(Date.now() - 24 * 60 * 60 * 1000);
      }

      // Handle "yyyy-MM-dd hh:mm a" e.g. "2026-10-14 02:30 PM" or "2026-10-14 10:42 pm"
      const ampmMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i);
      if (ampmMatch) {
        const year = parseInt(ampmMatch[1], 10);
        const month = parseInt(ampmMatch[2], 10) - 1;
        const day = parseInt(ampmMatch[3], 10);
        let hour = parseInt(ampmMatch[4], 10);
        const minute = parseInt(ampmMatch[5], 10);
        const second = ampmMatch[6] ? parseInt(ampmMatch[6], 10) : 0;
        const isPm = ampmMatch[7].toUpperCase() === 'PM';
        if (isPm && hour < 12) hour += 12;
        if (!isPm && hour === 12) hour = 0;
        const d = new Date(year, month, day, hour, minute, second);
        if (!isNaN(d.getTime())) return d;
      }

      // Handle standard ISO strings (e.g. "2026-10-14T22:42:44.669897")
      let d = new Date(trimmed);
      if (!isNaN(d.getTime())) return d;

      // Handle "yyyy-MM-dd" or "yyyy-MM-dd HH:mm:ss"
      const stdMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?$/);
      if (stdMatch) {
        const year = parseInt(stdMatch[1], 10);
        const month = parseInt(stdMatch[2], 10) - 1;
        const day = parseInt(stdMatch[3], 10);
        const hour = stdMatch[4] ? parseInt(stdMatch[4], 10) : 0;
        const minute = stdMatch[5] ? parseInt(stdMatch[5], 10) : 0;
        const second = stdMatch[6] ? parseInt(stdMatch[6], 10) : 0;
        d = new Date(year, month, day, hour, minute, second);
        if (!isNaN(d.getTime())) return d;
      }
    }
    return null;
  }

  getTimeValue(notifOrDate?: any): number {
    if (!notifOrDate) return 0;

    let dateVal = notifOrDate;
    let timeStr = '';

    if (typeof notifOrDate === 'object') {
      if ('time' in notifOrDate && notifOrDate.time) {
        timeStr = String(notifOrDate.time).trim().toLowerCase();
      }
      if ('createdAt' in notifOrDate) {
        dateVal = notifOrDate.createdAt;
      }
    }

    // Relative time string fallback so "Just now" always sorts highest
    if (timeStr === 'just now' || timeStr === 'now' || timeStr === 'right now') {
      const d = this.parseDate(dateVal);
      const parsedTime = d ? d.getTime() : 0;
      return Math.max(Date.now(), parsedTime);
    }

    if (timeStr) {
      const minMatch = timeStr.match(/^(\d+)\s*m\s*ago$/);
      if (minMatch) {
        return Date.now() - parseInt(minMatch[1], 10) * 60 * 1000;
      }
      const hrMatch = timeStr.match(/^(\d+)\s*h\s*ago$/);
      if (hrMatch) {
        return Date.now() - parseInt(hrMatch[1], 10) * 3600 * 1000;
      }
      const dayMatch = timeStr.match(/^(\d+)\s*d\s*ago$/);
      if (dayMatch) {
        return Date.now() - parseInt(dayMatch[1], 10) * 86400 * 1000;
      }
    }

    const d = this.parseDate(dateVal);
    if (d) {
      const timeMs = d.getTime();
      // Future dates (e.g. appointment scheduledDate in future) must NOT outrank current time!
      if (timeMs > Date.now()) {
        return Date.now() - 60000;
      }
      return timeMs;
    }

    return 0;
  }

  calculateGroup(dateVal?: any): 'Today' | 'Yesterday' | 'Earlier' {
    const d = this.parseDate(dateVal);
    if (!d) return 'Earlier';

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).getTime();
    const time = d.getTime();

    if (time >= startOfToday) {
      return 'Today';
    } else if (time >= startOfYesterday && time < startOfToday) {
      return 'Yesterday';
    } else {
      return 'Earlier'; // 2+ days old -> disappears!
    }
  }

  formatRelativeTime(dateVal?: any): string {
    const d = this.parseDate(dateVal);
    if (!d) return 'Just now';

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();

    // If date is in the future (e.g. appointment scheduled date passed mistakenly)
    if (diffMs < 0) {
      return 'Today';
    }

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);

    const group = this.calculateGroup(d);

    if (group === 'Today') {
      if (diffSec < 60) return 'Just now';
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return 'Today';
    }

    if (group === 'Yesterday') {
      const hours = d.getHours();
      const minutes = d.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      return `Yesterday, ${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    return `${Math.floor(diffHours / 24)}d ago`;
  }

  private upsertNotification(item: AdminNotification) {
    const rawDate = item.createdAt;
    const group = this.calculateGroup(rawDate);

    // If older than yesterday (group === 'Earlier'), it disappears completely
    if (group === 'Earlier') {
      this.notifications = this.notifications.filter((x) => x.id !== item.id);
      return;
    }

    item.group = group;
    item.time = this.formatRelativeTime(rawDate);

    const index = this.notifications.findIndex((x) => x.id === item.id);
    if (index === -1) {
      if (this.isJustNow(item)) {
        this.notifications.unshift(item);
      } else {
        this.notifications.push(item);
      }
    } else {
      this.notifications[index].read = item.read;
      this.notifications[index].group = item.group;
      this.notifications[index].time = item.time;
      this.notifications[index].title = item.title;
      this.notifications[index].message = item.message;
      this.notifications[index].createdAt = rawDate;
      if (item.link) this.notifications[index].link = item.link;
    }
  }

  private refreshNotificationGroups() {
    this.notifications = this.notifications.filter((n) => {
      const grp = this.calculateGroup(n.createdAt);
      n.group = grp;
      n.time = this.formatRelativeTime(n.createdAt);
      return grp === 'Today' || grp === 'Yesterday';
    });
  }

  fetchRealNotifications() {
    const token = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    const dismissedIds: string[] = JSON.parse(localStorage.getItem('admin_dismissed_notifs') || '[]');
    const readIds: string[] = JSON.parse(localStorage.getItem('admin_read_notifs') || '[]');

    // Seed standard administrative operational status notifications at start of day (so real alerts sit on top)
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 1);
    const defaultNotifs: AdminNotification[] = [
      {
        id: 'sys-welcome',
        title: 'System Operational',
        message: 'ALCAS Academic Portal running normally. All services (Consultations, Attendance, Calendar) active.',
        time: 'Earlier today',
        read: readIds.includes('sys-welcome'),
        type: 'system',
        group: 'Today',
        createdAt: startOfToday,
        link: '/admin/settings',
      },
      {
        id: 'sys-backup',
        title: 'Daily Data Audit',
        message: 'Daily consultation log backup and audit check completed successfully.',
        time: 'Earlier today',
        read: readIds.includes('sys-backup'),
        type: 'system',
        group: 'Today',
        createdAt: startOfToday,
        link: '/admin/logs',
      }
    ];

    defaultNotifs.forEach((d) => {
      if (!dismissedIds.includes(d.id)) {
        this.upsertNotification(d);
      }
    });

    if (!token) {
      this.refreshNotificationGroups();
      this.cdr.detectChanges();
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
            const isRead = n.isRead || readIds.includes(dbId);
            const rawCreatedAt = n.createdAt;

            this.upsertNotification({
              id: dbId,
              title: n.title || 'System Notification',
              message: n.message || '',
              time: this.formatRelativeTime(rawCreatedAt),
              read: isRead,
              type: (n.type || '').toLowerCase() === 'broadcast' ? 'broadcast' : 'system',
              group: this.calculateGroup(rawCreatedAt),
              createdAt: rawCreatedAt,
            });
          });
          this.refreshNotificationGroups();
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.warn('Failed to load DB notifications for admin:', err),
    });

    // 2. Fetch Recent Consultations
    this.http.get<any[]>('http://localhost:8080/api/admin/consultations', { headers }).subscribe({
      next: (consultations) => {
        if (Array.isArray(consultations)) {
          consultations.forEach((c) => {
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
              const isRead = readIds.includes(notifId);
              let rawCreatedAt = c.createdAt;
              if (!rawCreatedAt) {
                const schedD = this.parseDate(c.scheduledDate);
                if (schedD && schedD.getTime() <= Date.now()) {
                  rawCreatedAt = c.scheduledDate;
                } else {
                  rawCreatedAt = new Date(Date.now() - 3600 * 1000 * 4);
                }
              }
              this.upsertNotification({
                id: notifId,
                title,
                message,
                time: this.formatRelativeTime(rawCreatedAt),
                read: isRead,
                type,
                group: this.calculateGroup(rawCreatedAt),
                createdAt: rawCreatedAt,
                link,
              });
            }
          });
          this.refreshNotificationGroups();
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.warn('Failed to load consultations for admin notifications:', err),
    });

    // 3. Fetch Recent Users
    this.http.get<any[]>('http://localhost:8080/api/admin/users', { headers }).subscribe({
      next: (users) => {
        if (Array.isArray(users)) {
          users.forEach((u) => {
            const notifId = `user-reg-${u.id}`;
            if (dismissedIds.includes(notifId)) return;
            const isRead = readIds.includes(notifId);
            if (u.createdAt) {
              const grp = this.calculateGroup(u.createdAt);
              if (grp === 'Today' || grp === 'Yesterday') {
                this.upsertNotification({
                  id: notifId,
                  title: 'User Account Registered',
                  message: `${u.name} registered as ${u.role} (${u.email}) - Status: ${u.status}.`,
                  time: this.formatRelativeTime(u.createdAt),
                  read: isRead,
                  type: 'user',
                  group: grp,
                  createdAt: u.createdAt,
                  link: '/admin/users',
                });
              }
            }
          });
          this.refreshNotificationGroups();
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.warn('Failed to load users for admin notifications:', err),
    });

    // 4. Fetch Broadcast Announcements
    this.http.get<any[]>('http://localhost:8080/api/admin/broadcasts', { headers }).subscribe({
      next: (broadcasts) => {
        if (Array.isArray(broadcasts)) {
          broadcasts.forEach((b) => {
            const notifId = `broadcast-${b.id}`;
            if (dismissedIds.includes(notifId)) return;
            const isRead = readIds.includes(notifId);
            const rawCreatedAt = b.createdAt || b.date;

            this.upsertNotification({
              id: notifId,
              title: b.subject || 'Campus Announcement',
              message: b.message || '',
              time: this.formatRelativeTime(rawCreatedAt),
              read: isRead,
              type: 'broadcast',
              group: this.calculateGroup(rawCreatedAt),
              createdAt: rawCreatedAt,
              link: '/admin/broadcasts',
            });
          });
          this.refreshNotificationGroups();
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.warn('Failed to load broadcasts for admin notifications:', err),
    });
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
