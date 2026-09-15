import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';
import { AppointmentService, Appointment } from '../../services/appointment.service';

@Component({
  selector: 'app-student-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarStudent],
  templateUrl: './student-appointments.html',
  styleUrls: ['./student-appointments.css'],
})
export class StudentAppointmentsComponent implements OnInit, OnDestroy {
  studentName = 'Siti Nurhaliza';
  activeTab: 'upcoming' | 'history' = 'upcoming'; // Controls the Left/Right Toggle

  appointments: Appointment[] = [];
  private apptSub!: Subscription;

  // --- MODAL STATE ---
  selectedAppointment: Appointment | null = null;
  modalMode: 'view' | 'cancel' | 'reschedule' | null = null;

  // Smart Suggestion Logic
  smartSuggestion = '2026-05-14 @ 10:00 AM';
  selectedNewSlot = '';
  cancelReason = '';
  rescheduleReason = '';

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.apptSub = this.appointmentService.appointments$.subscribe((data) => {
      this.appointments = data;
    });
  }

  ngOnDestroy(): void {
    if (this.apptSub) {
      this.apptSub.unsubscribe();
    }
  }

  // --- FUNCTIONS ---
  get upcomingAppointments(): Appointment[] {
    return this.appointments.filter(
      (a) => a.status === 'PENDING' || a.status === 'UPCOMING' || a.status === 'CONFIRMED'
    );
  }

  get historyAppointments(): Appointment[] {
    return this.appointments.filter(
      (a) => a.status === 'COMPLETED' || a.status === 'CANCELLED' || a.status === 'REJECTED' || a.status === 'NO-SHOW'
    );
  }

  // Open Modal Functions
  openModal(appointment: Appointment, mode: 'view' | 'cancel' | 'reschedule') {
    this.selectedAppointment = appointment;
    this.modalMode = mode;
    this.selectedNewSlot = '';
    this.cancelReason = '';
    this.rescheduleReason = '';
  }

  confirmReschedule() {
    if (!this.selectedAppointment) return;
    if (!this.selectedNewSlot) {
      alert('Please select a new time slot.');
      return;
    }
    if (!this.rescheduleReason.trim()) {
      alert('Please provide a reason for rescheduling.');
      return;
    }

    const parts = this.selectedNewSlot.split(' @ ');
    const newDate = parts[0];
    const newTime = parts[1] || '10:00 AM';

    this.appointmentService.rescheduleAppointment(
      this.selectedAppointment.id,
      newDate,
      newTime,
      this.rescheduleReason.trim()
    );

    this.closeModal();
    alert('Reschedule request sent to lecturer! Venue will be assigned upon approval.');
  }

  closeModal() {
    this.selectedAppointment = null;
    this.modalMode = null;
  }

  // Actions
  confirmCancel() {
    if (!this.selectedAppointment) return;
    if (!this.cancelReason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }

    this.appointmentService.cancelAppointment(
      this.selectedAppointment.id,
      this.cancelReason.trim()
    );

    this.closeModal();
    alert('Appointment successfully cancelled.');
  }

  selectSmartSuggestion() {
    this.selectedNewSlot = this.smartSuggestion;
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
