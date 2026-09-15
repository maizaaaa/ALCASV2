import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { AppointmentService, Appointment } from '../../services/appointment.service';

@Component({
  selector: 'app-lecturer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SidebarLect],
  templateUrl: './lecturer-dashboard.html',
  styleUrls: ['./lecturer-dashboard.css'],
})
export class LecturerDashboardComponent implements OnInit, OnDestroy {
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
  allAppointments: Appointment[] = [];
  pendingRequests: Appointment[] = [];
  private apptSub!: Subscription;

  // Modal State for Dashboard Approval
  showActionModal = false;
  selectedAppt: Appointment | null = null;
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
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.apptSub = this.appointmentService.appointments$.subscribe((appts) => {
      this.allAppointments = appts;
      this.pendingRequests = appts.filter((a) => a.status === 'PENDING');
      this.stats.pendingRequests = this.pendingRequests.length;
    });
  }

  ngOnDestroy(): void {
    if (this.apptSub) {
      this.apptSub.unsubscribe();
    }
  }

  openApprovalModal(req: Appointment) {
    this.selectedAppt = req;
    this.actionNotes = '';
    if (req.mode?.includes('Online')) {
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

  confirmApprove() {
    if (!this.selectedAppt) return;
    if (!this.approvalRoomNumber || !this.approvalRoomNumber.trim()) {
      alert('Please specify a room number or venue for the appointment.');
      return;
    }

    this.appointmentService.approveAppointment(
      this.selectedAppt.id,
      this.approvalRoomNumber,
      this.actionNotes
    );

    alert(
      `Appointment approved! Room "${this.approvalRoomNumber.trim()}" assigned and live notification sent to ${this.selectedAppt.student}.`
    );

    this.closeApprovalModal();
  }

  rejectRequest(req: Appointment) {
    const reason = prompt(
      `Please provide a reason for declining ${req.student}'s request (Required):`
    );
    if (reason && reason.trim()) {
      this.appointmentService.rejectAppointment(req.id, reason.trim());
      alert(`Appointment declined. Student notified with reason: "${reason.trim()}"`);
    } else if (reason !== null) {
      alert('Decline cancelled. Reason is required.');
    }
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
