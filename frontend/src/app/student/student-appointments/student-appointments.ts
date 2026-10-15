import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
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
  activeTab: 'pending' | 'confirmed' | 'history' = 'pending';

  appointments: StudentAppointmentView[] = [];

  selectedAppointment: StudentAppointmentView | null = null;
  modalMode: 'view' | 'cancel' | 'reschedule' | null = null;

  // Tab Filter States
  pendingFilter: string = 'ALL';
  confirmedFilter: string = 'ALL';
  historyFilter: string = 'ALL';

  // Temporary compatibility with existing HTML
  smartSuggestion = '';
  selectedNewSlot = '';
  cancelReason = '';
  rescheduleReason = '';

  // Success Popup Modal State
  showSuccessModal = false;
  successTitle = '';
  successMessage = '';
  successType: 'success' | 'info' | 'warning' = 'success';

  private isInitialLoad = true;

  constructor(
    private router: Router,
    private consultationService: ConsultationService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    console.log('StudentAppointmentsComponent initialized');
    this.loadAppointments();
  }

  showSuccessPopup(title: string, message: string, type: 'success' | 'info' | 'warning' = 'success'): void {
    this.successTitle = title;
    this.successMessage = message;
    this.successType = type;
    this.showSuccessModal = true;
    this.cdr.detectChanges();
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.successTitle = '';
    this.successMessage = '';
    this.cdr.detectChanges();
  }

  setTab(tab: 'pending' | 'confirmed' | 'history'): void {
    this.activeTab = tab;
    this.cdr.detectChanges();
  }

  setPendingFilter(filter: string): void {
    this.pendingFilter = filter;
    this.cdr.detectChanges();
  }

  setConfirmedFilter(filter: string): void {
    this.confirmedFilter = filter;
    this.cdr.detectChanges();
  }

  setHistoryFilter(filter: string): void {
    this.historyFilter = filter;
    this.cdr.detectChanges();
  }

  private loadAppointments(): void {
    this.consultationService.getStudentConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        this.ngZone.run(() => {
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

          // Automatically direct student to Pending if they have pending requests to prevent overlooking
          if (this.isInitialLoad) {
            this.isInitialLoad = false;
            if (this.pendingAppointments.length > 0) {
              this.activeTab = 'pending';
            } else if (this.confirmedAppointments.length > 0) {
              this.activeTab = 'confirmed';
            } else {
              this.activeTab = 'pending';
            }
          }

          this.cdr.detectChanges();
          console.log('Student appointments loaded:', this.appointments);
        });
      },
      error: (error) => {
        console.error('Failed to load student appointments:', error);
        alert('Unable to load your appointments. Please try again.');
      },
    });
  }

  // --- APPOINTMENT CATEGORIES ---

  // 1. Pending Section: Appointments awaiting lecturer review or reschedule proposals awaiting student response
  get pendingAppointments(): StudentAppointmentView[] {
    return this.appointments.filter((a) =>
      ['PENDING', 'RESCHEDULE-PENDING'].includes(a.status),
    );
  }

  // 2. Confirmed & Completed Section: Approved upcoming consultations and completed sessions
  get confirmedAppointments(): StudentAppointmentView[] {
    return this.appointments.filter((a) =>
      ['CONFIRMED', 'UPCOMING', 'COMPLETED'].includes(a.status),
    );
  }

  // 3. History Section: Archived past sessions (completed, cancelled, rejected, no-show)
  get historyAppointments(): StudentAppointmentView[] {
    return this.appointments.filter((a) =>
      ['COMPLETED', 'CANCELLED', 'REJECTED', 'NO-SHOW'].includes(a.status),
    );
  }

  // Compatibility getter
  get upcomingAppointments(): StudentAppointmentView[] {
    return this.appointments.filter((a) =>
      ['PENDING', 'UPCOMING', 'CONFIRMED', 'RESCHEDULE-PENDING'].includes(a.status),
    );
  }

  // --- COUNTS FOR BADGES ---
  get pendingCount(): number {
    return this.appointments.filter((a) => a.status === 'PENDING').length;
  }

  get reschedulePendingCount(): number {
    return this.appointments.filter((a) => a.status === 'RESCHEDULE-PENDING').length;
  }

  get confirmedCount(): number {
    return this.appointments.filter((a) => a.status === 'CONFIRMED' || a.status === 'UPCOMING').length;
  }

  get completedCount(): number {
    return this.appointments.filter((a) => a.status === 'COMPLETED').length;
  }

  get cancelledCount(): number {
    return this.appointments.filter((a) => a.status === 'CANCELLED').length;
  }

  get rejectedCount(): number {
    return this.appointments.filter((a) => a.status === 'REJECTED' || a.status === 'NO-SHOW').length;
  }

  // --- FILTERED LISTS ---
  get filteredPendingAppointments(): StudentAppointmentView[] {
    if (!this.pendingFilter || this.pendingFilter === 'ALL') {
      return this.pendingAppointments;
    }
    return this.pendingAppointments.filter((a) => a.status === this.pendingFilter);
  }

  get filteredConfirmedAppointments(): StudentAppointmentView[] {
    if (!this.confirmedFilter || this.confirmedFilter === 'ALL') {
      return this.confirmedAppointments;
    }
    if (this.confirmedFilter === 'CONFIRMED') {
      return this.confirmedAppointments.filter((a) => a.status === 'CONFIRMED' || a.status === 'UPCOMING');
    }
    return this.confirmedAppointments.filter((a) => a.status === this.confirmedFilter);
  }

  get filteredHistoryAppointments(): StudentAppointmentView[] {
    if (!this.historyFilter || this.historyFilter === 'ALL') {
      return this.historyAppointments;
    }
    return this.historyAppointments.filter((a) => a.status === this.historyFilter);
  }

  openModal(appointment: StudentAppointmentView, mode: 'view' | 'cancel' | 'reschedule'): void {
    this.selectedAppointment = appointment;
    this.modalMode = mode;
    this.selectedNewSlot = '';
    this.cancelReason = '';
    this.rescheduleReason = '';
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.selectedAppointment = null;
    this.modalMode = null;
    this.cdr.detectChanges();
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

    this.consultationService.acceptReschedule(appointment.id).subscribe({
      next: () => {
        this.ngZone.run(() => {
          appointment.status = 'CONFIRMED';
          if (appointment.proposedDate) {
            appointment.date = appointment.proposedDate;
          }
          if (appointment.proposedTime) {
            appointment.time = appointment.proposedTime;
          }

          this.closeModal();

          this.showSuccessPopup(
            'Proposal Accepted!',
            `You have accepted the new schedule proposal with ${appointment.lecturer}. Your appointment status is now CONFIRMED for ${appointment.date} at ${appointment.time}.`,
            'success'
          );

          this.loadAppointments();
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Failed to accept reschedule:', error);
        this.ngZone.run(() => {
          this.cdr.detectChanges();
        });
        alert(error.error?.message || 'Unable to accept the proposed time. Please try again.');
      },
    });
  }

  rejectReschedule(appointment: StudentAppointmentView): void {
    if (appointment.status !== 'RESCHEDULE-PENDING') {
      alert('There is no pending reschedule proposal for this appointment.');
      return;
    }

    this.consultationService.rejectReschedule(appointment.id).subscribe({
      next: () => {
        this.ngZone.run(() => {
          appointment.status = 'CONFIRMED';

          this.closeModal();

          this.showSuccessPopup(
            'Proposal Rejected',
            `You have rejected the proposed reschedule time. Your appointment with ${appointment.lecturer} remains CONFIRMED at the original date and time.`,
            'info'
          );

          this.loadAppointments();
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Failed to reject reschedule:', error);
        this.ngZone.run(() => {
          this.cdr.detectChanges();
        });
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
    const lecturerName = this.selectedAppointment.lecturer;
    const reason = this.cancelReason.trim();

    this.consultationService.cancelConsultation(appointmentId, reason).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.closeModal();

          this.showSuccessPopup(
            'Appointment Cancelled',
            `Your consultation session with ${lecturerName} has been cancelled.`,
            'warning'
          );

          this.loadAppointments();
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Failed to cancel appointment:', error);
        this.ngZone.run(() => {
          this.cdr.detectChanges();
        });
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

export { StudentAppointmentsComponent as StudentAppointments };
