import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Subscription, interval, filter } from 'rxjs';
import { ConsultationService, Consultation } from '../../services/consultation.service';
import { SystemSettingsService } from '../../services/system-settings.service';
import { BroadcastService, BroadcastItem } from '../../services/broadcast.service';
import {
  LecturerNotificationService,
  LecturerToastMessage,
} from '../../services/lecturer-notification.service';

export type LecturerNotifType =
  | 'maintenance'
  | 'booking'
  | 'cancellation'
  | 'reschedule'
  | 'broadcast'
  | 'reminder'
  | 'system';

export interface LecturerNotification {
  id: string;
  dbId?: number | string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: LecturerNotifType;
  group: 'Today' | 'Yesterday' | 'Earlier';
  studentName?: string;
  actionRequired?: boolean;
  link?: string;
  createdAtRaw?: string;
}

@Component({
  selector: 'app-sidebar-lect',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-lect.html',
  styleUrl: './sidebar-lect.css',
})
export class SidebarLect implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private http = inject(HttpClient);
  private consultationService = inject(ConsultationService);
  private systemSettingsService = inject(SystemSettingsService);
  private broadcastService = inject(BroadcastService);
  private lecturerNotificationService = inject(LecturerNotificationService);
  private cdr = inject(ChangeDetectorRef);

  isDarkMode: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEnabled: boolean = true;

  // Active filter tab
  activeFilter: 'ALL' | 'BOOKINGS' | 'RESCHEDULES' | 'SYSTEM' = 'ALL';

  // Notifications collection
  notifications: LecturerNotification[] = [];
  private dbNotifications: LecturerNotification[] = [];
  private consultationNotifications: LecturerNotification[] = [];
  private broadcastNotifications: LecturerNotification[] = [];
  private systemNotifications: LecturerNotification[] = [];

  // Set of read notification IDs stored in localStorage for optimistic persistence
  private readNotifIds: Set<string> = new Set();

  // Floating Real-time Toast Alert State
  toastMessage: LecturerToastMessage | null = null;
  private toastTimer: any = null;

  private pollingSub!: Subscription;
  private routerSub!: Subscription;
  private refreshSub!: Subscription;
  private toastSub!: Subscription;

  get filteredNotifications(): LecturerNotification[] {
    if (this.activeFilter === 'BOOKINGS') {
      return this.notifications.filter(
        (n) => n.type === 'booking' || n.type === 'cancellation'
      );
    }
    if (this.activeFilter === 'RESCHEDULES') {
      return this.notifications.filter((n) => n.type === 'reschedule');
    }
    if (this.activeFilter === 'SYSTEM') {
      return this.notifications.filter(
        (n) =>
          n.type === 'maintenance' ||
          n.type === 'broadcast' ||
          n.type === 'system' ||
          n.type === 'reminder'
      );
    }
    return this.notifications;
  }

  isJustNow(notif?: LecturerNotification): boolean {
    if (!notif) return false;
    const timeLower = (notif.time || '').trim().toLowerCase();
    if (
      timeLower === 'just now' ||
      timeLower === 'now' ||
      timeLower === 'right now' ||
      timeLower.includes('just now')
    ) {
      return true;
    }
    if (notif.createdAtRaw) {
      try {
        const d = new Date(notif.createdAtRaw);
        if (!isNaN(d.getTime())) {
          const diffMs = Date.now() - d.getTime();
          if (diffMs >= 0 && diffMs < 60000) {
            return true;
          }
        }
      } catch {}
    }
    return false;
  }

  getTimeValue(notif?: LecturerNotification): number {
    if (!notif) return 0;

    const timeLower = (notif.time || '').trim().toLowerCase();
    if (
      timeLower === 'just now' ||
      timeLower === 'now' ||
      timeLower === 'right now' ||
      timeLower.includes('just now')
    ) {
      if (notif.createdAtRaw) {
        const d = new Date(notif.createdAtRaw);
        if (!isNaN(d.getTime())) {
          return Math.max(Date.now(), d.getTime());
        }
      }
      return Date.now();
    }

    if (timeLower) {
      const minMatch = timeLower.match(/^(\d+)\s*m\s*ago$/);
      if (minMatch) {
        return Date.now() - parseInt(minMatch[1], 10) * 60 * 1000;
      }
      const hrMatch = timeLower.match(/^(\d+)\s*h\s*ago$/);
      if (hrMatch) {
        return Date.now() - parseInt(hrMatch[1], 10) * 3600 * 1000;
      }
      const dayMatch = timeLower.match(/^(\d+)\s*d\s*ago$/);
      if (dayMatch) {
        return Date.now() - parseInt(dayMatch[1], 10) * 86400 * 1000;
      }
    }

    if (notif.createdAtRaw) {
      const d = new Date(notif.createdAtRaw);
      if (!isNaN(d.getTime())) {
        const timeMs = d.getTime();
        if (timeMs > Date.now()) {
          return Date.now() - 60000;
        }
        return timeMs;
      }
    }

    return 0;
  }

  get todayNotifications(): LecturerNotification[] {
    return this.filteredNotifications
      .filter((n) => n.group === 'Today')
      .sort((a, b) => {
        // 1. "Just now" MUST be at the very top
        const aJustNow = this.isJustNow(a);
        const bJustNow = this.isJustNow(b);
        if (aJustNow && !bJustNow) return -1;
        if (!aJustNow && bJustNow) return 1;

        // 2. Real timestamp (newest first)
        const timeDiff = this.getTimeValue(b) - this.getTimeValue(a);
        if (timeDiff !== 0) return timeDiff;

        // 3. Unread items or action required come next
        if (a.actionRequired && !b.actionRequired) return -1;
        if (!a.actionRequired && b.actionRequired) return 1;
        if (!a.read && b.read) return -1;
        if (a.read && !b.read) return 1;
        return 0;
      });
  }

  get yesterdayNotifications(): LecturerNotification[] {
    return this.filteredNotifications
      .filter(
        (n) => n.group === 'Yesterday' || n.group === 'Earlier'
      )
      .sort((a, b) => {
        const aJustNow = this.isJustNow(a);
        const bJustNow = this.isJustNow(b);
        if (aJustNow && !bJustNow) return -1;
        if (!aJustNow && bJustNow) return 1;

        const timeDiff = this.getTimeValue(b) - this.getTimeValue(a);
        if (timeDiff !== 0) return timeDiff;

        if (a.actionRequired && !b.actionRequired) return -1;
        if (!a.actionRequired && b.actionRequired) return 1;
        if (!a.read && b.read) return -1;
        if (a.read && !b.read) return 1;
        return 0;
      });
  }

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isNotificationOpen = false;
        this.cdr.detectChanges();
      });

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

      this.loadSavedReadState();

      // Fetch immediately
      this.fetchAllNotifications();

      // Real-time Action Refresh Subscription
      this.refreshSub = this.lecturerNotificationService.refresh$.subscribe(() => {
        this.fetchAllNotifications();
      });

      // Real-time Toast Message Subscription
      this.toastSub = this.lecturerNotificationService.toast$.subscribe((toast) => {
        this.showToastPopup(toast);
      });

      // Background Polling every 8 seconds when window is visible
      this.pollingSub = interval(8000).subscribe(() => {
        if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
          this.fetchAllNotifications();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
    if (this.toastSub) {
      this.toastSub.unsubscribe();
    }
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  @HostListener('window:lecturer-notification-refresh')
  onLecturerActionRefresh(): void {
    this.fetchAllNotifications();
  }

  @HostListener('window:focus')
  onWindowFocus(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchAllNotifications();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event?: Event) {
    if (this.isNotificationOpen) {
      this.isNotificationOpen = false;
    }
  }

  setFilter(filter: 'ALL' | 'BOOKINGS' | 'RESCHEDULES' | 'SYSTEM', event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.activeFilter = filter;
    this.cdr.detectChanges();
  }

  showToastPopup(toast: LecturerToastMessage): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastMessage = toast;
    this.cdr.detectChanges();

    this.toastTimer = setTimeout(() => {
      this.toastMessage = null;
      this.cdr.detectChanges();
    }, 4500);
  }

  dismissToast(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastMessage = null;
    this.cdr.detectChanges();
  }

  private loadSavedReadState(): void {
    try {
      const savedRead = localStorage.getItem('lecturer_read_notif_ids');
      if (savedRead) {
        this.readNotifIds = new Set(JSON.parse(savedRead));
      }
    } catch (e) {
      console.warn('Failed to parse lecturer read notif state:', e);
    }
  }

  private saveReadState(): void {
    try {
      localStorage.setItem(
        'lecturer_read_notif_ids',
        JSON.stringify(Array.from(this.readNotifIds))
      );
    } catch (e) {
      console.warn('Failed to save lecturer read notif state:', e);
    }
  }

  fetchAllNotifications(): void {
    // 1. Fetch In-App Database Notifications from Backend
    this.lecturerNotificationService.getMyNotifications().subscribe({
      next: (dbNotifs) => {
        if (Array.isArray(dbNotifs)) {
          this.dbNotifications = dbNotifs.map((n) => {
            const rawTitle = (n.title || '').trim();
            const rawMsg = (n.message || '').trim();
            const rawType = (n.type || '').toUpperCase();
            const lowerCombo = `${rawTitle} ${rawMsg}`.toLowerCase();

            let inferredType: LecturerNotifType = 'system';
            if (
              rawType === 'MAINTENANCE' ||
              lowerCombo.includes('maintenance') ||
              lowerCombo.includes('server update') ||
              lowerCombo.includes('downtime')
            ) {
              inferredType = 'maintenance';
            } else if (
              rawType === 'BOOKING' ||
              lowerCombo.includes('booking') ||
              lowerCombo.includes('consultation approved') ||
              lowerCombo.includes('booked')
            ) {
              inferredType = 'booking';
            } else if (
              rawType === 'CANCELLATION' ||
              lowerCombo.includes('cancel') ||
              lowerCombo.includes('declined') ||
              lowerCombo.includes('cancelled')
            ) {
              inferredType = 'cancellation';
            } else if (
              rawType === 'RESCHEDULE' ||
              lowerCombo.includes('reschedule') ||
              lowerCombo.includes('proposed')
            ) {
              inferredType = 'reschedule';
            } else if (rawType === 'BROADCAST' || lowerCombo.includes('announcement')) {
              inferredType = 'broadcast';
            } else if (
              rawType === 'REMINDER' ||
              lowerCombo.includes('reminder') ||
              lowerCombo.includes('no-show')
            ) {
              inferredType = 'reminder';
            }

            const notifId = `db-${n.id}`;
            const timeAgo = n.createdAt ? this.calculateTimeAgo(n.createdAt) : 'Notice';
            const isRead = n.isRead || this.readNotifIds.has(notifId);

            return {
              id: notifId,
              dbId: n.id,
              title: n.title,
              message: n.message,
              time: timeAgo,
              read: isRead,
              type: inferredType,
              group: this.determineTimeGroup(n.createdAt),
              actionRequired: false,
              link: '/lecturer/appointments',
              createdAtRaw: n.createdAt,
            };
          });
          this.combineNotifications();
        }
      },
      error: (err) => console.warn('Failed to load DB notifications', err),
    });

    // 2. Fetch Active Consultation Requests from Backend
    this.consultationService.getLecturerConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        this.buildConsultationNotifications(consultations || []);
      },
      error: (err) => console.warn('Failed to load consultations for notifications:', err),
    });

    // 3. Fetch Broadcasts from Admin
    this.broadcastService.getBroadcasts().subscribe({
      next: (broadcasts: BroadcastItem[]) => {
        if (Array.isArray(broadcasts)) {
          const lecturerBroadcasts = broadcasts.filter((b) => {
            const aud = (b.audience || '').toUpperCase();
            return aud === 'ALL' || aud === 'LECTURERS' || aud === 'LECTURER';
          });

          this.broadcastNotifications = lecturerBroadcasts.map((b) => {
            const isMaint =
              (b.subject || '').toLowerCase().includes('maintenance') ||
              (b.message || '').toLowerCase().includes('maintenance');

            const notifId = `bc-${b.id}`;
            const isRead = this.readNotifIds.has(notifId);
            let timeAgo = b.date || 'Broadcast';
            if (b.createdAt) {
              const calc = this.calculateTimeAgo(b.createdAt);
              if (calc) timeAgo = calc;
            } else if ((b.date || '').toLowerCase().includes('now')) {
              timeAgo = 'Just now';
            }

            return {
              id: notifId,
              title: b.subject || 'Campus Broadcast',
              message: b.message || 'New broadcast message from administration.',
              time: timeAgo,
              read: isRead,
              type: isMaint ? ('maintenance' as const) : ('broadcast' as const),
              group: b.createdAt ? this.determineTimeGroup(b.createdAt) : 'Today',
              link: '/lecturer',
              createdAtRaw: b.createdAt,
            };
          });
          this.combineNotifications();
        }
      },
      error: () => {},
    });

    // 4. Fetch System Announcement from Admin Settings
    this.systemSettingsService.getSetting('SYSTEM_ANNOUNCEMENT').subscribe({
      next: (setting) => {
        if (setting && setting.settingValue && setting.settingValue.trim()) {
          const notifId = 'sys-announcement-active';
          this.systemNotifications = [
            {
              id: notifId,
              title: 'System Notice: Planned Maintenance',
              message: setting.settingValue.trim(),
              time: 'Notice',
              read: this.readNotifIds.has(notifId),
              type: 'maintenance',
              group: 'Today',
              link: '/lecturer',
            },
          ];
        } else {
          this.systemNotifications = [];
        }
        this.combineNotifications();
      },
      error: () => {
        this.systemNotifications = [];
        this.combineNotifications();
      },
    });
  }

  private buildConsultationNotifications(consultations: Consultation[]): void {
    const list: LecturerNotification[] = [];

    consultations.forEach((req) => {
      const statusUpper = (req.status || '').toUpperCase();
      const initiator = (req.rescheduleInitiator || '').toUpperCase();

      // A: Pending Consultation Requests (Awaiting Lecturer Approval)
      if (statusUpper === 'PENDING' && initiator !== 'STUDENT') {
        const notifId = `req-${req.id}`;
        let timeAgo = 'Awaiting Action';
        if (req.createdAt) {
          const calc = this.calculateTimeAgo(req.createdAt);
          if (calc === 'Just now') {
            timeAgo = 'Just now';
          }
        }
        list.push({
          id: notifId,
          title: 'New Consultation Request',
          message: `${req.studentName || 'Student'} requested a consultation on ${req.scheduledDate} at ${this.formatTime(req.scheduledTime)}.`,
          time: timeAgo,
          read: this.readNotifIds.has(notifId),
          type: 'booking',
          group: req.createdAt ? this.determineTimeGroup(req.createdAt) : 'Today',
          studentName: req.studentName,
          actionRequired: true,
          link: '/lecturer/appointments',
          createdAtRaw: req.createdAt,
        });
      }

      // B: Student-Initiated Reschedule Requests (Awaiting Lecturer Review)
      if (
        (statusUpper === 'PENDING' && initiator === 'STUDENT') ||
        statusUpper === 'RESCHEDULE_PENDING'
      ) {
        const reschId = `resch-${req.id}`;
        const newDate = req.proposedDate || req.scheduledDate;
        const newTime = req.proposedTime ? this.formatTime(req.proposedTime) : this.formatTime(req.scheduledTime);
        let timeAgo = 'Pending Review';
        if (req.createdAt) {
          const calc = this.calculateTimeAgo(req.createdAt);
          if (calc === 'Just now') {
            timeAgo = 'Just now';
          }
        }
        list.push({
          id: reschId,
          title: 'Reschedule Request from Student',
          message: `${req.studentName || 'Student'} requested to reschedule appointment to ${newDate} at ${newTime}.`,
          time: timeAgo,
          read: this.readNotifIds.has(reschId),
          type: 'reschedule',
          group: req.createdAt ? this.determineTimeGroup(req.createdAt) : 'Today',
          studentName: req.studentName,
          actionRequired: true,
          link: '/lecturer/appointments',
          createdAtRaw: req.createdAt,
        });
      }

      // C: Attendance No-Show Alerts
      if (statusUpper === 'NO_SHOW' || statusUpper === 'NO-SHOW') {
        const notifId = `noshow-${req.id}`;
        list.push({
          id: notifId,
          title: 'Attendance Alert: Missed Consultation',
          message: `Notice: ${req.studentName || 'Student'} was recorded as No-Show for consultation on ${req.scheduledDate} at ${this.formatTime(req.scheduledTime)}.`,
          time: 'Alert',
          read: this.readNotifIds.has(notifId),
          type: 'reminder',
          group: 'Today',
          studentName: req.studentName,
          actionRequired: false,
          link: '/lecturer/history',
        });
      }
    });

    this.consultationNotifications = list;
    this.combineNotifications();
  }

  private combineNotifications(): void {
    const combinedMap = new Map<string, LecturerNotification>();

    // Priority 1: Consultation actionable events
    this.consultationNotifications.forEach((n) => combinedMap.set(n.id, n));

    // Priority 2: In-app database notifications
    this.dbNotifications.forEach((n) => {
      if (!combinedMap.has(n.id)) {
        combinedMap.set(n.id, n);
      }
    });

    // Priority 3: Broadcasts
    this.broadcastNotifications.forEach((n) => {
      if (!combinedMap.has(n.id)) {
        combinedMap.set(n.id, n);
      }
    });

    // Priority 4: System maintenance notices
    this.systemNotifications.forEach((n) => {
      if (!combinedMap.has(n.id)) {
        combinedMap.set(n.id, n);
      }
    });

    this.notifications = Array.from(combinedMap.values());
    this.cdr.detectChanges();
  }

  private determineTimeGroup(rawDate?: string): 'Today' | 'Yesterday' | 'Earlier' {
    if (!rawDate) return 'Today';
    try {
      const itemDate = new Date(rawDate);
      const now = new Date();

      const itemMidnight = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate()).getTime();
      const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (itemMidnight === todayMidnight) {
        return 'Today';
      } else if (todayMidnight - itemMidnight <= oneDay) {
        return 'Yesterday';
      } else {
        return 'Earlier';
      }
    } catch {
      return 'Today';
    }
  }

  private calculateTimeAgo(dateStr: string): string {
    try {
      const now = new Date();
      const date = new Date(dateStr);
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch {
      return 'Recent';
    }
  }

  private formatTime(timeStr?: string | null): string {
    if (!timeStr) return '';
    const clean = timeStr.trim();
    if (clean.includes('AM') || clean.includes('PM')) {
      return clean;
    }
    const parts = clean.split(':');
    if (parts.length >= 2) {
      let hours = parseInt(parts[0], 10);
      const minutes = parts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    }
    return clean;
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
    this.notifications.forEach((n) => {
      n.read = true;
      this.readNotifIds.add(n.id);
    });
    this.saveReadState();

    this.lecturerNotificationService.markAllAsRead().subscribe({
      next: () => {},
      error: () => {},
    });
  }

  markAsRead(notif: LecturerNotification, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (notif.read) return;

    notif.read = true;
    this.readNotifIds.add(notif.id);
    this.saveReadState();

    if (notif.dbId) {
      this.lecturerNotificationService.markAsRead(notif.dbId).subscribe({
        next: () => {},
        error: () => {},
      });
    }
  }

  deleteNotification(id: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const item = this.notifications.find((n) => n.id === id);
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.readNotifIds.delete(id);
    this.saveReadState();

    if (item && item.dbId) {
      this.lecturerNotificationService.deleteNotification(item.dbId).subscribe({
        next: () => {},
        error: () => {},
      });
    }
  }

  clearAllNotifications(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.notifications = [];
    this.readNotifIds.clear();
    this.saveReadState();

    this.lecturerNotificationService.clearAllNotifications().subscribe({
      next: () => {},
      error: () => {},
    });
  }

  approveNotificationBooking(notif: LecturerNotification, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.markAsRead(notif);
    this.router.navigate(['/lecturer/appointments']);
    this.closeDrawer();
  }

  viewNotificationDetails(notif: LecturerNotification, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.markAsRead(notif);
    this.router.navigate([notif.link || '/lecturer/appointments']);
    this.closeDrawer();
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
