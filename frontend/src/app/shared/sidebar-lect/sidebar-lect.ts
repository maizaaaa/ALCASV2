import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ConsultationService, Consultation } from '../../services/consultation.service';

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
export class SidebarLect implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private http = inject(HttpClient);
  private consultationService = inject(ConsultationService);
  private cdr = inject(ChangeDetectorRef);

  isDarkMode: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEnabled: boolean = true;

  // Start with an empty array for real data
  notifications: LecturerNotification[] = [];

  private pollingSub!: Subscription;

  get todayNotifications(): LecturerNotification[] {
    return this.notifications
      .filter((n) => n.group === 'Today')
      .sort((a, b) => {
        const aIsBroadcast = a.time === 'Broadcast';
        const bIsBroadcast = b.time === 'Broadcast';
        if (aIsBroadcast && !bIsBroadcast) return -1;
        if (!aIsBroadcast && bIsBroadcast) return 1;
        return 0;
      });
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

      // Fetch immediately, then poll every 10 seconds
      this.fetchRealNotifications();
      this.pollingSub = interval(10000).subscribe(() => {
        this.fetchRealNotifications();
      });
    }
  }

  ngOnDestroy() {
    // Stop the timer when the component is destroyed
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  fetchRealNotifications() {
    // 1. Fetch In-App Notifications from Backend (e.g. Broadcast announcements & Admin warnings)
    const token = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : null;
    if (token) {
      this.http.get<any[]>('http://localhost:8080/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (dbNotifs) => {
          if (Array.isArray(dbNotifs)) {
            dbNotifs.forEach(n => {
              const dbId = `db-${n.id}`;
              const exists = this.notifications.find(x => x.id === dbId);
              const isBroadcast = (n.type || '').toUpperCase() === 'BROADCAST';
              if (!exists) {
                this.notifications.unshift({
                  id: dbId,
                  title: n.title,
                  message: n.message,
                  time: isBroadcast ? 'Broadcast' : 'Notice',
                  read: n.isRead,
                  type: isBroadcast ? 'reminder' : 'cancellation',
                  group: 'Today',
                  actionRequired: false,
                });
              }
            });
            this.cdr.detectChanges();
          }
        },
        error: (err) => console.warn('Failed to load DB notifications', err),
      });
    }

    // 2. Fetch Consultation Requests from Backend
    this.consultationService.getLecturerConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        // Find all pending requests in the database
        const pendingRequests = (consultations || []).filter(c => c.status === 'PENDING');

        // Add any NEW pending requests to notifications array
        pendingRequests.forEach(req => {
          const exists = this.notifications.find(n => n.id === req.id);
          if (!exists) {
            this.notifications.unshift({
              id: req.id,
              title: 'New Consultation Request',
              message: `${req.studentName} requested a consultation on ${req.scheduledDate} at ${req.scheduledTime}.`,
              time: 'Just now',
              read: false,
              type: 'booking',
              group: 'Today',
              studentName: req.studentName,
              actionRequired: true,
            });
          }
        });

        // Add No-Show consultation alerts for lecturer
        const noShowConsultations = (consultations || []).filter(
          c => (c.status || '').toUpperCase() === 'NO_SHOW' || (c.status || '').toUpperCase() === 'NO-SHOW'
        );
        noShowConsultations.forEach(req => {
          const notifId = `noshow-${req.id}`;
          const exists = this.notifications.find(n => n.id === notifId);
          if (!exists) {
            this.notifications.unshift({
              id: notifId,
              title: 'Attendance Alert: Missed Consultation',
              message: `Notice: ${req.studentName || 'Student'} did not attend the scheduled consultation on ${req.scheduledDate} at ${req.scheduledTime}.`,
              time: 'Alert',
              read: false,
              type: 'cancellation',
              group: 'Today',
              studentName: req.studentName,
              actionRequired: false,
            });
          }
        });

        // Remove notifications for requests that are NO LONGER pending
        this.notifications = this.notifications.filter(n => {
          if (n.type === 'booking' && n.actionRequired) {
            return pendingRequests.some(pr => pr.id === n.id);
          }
          return true;
        });
        this.cdr.detectChanges();
      },
      error: (err) => console.warn('Consultation list info:', err)
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
