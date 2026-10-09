import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ElementRef, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
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
  private consultationService = inject(ConsultationService); // Injected Service

  isDarkMode: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEnabled: boolean = true;

  // Start with an empty array for real data
  notifications: LecturerNotification[] = [];

  private pollingSub!: Subscription;

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
    this.consultationService.getLecturerConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        // Find all pending requests in the database
        const pendingRequests = consultations.filter(c => c.status === 'PENDING');

        // 1. Add any NEW pending requests to the top of our notifications array
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

        // 2. Remove notifications for requests that are NO LONGER pending
        // (e.g., you approved them on the dashboard)
        this.notifications = this.notifications.filter(n => {
          if (n.type === 'booking' && n.actionRequired) {
            // Keep it only if it is still pending in the database
            return pendingRequests.some(pr => pr.id === n.id);
          }
          return true; // Keep other types of notifications safely
        });
      },
      error: (err) => console.error('Failed to load notifications', err)
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
