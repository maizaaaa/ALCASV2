import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';
import { ConsultationService, Consultation } from '../../services/consultation.service';

interface StudentAppointmentView {
  id: string;
  lecturerId?: number;
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
  rejectReason?: string;
  cancelReason?: string;
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

  // Reschedule & Cancel Modal States
  smartSuggestion = '';
  selectedNewSlot = '';
  selectedNewDate = '';
  selectedNewTime = '';
  cancelReason = '';
  rescheduleReason = '';
  isSubmittingReschedule = false;
  isLoadingSmartSuggestion = false;
  isLoadingSlots = false;
  minDate = '';
  smartSuggestions: Array<{
    label: string;
    formattedDate: string;
    time: string;
    date: string;
    rawTime: string;
  }> = [];
  availableSlotsForSelectedDate: string[] = [];

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
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
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
            lecturerId: c.lecturerId,
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
            rejectReason: c.rejectReason || '',
            cancelReason: c.cancelReason || '',
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
        if (typeof window !== 'undefined') {
          alert('Unable to load your appointments. Please try again.');
        }
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

  // 2. Confirmed Section: Approved upcoming consultations
  get confirmedAppointments(): StudentAppointmentView[] {
    return this.appointments.filter((a) =>
      ['CONFIRMED', 'UPCOMING'].includes(a.status),
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
    return this.appointments.filter((a) => a.status === 'REJECTED').length;
  }

  get noShowCount(): number {
    return this.appointments.filter((a) => a.status === 'NO-SHOW').length;
  }

  getHistoryReason(appt: StudentAppointmentView): string {
    if (appt.status === 'REJECTED' || appt.rejectReason) {
      return appt.rejectReason?.trim() || appt.remarks?.trim() || 'No rejection reason specified by lecturer.';
    }
    if (appt.status === 'CANCELLED' || appt.cancelReason) {
      return appt.cancelReason?.trim() || appt.remarks?.trim() || 'No cancellation reason provided.';
    }
    if (appt.status === 'NO-SHOW') {
      return appt.remarks?.trim() || 'Student was marked as absent / no-show for this consultation session.';
    }
    return '';
  }

  getHistoryReasonLabel(appt: StudentAppointmentView): string {
    if (appt.status === 'REJECTED' || appt.rejectReason) {
      return 'Reason for Rejection';
    }
    if (appt.status === 'CANCELLED' || appt.cancelReason) {
      return 'Cancellation Reason';
    }
    if (appt.status === 'NO-SHOW') {
      return 'No-Show Reason / Remarks';
    }
    return 'Reason';
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
    this.selectedNewDate = '';
    this.selectedNewTime = '';
    this.cancelReason = '';
    this.rescheduleReason = '';
    this.availableSlotsForSelectedDate = [];
    this.smartSuggestions = [];

    if (mode === 'reschedule' && appointment.status !== 'RESCHEDULE-PENDING') {
      this.loadSmartSuggestions(appointment);
    }
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.selectedAppointment = null;
    this.modalMode = null;
    this.selectedNewSlot = '';
    this.selectedNewDate = '';
    this.selectedNewTime = '';
    this.cancelReason = '';
    this.rescheduleReason = '';
    this.availableSlotsForSelectedDate = [];
    this.smartSuggestions = [];
    this.isSubmittingReschedule = false;
    this.cdr.detectChanges();
  }

  setQuickReason(reason: string): void {
    this.rescheduleReason = reason;
    this.cdr.detectChanges();
  }

  selectSmartSuggestion(sug: any): void {
    if (!sug) return;
    this.selectedNewSlot = sug.label;
    this.selectedNewDate = sug.date;
    this.selectedNewTime = sug.rawTime || sug.time;

    // Also populate manual slot picker so student sees the selected date & slot highlighted
    if (this.selectedAppointment?.lecturerId && sug.date) {
      this.consultationService.getLecturerAvailability(this.selectedAppointment.lecturerId, sug.date).subscribe({
        next: (res) => {
          this.ngZone.run(() => {
            this.availableSlotsForSelectedDate = res.availableSlots || [];
            this.cdr.detectChanges();
          });
        },
      });
    }

    this.cdr.detectChanges();
  }

  selectManualSlot(slot: string): void {
    this.selectedNewTime = slot;
    if (this.selectedNewDate) {
      this.selectedNewSlot = `${this.formatDate(this.selectedNewDate)} at ${slot}`;
    } else {
      this.selectedNewSlot = slot;
    }
    this.cdr.detectChanges();
  }

  onDateChange(selectedDate: string): void {
    this.selectedNewDate = selectedDate;
    this.selectedNewTime = '';
    this.selectedNewSlot = '';
    this.availableSlotsForSelectedDate = [];

    if (!selectedDate || !this.selectedAppointment?.lecturerId) {
      this.cdr.detectChanges();
      return;
    }

    this.isLoadingSlots = true;
    this.consultationService.getLecturerAvailability(this.selectedAppointment.lecturerId, selectedDate).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.isLoadingSlots = false;
          this.availableSlotsForSelectedDate = res.availableSlots || [];
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Failed to load slots for date:', err);
        this.ngZone.run(() => {
          this.isLoadingSlots = false;
          this.availableSlotsForSelectedDate = [];
          this.cdr.detectChanges();
        });
      },
    });
  }

  private loadSmartSuggestions(appointment: StudentAppointmentView): void {
    if (!appointment.lecturerId) {
      this.smartSuggestions = [];
      return;
    }

    this.isLoadingSmartSuggestion = true;
    this.smartSuggestions = [];

    const lecturerId = Number(appointment.lecturerId);

    // 1. Fetch the lecturer's recurring consultation timetable to determine available days
    this.consultationService.getLecturerSchedules(lecturerId).subscribe({
      next: (schedules) => {
        // Collect days where lecturer has AVAILABLE slots
        const availableDayNames = (schedules || [])
          .filter((s) => (s.slotType || '').toUpperCase() === 'AVAILABLE')
          .map((s) => (s.dayOfWeek || '').toUpperCase());

        // Prepare candidate dates across the next 14 calendar days
        const candidateDates: string[] = [];
        const base = new Date();
        for (let i = 1; i <= 14; i++) {
          const d = new Date();
          d.setDate(base.getDate() + i);
          const dayName = d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
          if (availableDayNames.length > 0) {
            if (availableDayNames.includes(dayName)) {
              candidateDates.push(d.toISOString().split('T')[0]);
            }
          } else {
            // If no specific AVAILABLE slotType records, check weekdays
            if (d.getDay() !== 0 && d.getDay() !== 6) {
              candidateDates.push(d.toISOString().split('T')[0]);
            }
          }
        }

        if (candidateDates.length === 0) {
          for (let i = 1; i <= 7; i++) {
            const d = new Date();
            d.setDate(base.getDate() + i);
            if (d.getDay() !== 0 && d.getDay() !== 6) {
              candidateDates.push(d.toISOString().split('T')[0]);
            }
          }
        }

        this.scanCandidateDatesForSuggestions(lecturerId, candidateDates, 0, []);
      },
      error: () => {
        // Fallback: scan next 7 weekdays
        const candidateDates: string[] = [];
        const base = new Date();
        for (let i = 1; i <= 7; i++) {
          const d = new Date();
          d.setDate(base.getDate() + i);
          if (d.getDay() !== 0 && d.getDay() !== 6) {
            candidateDates.push(d.toISOString().split('T')[0]);
          }
        }
        this.scanCandidateDatesForSuggestions(lecturerId, candidateDates, 0, []);
      },
    });
  }

  private scanCandidateDatesForSuggestions(
    lecturerId: number,
    dates: string[],
    index: number,
    collected: Array<{ label: string; formattedDate: string; time: string; date: string; rawTime: string }>
  ): void {
    // Collect up to 2 distinct slot suggestions
    if (index >= dates.length || collected.length >= 2) {
      this.ngZone.run(() => {
        this.isLoadingSmartSuggestion = false;
        this.smartSuggestions = collected;
        this.cdr.detectChanges();
      });
      return;
    }

    const checkDate = dates[index];
    this.consultationService.getLecturerAvailability(lecturerId, checkDate).subscribe({
      next: (res) => {
        if (res?.availableSlots && res.availableSlots.length > 0) {
          const formatted = this.formatDate(checkDate);
          // Pick up to 2 slots from this date
          for (let i = 0; i < res.availableSlots.length && collected.length < 2; i++) {
            const slot = res.availableSlots[i];
            collected.push({
              label: `${formatted} at ${slot}`,
              formattedDate: formatted,
              time: slot,
              date: checkDate,
              rawTime: slot,
            });
          }
        }

        if (collected.length >= 2) {
          this.ngZone.run(() => {
            this.isLoadingSmartSuggestion = false;
            this.smartSuggestions = collected;
            this.cdr.detectChanges();
          });
        } else {
          this.scanCandidateDatesForSuggestions(lecturerId, dates, index + 1, collected);
        }
      },
      error: () => {
        this.scanCandidateDatesForSuggestions(lecturerId, dates, index + 1, collected);
      },
    });
  }

  confirmReschedule(): void {
    if (!this.selectedAppointment) return;

    if (!this.selectedNewDate || !this.selectedNewTime || !this.rescheduleReason.trim()) {
      alert('Please select a preferred date, time slot, and reason for rescheduling.');
      return;
    }

    this.isSubmittingReschedule = true;
    const appointmentId = this.selectedAppointment.id;
    const proposedDate = this.selectedNewDate;
    const proposedTime = this.selectedNewTime;
    const reason = this.rescheduleReason.trim();

    this.consultationService.requestReschedule(appointmentId, proposedDate, proposedTime, reason).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.isSubmittingReschedule = false;
          this.closeModal();
          this.showSuccessPopup(
            'Reschedule Request Sent',
            'Your reschedule request has been submitted to your lecturer for review.',
            'success',
          );
          this.loadAppointments();
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Failed to submit reschedule request:', error);
        this.ngZone.run(() => {
          this.isSubmittingReschedule = false;
          this.cdr.detectChanges();
        });
        alert(error.error?.message || 'Unable to submit reschedule request. Please try again.');
      },
    });
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
