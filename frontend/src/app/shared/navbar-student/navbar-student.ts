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
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsultationService, Consultation } from '../../services/consultation.service';
import { SystemSettingsService } from '../../services/system-settings.service';
import { StudentService } from '../../services/student.service';
import { BroadcastService, BroadcastItem } from '../../services/broadcast.service';
import {
  StudentNotificationService,
  ToastMessage,
} from '../../services/student-notification.service';

export type StudentNotifType =
  | 'maintenance'
  | 'booking'
  | 'cancellation'
  | 'reschedule'
  | 'broadcast'
  | 'reminder'
  | 'system';

export interface NotificationItem {
  id: string;
  dbId?: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: StudentNotifType;
  link?: string;
  createdAtRaw?: string;
}

@Component({
  selector: 'app-navbar-student',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-student.html',
  styleUrl: './navbar-student.css',
})
export class NavbarStudent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private http = inject(HttpClient);
  private consultationService = inject(ConsultationService);
  private systemSettingsService = inject(SystemSettingsService);
  private studentService = inject(StudentService);
  private broadcastService = inject(BroadcastService);
  private studentNotificationService = inject(StudentNotificationService);
  private cdr = inject(ChangeDetectorRef);

  isDarkMode: boolean = false;
  isMobileMenuOpen: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEnabled: boolean = true;
  studentName: string = 'Student';

  // Filter Tabs: ALL, SYSTEM (Maintenance/Broadcasts), BOOKINGS, ALERTS
  activeFilter: 'ALL' | 'SYSTEM' | 'BOOKINGS' | 'ALERTS' = 'ALL';

  notifications: NotificationItem[] = [];
  private dbNotifications: NotificationItem[] = [];
  private consultationNotifications: NotificationItem[] = [];
  private broadcastNotifications: NotificationItem[] = [];
  private systemNotifications: NotificationItem[] = [];
  private readNotifIds: Set<string> = new Set();
  private dismissedNotifIds: Set<string> = new Set();

  // Real-time Toast Alert State
  toastMessage: ToastMessage | null = null;
  private toastTimer: any = null;
  private pollInterval: any = null;
  private refreshSub: Subscription | null = null;
  private toastSub: Subscription | null = null;

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  get studentInitial(): string {
    return this.studentName ? this.studentName.charAt(0) : 'S';
  }

  get filteredNotifications(): NotificationItem[] {
    if (this.activeFilter === 'SYSTEM') {
      return this.notifications.filter(
        (n) => n.type === 'maintenance' || n.type === 'broadcast' || n.type === 'system',
      );
    }
    if (this.activeFilter === 'BOOKINGS') {
      return this.notifications.filter(
        (n) =>
          n.type === 'booking' || n.type === 'reschedule' || n.type === 'cancellation',
      );
    }
    if (this.activeFilter === 'ALERTS') {
      return this.notifications.filter((n) => n.type === 'reminder');
    }
    return this.notifications;
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

      this.loadSavedNotifState();
      this.loadStudentProfileName();
      this.loadNotifications();

      // Subscribe to real-time action refresh events
      this.refreshSub = this.studentNotificationService.refresh$.subscribe(() => {
        this.loadNotifications();
      });

      // Subscribe to real-time Toast messages
      this.toastSub = this.studentNotificationService.toast$.subscribe((toast) => {
        this.showToastPopup(toast);
      });

      // Polling for background real-time updates every 10 seconds
      this.pollInterval = setInterval(() => {
        if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
          this.loadNotifications();
        }
      }, 10000);
    }
  }

  ngOnDestroy() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
      this.refreshSub = null;
    }
    if (this.toastSub) {
      this.toastSub.unsubscribe();
      this.toastSub = null;
    }
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
  }

  @HostListener('window:student-notification-refresh')
  onStudentActionRefresh(): void {
    this.loadNotifications();
  }

  @HostListener('window:focus')
  onWindowFocus(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadNotifications();
    }
  }

  setFilter(filter: 'ALL' | 'SYSTEM' | 'BOOKINGS' | 'ALERTS', event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.activeFilter = filter;
    this.cdr.detectChanges();
  }

  showToastPopup(toast: ToastMessage): void {
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

  private loadSavedNotifState(): void {
    try {
      const savedRead = localStorage.getItem('student_read_notif_ids');
      if (savedRead) {
        this.readNotifIds = new Set(JSON.parse(savedRead));
      }
      const savedDismissed = localStorage.getItem('student_dismissed_notif_ids');
      if (savedDismissed) {
        this.dismissedNotifIds = new Set(JSON.parse(savedDismissed));
      }
    } catch (e) {
      console.error('Failed to parse saved notification state:', e);
    }
  }

  private saveNotifState(): void {
    try {
      localStorage.setItem(
        'student_read_notif_ids',
        JSON.stringify(Array.from(this.readNotifIds)),
      );
      localStorage.setItem(
        'student_dismissed_notif_ids',
        JSON.stringify(Array.from(this.dismissedNotifIds)),
      );
    } catch (e) {
      console.error('Failed to save notification state:', e);
    }
  }

  private loadStudentProfileName(): void {
    this.studentService.getMyProfile().subscribe({
      next: (profile) => {
        if (profile && profile.fullName) {
          this.studentName = profile.fullName;
          this.cdr.detectChanges();
        }
      },
      error: () => {},
    });
  }

  loadNotifications(): void {
    // 1. Fetch Real Database Notifications (Bookings, Cancellations, Reschedules, Broadcasts, Maintenance)
    this.studentNotificationService.getMyNotifications().subscribe({
      next: (dbNotifs) => {
        if (Array.isArray(dbNotifs)) {
          this.dbNotifications = dbNotifs.map((n) => {
            const rawTitle = (n.title || '').trim();
            const rawMsg = (n.message || '').trim();
            const rawType = (n.type || '').toUpperCase();

            let inferredType: StudentNotifType = 'system';

            const lowerCombo = `${rawTitle} ${rawMsg}`.toLowerCase();

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
              lowerCombo.includes('booked')
            ) {
              inferredType = 'booking';
            } else if (
              rawType === 'CANCELLATION' ||
              lowerCombo.includes('cancel') ||
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
            } else if (rawType === 'REMINDER' || lowerCombo.includes('reminder') || lowerCombo.includes('no-show')) {
              inferredType = 'reminder';
            }

            const notifId = `db-${n.id}`;
            const timeAgo = n.createdAt ? this.calculateTimeAgo(n.createdAt) : 'Notice';

            return {
              id: notifId,
              dbId: n.id,
              title: n.title,
              message: n.message,
              time: timeAgo,
              read: n.isRead || this.readNotifIds.has(notifId),
              type: inferredType,
              link: n.consultationId ? '/student/history' : '/student',
              createdAtRaw: n.createdAt,
            };
          });
          this.combineNotifications();
        }
      },
      error: () => {},
    });

    // 2. Fetch Active Student Consultations for Confirmed, Upcoming, and Reschedule Proposals
    this.consultationService.getStudentConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        this.buildConsultationNotifications(consultations);
      },
      error: (err) => {
        console.error('Failed to load student consultations for notifications:', err);
      },
    });

    // 3. Fetch System Announcement from Admin Settings
    this.systemSettingsService.getSetting('SYSTEM_ANNOUNCEMENT').subscribe({
      next: (setting) => {
        if (setting && setting.settingValue && setting.settingValue.trim()) {
          this.addSystemAnnouncement(setting.settingValue.trim());
        } else {
          this.addDefaultSystemAnnouncement();
        }
      },
      error: () => {
        this.addDefaultSystemAnnouncement();
      },
    });

    // 4. Fetch Broadcasts from Admin
    this.broadcastService.getBroadcasts().subscribe({
      next: (broadcasts: BroadcastItem[]) => {
        if (Array.isArray(broadcasts)) {
          const studentBroadcasts = broadcasts.filter((b) => {
            const aud = (b.audience || '').toUpperCase();
            return aud === 'ALL' || aud === 'STUDENTS' || aud === 'STUDENT';
          });

          this.broadcastNotifications = studentBroadcasts.map((b) => {
            const isMaint =
              (b.subject || '').toLowerCase().includes('maintenance') ||
              (b.message || '').toLowerCase().includes('maintenance');

            const notifId = `bc-${b.id}`;
            return {
              id: notifId,
              title: b.subject || 'Campus Announcement',
              message: b.message || 'New broadcast message from administration.',
              time: b.date || 'Broadcast',
              read: this.readNotifIds.has(notifId),
              type: isMaint ? ('maintenance' as const) : ('broadcast' as const),
              link: '/student',
              createdAtRaw: b.createdAt,
            };
          });
          this.combineNotifications();
        }
      },
      error: () => {},
    });
  }

  private buildConsultationNotifications(consultations: Consultation[]): void {
    const list: NotificationItem[] = [];

    (consultations || []).forEach((c) => {
      const statusUpper = (c.status || '').toUpperCase();
      const formattedTime = this.formatTime(c.scheduledTime);
      const timeAgo = this.calculateTimeAgo(c.scheduledDate);

      // 1. Confirmed Appointment Notification
      if (statusUpper === 'CONFIRMED') {
        const notifId = `conf-${c.id}`;
        list.push({
          id: notifId,
          title: 'Appointment Confirmed',
          message: `Your consultation session with ${c.lecturerName || 'Lecturer'} on ${c.scheduledDate} at ${formattedTime} has been confirmed.`,
          time: timeAgo,
          read: this.readNotifIds.has(notifId),
          type: 'booking',
          link: '/student/history',
        });

        // 2. Upcoming Session Reminder (Within active window)
        if (this.isUpcoming(c.scheduledDate)) {
          const reminderId = `upc-${c.id}`;
          list.push({
            id: reminderId,
            title: 'Upcoming Consultation Session',
            message: `Reminder: Consultation with ${c.lecturerName || 'Lecturer'} is scheduled for ${c.scheduledDate} at ${formattedTime}.`,
            time: 'Upcoming',
            read: this.readNotifIds.has(reminderId),
            type: 'reminder',
            link: '/student',
          });
        }
      }

      // 3. Reschedule Proposal from Lecturer Pending Student Review
      if (
        statusUpper === 'RESCHEDULED' ||
        statusUpper === 'RESCHEDULE_PENDING' ||
        statusUpper === 'RESCHEDULE-PENDING' ||
        statusUpper === 'RESCHEDULE' ||
        statusUpper === 'PROPOSED'
      ) {
        const reschId = `resch-${c.id}`;
        const newDateText = c.proposedDate ? `${c.proposedDate}` : c.scheduledDate;
        const newTimeText = c.proposedTime ? this.formatTime(c.proposedTime) : formattedTime;
        const msg = `${c.lecturerName || 'Lecturer'} proposed a new time for your consultation on ${newDateText} at ${newTimeText}. Please review your appointment.`;

        list.push({
          id: reschId,
          title: 'Reschedule Proposal Awaiting Review',
          message: msg,
          time: timeAgo,
          read: this.readNotifIds.has(reschId),
          type: 'reschedule',
          link: '/student/history',
        });
      }

      // 4. Consultation No-Show Alert
      if (statusUpper === 'NO_SHOW' || statusUpper === 'NO-SHOW') {
        const noShowId = `noshow-${c.id}`;
        list.push({
          id: noShowId,
          title: 'Attendance Alert: Missed Consultation',
          message: `Notice: You were recorded as a NO-SHOW for your consultation with ${c.lecturerName || 'Lecturer'} on ${c.scheduledDate} at ${formattedTime}.`,
          time: timeAgo,
          read: this.readNotifIds.has(noShowId),
          type: 'reminder',
          link: '/student/history',
        });
      }
    });

    this.consultationNotifications = list;
    this.combineNotifications();
  }

  private addSystemAnnouncement(announcementText: string): void {
    const isMaint = announcementText.toLowerCase().includes('maintenance');
    const sysId = 'sys-announcement';
    this.systemNotifications = [
      {
        id: sysId,
        title: isMaint ? 'System Maintenance Notice' : 'System Announcement',
        message: announcementText,
        time: 'Admin Notice',
        read: this.readNotifIds.has(sysId),
        type: isMaint ? 'maintenance' : 'system',
      },
    ];
    this.combineNotifications();
  }

  private addDefaultSystemAnnouncement(): void {
    const sysId = 'sys-announcement-default';
    this.systemNotifications = [
      {
        id: sysId,
        title: 'System Announcement',
        message:
          'Welcome to ConsultEase! Real-time notifications keep you informed on session bookings, reschedules, and campus notices.',
        time: 'System Notice',
        read: this.readNotifIds.has(sysId),
        type: 'system',
      },
    ];
    this.combineNotifications();
  }

  private combineNotifications(): void {
    const combined = [
      ...this.dbNotifications,
      ...this.broadcastNotifications,
      ...this.consultationNotifications,
      ...this.systemNotifications,
    ];

    // De-duplicate by notification ID
    const uniqueMap = new Map<string, NotificationItem>();
    combined.forEach((item) => {
      if (!uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, item);
      }
    });

    // Filter out dismissed notifications
    const visible = Array.from(uniqueMap.values()).filter(
      (n) => !this.dismissedNotifIds.has(n.id),
    );

    // Sort: unread first, then by date/priority
    this.notifications = visible.sort((a, b) => {
      if (a.read !== b.read) {
        return a.read ? 1 : -1;
      }
      return (b.createdAtRaw || '').localeCompare(a.createdAtRaw || '');
    });

    this.cdr.detectChanges();
  }

  private formatTime(timeString: string): string {
    if (!timeString) return '';
    const parts = timeString.split(':');
    if (parts.length < 2) return timeString;
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  private isUpcoming(dateStr: string): boolean {
    if (!dateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [y, m, d] = dateStr.split('-').map(Number);
    if (!y || !m || !d) return false;
    const apptDate = new Date(y, m - 1, d);
    return apptDate >= today;
  }

  private calculateTimeAgo(dateStr: string): string {
    if (!dateStr) return 'Recently';
    try {
      const targetDate = new Date(dateStr);
      if (isNaN(targetDate.getTime())) {
        const [y, m, d] = dateStr.split('-').map(Number);
        if (y && m && d) {
          const apptDate = new Date(y, m - 1, d);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const diffDays = Math.floor(
            (today.getTime() - apptDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          if (diffDays === 0) return 'Today';
          if (diffDays === 1) return 'Yesterday';
          if (diffDays < 0) return `In ${Math.abs(diffDays)}d`;
          return `${diffDays}d ago`;
        }
        return 'Recently';
      }

      const diffMs = Date.now() - targetDate.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
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
      localStorage.setItem(
        'student_notifications_enabled',
        String(this.notificationsEnabled),
      );
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
    this.saveNotifState();

    // Call backend endpoint to persist
    this.studentNotificationService.markAllAsRead().subscribe({
      next: () => {},
      error: () => {},
    });

    this.cdr.detectChanges();
  }

  markAsRead(notif: NotificationItem, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    notif.read = true;
    this.readNotifIds.add(notif.id);
    this.saveNotifState();

    if (notif.dbId) {
      this.studentNotificationService.markAsRead(notif.dbId).subscribe({
        next: () => {},
        error: () => {},
      });
    }

    this.cdr.detectChanges();

    if (notif.link) {
      this.isNotificationOpen = false;
      this.router.navigate([notif.link]);
    }
  }

  deleteNotification(id: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const item = this.notifications.find((n) => n.id === id);
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.dismissedNotifIds.add(id);
    this.saveNotifState();

    if (item?.dbId) {
      this.studentNotificationService.deleteNotification(item.dbId).subscribe({
        next: () => {},
        error: () => {},
      });
    }

    this.cdr.detectChanges();
  }

  clearAllNotifications(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.notifications.forEach((n) => this.dismissedNotifIds.add(n.id));
    this.notifications = [];
    this.saveNotifState();

    this.studentNotificationService.clearAllNotifications().subscribe({
      next: () => {},
      error: () => {},
    });

    this.cdr.detectChanges();
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
