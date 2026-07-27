import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';

@Component({
  selector: 'app-student-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarStudent],
  templateUrl: './student-appointments.html',
})
export class StudentAppointmentsComponent implements OnInit {
  studentName = 'Jason Lee';
  activeTab: 'upcoming' | 'history' = 'upcoming'; // Controls the Left/Right Toggle

  // --- MOCK DATABASE ---
  appointments = [
    // UPCOMING
    {
      id: 'A1',
      type: 'upcoming',
      lecturer: 'Dr. Ahmad Fauzi',
      school: 'School of Computing',
      date: 'May 10, 2026',
      time: '10:00 AM',
      reason: 'FYP Advising',
      status: 'CONFIRMED',
    },
    {
      id: 'A2',
      type: 'upcoming',
      lecturer: 'Prof. Sarah Tan',
      school: 'School of Business',
      date: 'May 12, 2026',
      time: '02:30 PM',
      reason: 'Career Advice',
      status: 'PENDING',
    },
    // HISTORY
    {
      id: 'A3',
      type: 'history',
      lecturer: 'Dr. Ramesh',
      school: 'School of Computing',
      date: 'April 28, 2026',
      time: '09:00 AM',
      reason: 'Exam Review',
      status: 'COMPLETED',
    },
    {
      id: 'A4',
      type: 'history',
      lecturer: 'Mdm. Aisyah',
      school: 'School of Multimedia',
      date: 'April 15, 2026',
      time: '11:00 AM',
      reason: 'Project Discussion',
      status: 'CANCELLED',
    },
  ];

  // --- MODAL STATE ---
  selectedAppointment: any = null;
  modalMode: 'view' | 'cancel' | 'reschedule' | null = null;

  // Smart Suggestion Logic
  smartSuggestion = 'May 14, 2026 @ 10:00 AM';
  selectedNewSlot = '';
  cancelReason = '';
  rescheduleReason = '';

  constructor(private router: Router) { }
  ngOnInit(): void { }

  // --- FUNCTIONS ---
  get upcomingAppointments() {
    return this.appointments.filter((a) => a.type === 'upcoming');
  }

  get historyAppointments() {
    return this.appointments.filter((a) => a.type === 'history');
  }

  // Open Modal Functions
  openModal(appointment: any, mode: 'view' | 'cancel' | 'reschedule') {
    this.selectedAppointment = appointment;
    this.modalMode = mode;
    this.selectedNewSlot = '';
    this.cancelReason = '';
    this.rescheduleReason = ''; // <-- Reset it when modal opens
  }

  confirmReschedule() {
    if (!this.selectedNewSlot) {
      alert('Please select a new time slot.');
      return;
    }
    // <-- ADD THIS VALIDATION BLOCK
    if (!this.rescheduleReason.trim()) {
      alert('Please provide a reason for rescheduling.');
      return;
    }

    // Simulate API Call
    this.selectedAppointment.date = this.selectedNewSlot.split(' @ ')[0];
    this.selectedAppointment.time = this.selectedNewSlot.split(' @ ')[1];
    this.selectedAppointment.status = 'PENDING'; // Resets to pending for lecturer approval
    this.closeModal();
    alert('Reschedule request sent to lecturer!');
  }

  closeModal() {
    this.selectedAppointment = null;
    this.modalMode = null;
  }

  // Actions
  confirmCancel() {
    if (!this.cancelReason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }
    // Simulate API Call
    this.selectedAppointment.status = 'CANCELLED';
    this.selectedAppointment.type = 'history'; // Move to history tab
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
