import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { ConsultationService, Consultation} from '../../services/consultation.service';
import { LecturerNotificationService } from '../../services/lecturer-notification.service';

@Component({
  selector: 'app-lecturer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SidebarLect],
  templateUrl: './lecturer-dashboard.html',
  styleUrls: ['./lecturer-dashboard.css'],
})
export class LecturerDashboardComponent implements OnInit {
  // Quick Stats
  stats = {
    todayMeetings: 0,
    pendingRequests: 0,
    upcomingThisWeek: 0,
  };

  // Today's Schedule (Mix of classes and consultations)
  todaySchedule: any[] = [];
  todayClassCount = 0;
  todayConsultationCount = 0;

  // Pending Requests needing immediate action
  allAppointments: Consultation[] = [];
  pendingRequests: Consultation[] = [];

  // Modal State for Dashboard Approval
  showActionModal = false;
  selectedAppt: Consultation | null = null;
  approvalRoomNumber: string = 'Block A, Room BK-34';
  actionNotes: string = '';
  quickRooms: string[] = [
    'Block A, Room BK-34',
    'Lecturer Office BK-02',
    'Lab 2 (Software Lab)',
    'Seminar Room 1',
    'Webex Virtual Room',
  ];

  constructor(
    private router: Router,
    private consultationService: ConsultationService,
    private lecturerNotificationService: LecturerNotificationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.consultationService.getLecturerConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        console.log('REAL DASHBOARD CONSULTATIONS:', consultations);

        this.allAppointments = consultations;

        this.pendingRequests = consultations.filter(
          (consultation) => consultation.status === 'PENDING',
        );

        this.stats.pendingRequests = this.pendingRequests.length;

        console.log('PENDING REQUESTS:', this.pendingRequests);
        console.log('PENDING COUNT:', this.stats.pendingRequests);

        this.calculateDashboardStats(consultations);

        this.buildTodaySchedule(consultations);

        this.cdr.detectChanges();

        console.log('TODAY SCHEDULE:', this.todaySchedule);
      },

      error: (error) => {
        console.error('FAILED TO LOAD DASHBOARD CONSULTATIONS:', error);
      },
    });
  }

  calculateDashboardStats(consultations: Consultation[]): void {
    const today = new Date();

    const todayString = today.toISOString().split('T')[0];

    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);

    startOfWeek.setDate(startOfWeek.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    this.stats.todayMeetings = consultations.filter(
      (consultation) =>
        consultation.scheduledDate === todayString && ['CONFIRMED'].includes(consultation.status),
    ).length;

    this.stats.upcomingThisWeek = consultations.filter((consultation) => {
      if (consultation.status !== 'CONFIRMED') {
        return false;
      }

      const consultationDate = new Date(
        `${consultation.scheduledDate}T${consultation.scheduledTime}`,
      );

      return consultationDate >= startOfWeek && consultationDate <= endOfWeek;
    }).length;
  }

  buildTodaySchedule(consultations: Consultation[]): void {
    const today = new Date();

    const todayString = today.toLocaleDateString('en-CA');

    this.todaySchedule = consultations
      .filter(
        (consultation) =>
          consultation.scheduledDate === todayString && consultation.status === 'CONFIRMED',
      )
      .map((consultation) => ({
        time: consultation.scheduledTime,
        type: 'CONSULTATION',
        title: consultation.studentName,
        location: consultation.location || 'Location not assigned',
        status: consultation.status,
      }))
      .sort((a, b) => a.time.localeCompare(b.time));

    this.todayConsultationCount = this.todaySchedule.filter(
      (item) => item.type === 'CONSULTATION',
    ).length;
  }

  openApprovalModal(req: Consultation) {
    this.selectedAppt = req;
    this.actionNotes = '';
    if (req.consultationMode?.includes('Online')) {
      this.approvalRoomNumber = 'Webex Virtual Room';
    } else {
      this.approvalRoomNumber = 'Block A, Room BK-34';
    }
    this.showActionModal = true;
  }

  closeApprovalModal() {
    this.showActionModal = false;
    this.selectedAppt = null;
  }

  selectQuickRoom(room: string) {
    this.approvalRoomNumber = room;
  }

  confirmApprove(): void {
    if (!this.selectedAppt) return;

    if (!this.approvalRoomNumber || !this.approvalRoomNumber.trim()) {
      alert('Please specify a room number or venue for the appointment.');
      return;
    }

    const studentName = this.selectedAppt?.studentName || 'Student';

    // UPDATE THIS: Pass the 3 required arguments (id, location, remarks)
    this.consultationService
      .approveConsultation(
        this.selectedAppt.id,
        this.approvalRoomNumber.trim(),
        this.actionNotes ? this.actionNotes.trim() : '',
      )
      .subscribe({
        next: (response) => {
          console.log('DASHBOARD APPROVE RESPONSE:', response);
          this.lecturerNotificationService.triggerRefresh();
          this.lecturerNotificationService.showToast(
            'Consultation Approved',
            `Consultation with ${studentName} has been approved.`,
            'success'
          );
          alert(`Appointment approved successfully for ${studentName}.`);
          this.closeApprovalModal();
          this.loadDashboardData();
        },
        error: (error) => {
          console.error('DASHBOARD APPROVE FAILED:', error);
          alert(error?.error?.message || 'Failed to approve the appointment.');
        },
      });
  }

  rejectRequest(req: Consultation): void {
    const studentName = req.studentName || 'Student';
    const reason = prompt(
      `Please provide a reason for declining ${studentName}'s request (Required):`,
    );

    if (reason && reason.trim()) {
      this.consultationService.rejectConsultation(req.id, reason.trim()).subscribe({
        next: (response) => {
          console.log('DASHBOARD REJECT RESPONSE:', response);
          this.lecturerNotificationService.triggerRefresh();
          this.lecturerNotificationService.showToast(
            'Consultation Declined',
            `Consultation request from ${studentName} was declined.`,
            'info'
          );
          alert(`Appointment declined. Student notified with reason: "${reason.trim()}"`);

          this.loadDashboardData();
        },

        error: (error) => {
          console.error('DASHBOARD REJECT FAILED:', error);

          alert(error?.error?.message || 'Failed to decline the appointment.');
        },
      });
    } else if (reason !== null) {
      alert('Decline cancelled. Reason is required.');
    }
  }

  formatConsultationMode(modeStr?: string | null): string {
    if (!modeStr) return 'In-Person';
    const clean = modeStr.trim().toUpperCase().replace(/_/g, ' ');
    if (clean.includes('ONLINE') || clean.includes('WEBEX')) {
      return 'Online (Webex)';
    }
    return 'In-Person';
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}

