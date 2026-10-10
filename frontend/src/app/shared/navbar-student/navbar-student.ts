import { Component, OnInit, inject, PLATFORM_ID, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { ConsultationService, Consultation } from '../../services/consultation.service';
import { SystemSettingsService } from '../../services/system-settings.service';
import { StudentService } from '../../services/student.service';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'reminder' | 'system';
  link?: string;
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
  private consultationService = inject(ConsultationService);
  private systemSettingsService = inject(SystemSettingsService);
  private studentService = inject(StudentService);
  private cdr = inject(ChangeDetectorRef);

  isDarkMode: boolean = false;
  isMobileMenuOpen: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEnabled: boolean = true;
  studentName: string = 'Student';

  notifications: NotificationItem[] = [];
  private consultationNotifications: NotificationItem[] = [];
  private systemNotifications: NotificationItem[] = [];
  private readNotifIds: Set<string> = new Set();
  private dismissedNotifIds: Set<string> = new Set();

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

      this.loadSavedNotifState();
      this.loadStudentProfileName();
      this.loadNotifications();
    }
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
      localStorage.setItem('student_read_notif_ids', JSON.stringify(Array.from(this.readNotifIds)));
      localStorage.setItem('student_dismissed_notif_ids', JSON.stringify(Array.from(this.dismissedNotifIds)));
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
    // 1. Fetch Student Consultations for Confirmed, Upcoming, and Reschedule Pending
    this.consultationService.getStudentConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        this.buildConsultationNotifications(consultations);
      },
      error: (err) => {
        console.error('Failed to load student notifications:', err);
      },
    });

    // 2. Fetch System Announcement from Admin Settings
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
  }

  private buildConsultationNotifications(consultations: Consultation[]): void {
    const list: NotificationItem[] = [];

    (consultations || []).forEach((c) => {
      const statusUpper = (c.status || '').toUpperCase();
      const formattedTime = this.formatTime(c.scheduledTime);
      const timeAgo = this.calculateTimeAgo(c.scheduledDate);

      // 1. Confirmation Appointment
      if (statusUpper === 'CONFIRMED') {
        const notifId = `conf-${c.id}`;
        list.push({
          id: notifId,
          title: 'Appointment Confirmed',
          message: `Your consultation session with ${c.lecturerName || 'Lecturer'} on ${c.scheduledDate} at ${formattedTime} has been confirmed.`,
          time: timeAgo,
          read: this.readNotifIds.has(notifId),
          type: 'appointment',
          link: '/student/history',
        });

        // 2. Upcoming Session Reminder
        if (this.isUpcoming(c.scheduledDate)) {
          const reminderId = `upc-${c.id}`;
          list.push({
            id: reminderId,
            title: 'Upcoming Session',
            message: `Reminder: Consultation with ${c.lecturerName || 'Lecturer'} is scheduled for ${c.scheduledDate} at ${formattedTime}.`,
            time: 'Upcoming',
            read: this.readNotifIds.has(reminderId),
            type: 'reminder',
            link: '/student',
          });
        }
      }

      // 3. Reschedule Pending
      if (
        statusUpper === 'RESCHEDULED' ||
        statusUpper === 'RESCHEDULE_PENDING' ||
        statusUpper === 'RESCHEDULE' ||
        statusUpper === 'PROPOSED'
      ) {
        const reschId = `resch-${c.id}`;
        const newDateText = c.proposedDate ? `${c.proposedDate}` : c.scheduledDate;
        const newTimeText = c.proposedTime ? this.formatTime(c.proposedTime) : formattedTime;
        const msg = `${c.lecturerName || 'Lecturer'} proposed a new time for your consultation on ${newDateText} at ${newTimeText}. Please review your appointment.`;

        list.push({
          id: reschId,
          title: 'Reschedule Request Pending',
          message: msg,
          time: timeAgo,
          read: this.readNotifIds.has(reschId),
          type: 'appointment',
          link: '/student/history',
        });
      }
    });

    this.consultationNotifications = list;
    this.combineNotifications();
  }

  private addSystemAnnouncement(announcementText: string): void {
    const sysId = 'sys-announcement';
    this.systemNotifications = [
      {
        id: sysId,
        title: 'System Announcement',
        message: announcementText,
        time: 'Admin Notice',
        read: this.readNotifIds.has(sysId),
        type: 'system',
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
        message: 'Welcome to ConsultEase! Check your notifications for session updates and campus announcements.',
        time: 'System Notice',
        read: this.readNotifIds.has(sysId),
        type: 'system',
      },
    ];
    this.combineNotifications();
  }

  private combineNotifications(): void {
    const merged = [...this.consultationNotifications, ...this.systemNotifications];
    // Filter out dismissed notifications
    this.notifications = merged.filter((n) => !this.dismissedNotifIds.has(n.id));
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [y, m, d] = dateStr.split('-').map(Number);
    if (!y || !m || !d) return 'Recently';
    const apptDate = new Date(y, m - 1, d);
    const diffDays = Math.floor((today.getTime() - apptDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 0) return `In ${Math.abs(diffDays)}d`;
    return `${diffDays}d ago`;
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
    this.notifications.forEach((n) => {
      n.read = true;
      this.readNotifIds.add(n.id);
    });
    this.saveNotifState();
    this.cdr.detectChanges();
  }

  markAsRead(notif: NotificationItem, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    notif.read = true;
    this.readNotifIds.add(notif.id);
    this.saveNotifState();
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
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.dismissedNotifIds.add(id);
    this.saveNotifState();
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
