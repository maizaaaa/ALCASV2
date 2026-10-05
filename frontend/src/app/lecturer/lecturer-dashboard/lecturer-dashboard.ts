import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { ConsultationService, Consultation} from '../../services/consultation.service';

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
    todayMeetings: 4,
    pendingRequests: 0,
    upcomingThisWeek: 12,
  };

  // Today's Schedule (Mix of classes and consultations)
  todaySchedule = [
    {
      time: '09:00 AM',
      type: 'CLASS',
      title: 'Software Engineering (Lecture)',
      location: 'DKG 1/1',
    },
    {
      time: '11:00 AM',
      type: 'CONSULTATION',
      title: 'Nur Amirah',
      location: 'Office BK-34',
      status: 'UPCOMING',
    },
    { time: '01:00 PM', type: 'BUSY', title: 'Lunch / Rest', location: '-' },
    {
      time: '02:30 PM',
      type: 'CONSULTATION',
      title: 'Jason Lee',
      location: 'Webex',
      status: 'UPCOMING',
    },
  ];

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
      },

      error: (error) => {
        console.error('FAILED TO LOAD DASHBOARD CONSULTATIONS:', error);
      },
    });
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

    this.consultationService.approveConsultation(this.selectedAppt.id).subscribe({
      next: (response) => {
        console.log('DASHBOARD APPROVE RESPONSE:', response);

        alert(`Appointment approved successfully for ${this.selectedAppt?.studentName}.`);

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
    const reason = prompt(
      `Please provide a reason for declining ${req.studentName}'s request (Required):`,
    );

    if (reason && reason.trim()) {
      this.consultationService.rejectConsultation(req.id, reason.trim()).subscribe({
        next: (response) => {
          console.log('DASHBOARD REJECT RESPONSE:', response);

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

  onLogout() {
    this.router.navigate(['/login']);
  }
}
