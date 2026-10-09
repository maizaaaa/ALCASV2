import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';
import { ConsultationService, Consultation } from '../../services/consultation.service';

interface StudentAppointmentView {
  id: string;
  lecturer: string;
  reason: string;
  date: string;
  time: string;
  location: string;
  remarks: string;
  status: string;
  proposedDate: string;
  proposedTime: string;
  rescheduleReason: string;
}

@Component({
  selector: 'app-student-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarStudent],
  templateUrl: './student-appointments.html',
  styleUrls: ['./student-appointments.css'],
})
export class StudentAppointmentsComponent implements OnInit {
  activeTab: 'upcoming' | 'history' = 'upcoming';

  appointments: StudentAppointmentView[] = [];

  selectedAppointment: StudentAppointmentView | null = null;
  modalMode: 'view' | 'cancel' | 'reschedule' | null = null;

  // Temporary compatibility with your existing HTML.
  // We will remove the student rescheduling UI in the next step.
  smartSuggestion = '';
  selectedNewSlot = '';
  cancelReason = '';
  rescheduleReason = '';

  constructor(
    private router: Router,
    private consultationService: ConsultationService,
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  private loadAppointments(): void {
    this.consultationService.getStudentConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        this.appointments = consultations.map((c) => ({
          id: c.id,
          lecturer: c.lecturerName || 'Lecturer',
          reason: c.reasonDetails || c.reason || 'Consultation',
          date: this.formatDate(c.scheduledDate),
          time: this.formatTime(c.scheduledTime),
          location: c.location || '',
          remarks: c.lecturerRemarks || '',
          status: (c.status || '').toUpperCase().replace(/_/g, '-'),
          proposedDate: c.proposedDate ? this.formatDate(c.proposedDate) : '',
          proposedTime: c.proposedTime ? this.formatTime(c.proposedTime) : '',
          rescheduleReason: c.rescheduleReason || '',
        }));

        console.log('Student appointments loaded:', this.appointments);
      },
      error: (error) => {
        console.error('Failed to load student appointments:', error);
        alert('Unable to load your appointments. Please try again.');
      },
    });
  }

  get upcomingAppointments(): StudentAppointmentView[] {
    return this.appointments.filter((a) =>
      ['PENDING', 'UPCOMING', 'CONFIRMED', 'RESCHEDULE-PENDING'].includes(a.status),
    );
  }

  get historyAppointments(): StudentAppointmentView[] {
    return this.appointments.filter((a) =>
      ['COMPLETED', 'CANCELLED', 'REJECTED', 'NO-SHOW'].includes(a.status),
    );
  }

  openModal(appointment: StudentAppointmentView, mode: 'view' | 'cancel' | 'reschedule'): void {
    this.selectedAppointment = appointment;
    this.modalMode = mode;
    this.selectedNewSlot = '';
    this.cancelReason = '';
    this.rescheduleReason = '';
  }

  closeModal(): void {
    this.selectedAppointment = null;
    this.modalMode = null;
  }

  // Student rescheduling is disabled:
  // only the lecturer can propose a new date and time.
  confirmReschedule(): void {
    alert(
      'Rescheduling must be initiated by your lecturer. ' +
        'You can accept or reject the lecturer’s proposal when it appears here.',
    );
    this.closeModal();
  }

  acceptReschedule(appointment: StudentAppointmentView): void {
    if (appointment.status !== 'RESCHEDULE-PENDING') {
      alert('There is no pending reschedule proposal for this appointment.');
      return;
    }

    const accepted = confirm(
      `Accept the proposed appointment?\n\n` +
        `New date: ${appointment.proposedDate}\n` +
        `New time: ${appointment.proposedTime}`,
    );

    if (!accepted) return;

    this.consultationService.acceptReschedule(appointment.id).subscribe({
      next: () => {
        this.closeModal();
        this.loadAppointments();
        alert('Reschedule accepted! Your appointment has been updated.');
      },
      error: (error) => {
        console.error('Failed to accept reschedule:', error);
        alert(error.error?.message || 'Unable to accept the proposed time. Please try again.');
      },
    });
  }

  rejectReschedule(appointment: StudentAppointmentView): void {
    if (appointment.status !== 'RESCHEDULE-PENDING') {
      alert('There is no pending reschedule proposal for this appointment.');
      return;
    }

    const rejected = confirm(
      `Reject the lecturer's proposed appointment time?\n\n` +
        `Your original appointment date and time will remain unchanged.`,
    );

    if (!rejected) return;

    this.consultationService.rejectReschedule(appointment.id).subscribe({
      next: () => {
        this.closeModal();
        this.loadAppointments();
        alert('Proposal rejected. Your original appointment remains confirmed.');
      },
      error: (error) => {
        console.error('Failed to reject reschedule:', error);
        alert(error.error?.message || 'Unable to reject the proposed time. Please try again.');
      },
    });
  }

  confirmCancel(): void {
    if (!this.selectedAppointment) return;

    if (!this.cancelReason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }

    const appointmentId = this.selectedAppointment.id;
    const reason = this.cancelReason.trim();

    this.consultationService.cancelConsultation(appointmentId, reason).subscribe({
      next: () => {
        this.closeModal();
        this.loadAppointments();
        alert('Appointment successfully cancelled.');
      },
      error: (error) => {
        console.error('Failed to cancel appointment:', error);
        alert(error.error?.message || 'Unable to cancel this appointment. Please try again.');
      },
    });
  }

  selectSmartSuggestion(): void {
    // Student-initiated rescheduling is disabled.
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  private formatTime(timeString: string): string {
    if (!timeString) return '';

    const parts = timeString.split(':');
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
}
