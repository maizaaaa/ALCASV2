import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { AppointmentService, Appointment } from '../../services/appointment.service';

@Component({
  selector: 'app-lecturer-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarLect],
  templateUrl: './lecturer-appointments.html',
  styleUrls: ['./lecturer-appointments.css'],
})
export class LecturerAppointmentsComponent implements OnInit, OnDestroy {
  activeTab: string = 'PENDING';
  searchQuery: string = '';

  // Modal State for Actions (Approving, Rejecting, Completing, or No-Show)
  showActionModal = false;
  selectedAppt: any = null;
  actionType: 'APPROVE' | 'REJECT' | 'COMPLETE' | 'NO_SHOW' = 'APPROVE';
  actionNotes: string = '';
  approvalRoomNumber: string = 'Block A, Room BK-34';
  quickRooms: string[] = [
    'Block A, Room BK-34',
    'Lecturer Office BK-02',
    'Lab 2 (Software Lab)',
    'Seminar Room 1',
    'Webex Virtual Room'
  ];

  // Student Info Modal State
  showStudentModal = false;
  selectedStudentInfo: any = null;

  studentDatabase: { [key: string]: any } = {
    'Siti Nurhaliza': {
      name: 'Siti Nurhaliza',
      matric: 'S12347',
      program: 'Bachelor of Computer Science (Software Engineering)',
      faculty: 'School of Computing & IT',
      yearSemester: 'Year 3, Semester 2',
      cgpa: '3.85',
      email: 'siti.nurhaliza@student.university.edu',
      phone: '+60 17-890 1234',
      advisor: 'Dr. Ahmad Fauzi (FYP Supervisor)',
      completedSessions: 4,
      attendanceRate: '100%',
      lastTopic: 'Chapter 1 Methodology Review',
    },
    'Muthu Kumar': {
      name: 'Muthu Kumar',
      matric: 'S12348',
      program: 'Bachelor of Information Technology (Cybersecurity)',
      faculty: 'School of Computing & IT',
      yearSemester: 'Year 2, Semester 1',
      cgpa: '3.62',
      email: 'muthu.kumar@student.university.edu',
      phone: '+60 12-987 6543',
      advisor: 'Dr. Ahmad Fauzi',
      completedSessions: 2,
      attendanceRate: '100%',
      lastTopic: 'Pointers & Dynamic Memory Allocation',
    },
    'Nur Amirah': {
      name: 'Nur Amirah',
      matric: 'S12345',
      program: 'Bachelor of Computer Science (Software Engineering)',
      faculty: 'School of Computing & IT',
      yearSemester: 'Year 4, Semester 1',
      cgpa: '3.91',
      email: 'nur.amirah@student.university.edu',
      phone: '+60 13-456 7890',
      advisor: 'Dr. Ahmad Fauzi (FYP Supervisor)',
      completedSessions: 6,
      attendanceRate: '100%',
      lastTopic: 'System Architecture & ER Diagram Review',
    },
    'Jason Lee': {
      name: 'Jason Lee',
      matric: 'S12346',
      program: 'Bachelor of Software Engineering',
      faculty: 'School of Computing & IT',
      yearSemester: 'Year 3, Semester 2',
      cgpa: '3.70',
      email: 'jason.lee@student.university.edu',
      phone: '+60 19-234 5678',
      advisor: 'Dr. Ahmad Fauzi',
      completedSessions: 3,
      attendanceRate: '100%',
      lastTopic: 'Software Engineering Career & Internship Options',
    },
  };

  appointments: Appointment[] = [];
  private apptSub!: Subscription;

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

  getStudentInfo(studentName: string) {
    return (
      this.studentDatabase[studentName] || {
        name: studentName,
        matric: 'S12399',
        program: 'Bachelor of Computer Science (Software Engineering)',
        faculty: 'School of Computing & IT',
        yearSemester: 'Year 3, Semester 1',
        cgpa: '3.75',
        email: `${studentName.toLowerCase().replace(/\s+/g, '.')}@student.university.edu`,
        phone: '+60 12-345 6789',
        advisor: 'Dr. Ahmad Fauzi (FYP Advisor)',
        completedSessions: 3,
        attendanceRate: '100%',
        lastTopic: 'General Academic Consultation',
      }
    );
  }

  openStudentModal(studentName: string) {
    this.selectedStudentInfo = this.getStudentInfo(studentName);
    this.showStudentModal = true;
  }

  closeStudentModal() {
    this.showStudentModal = false;
    this.selectedStudentInfo = null;
  }

  // --- Quick Actions & Helpers ---
  joinMeeting(url?: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Meeting URL: https://university.webex.com/meet/ahmad.fauzi');
    }
  }

  copyMeetingLink(url?: string) {
    const link = url || 'https://university.webex.com/meet/ahmad.fauzi';
    navigator.clipboard.writeText(link);
    alert('Virtual meeting link copied to clipboard!');
  }

  selectQuickRoom(room: string) {
    this.approvalRoomNumber = room;
  }

  get filteredAppointments() {
    return this.appointments.filter((appt) => {
      const matchesTab = appt.status === this.activeTab;
      const searchLower = this.searchQuery.toLowerCase();
      const studentMatric = appt.studentMatric || '';
      const matchesSearch =
        appt.student.toLowerCase().includes(searchLower) ||
        studentMatric.toLowerCase().includes(searchLower);
      return matchesTab && matchesSearch;
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // --- Quick Actions ---
  approveRequest(appt: any) {
    this.openActionModal(appt, 'APPROVE');
  }

  // --- Modal Actions ---
  openActionModal(appt: any, type: 'APPROVE' | 'REJECT' | 'COMPLETE' | 'NO_SHOW') {
    this.selectedAppt = appt;
    this.actionType = type;
    this.actionNotes = '';
    if (type === 'APPROVE') {
      if (appt.mode?.includes('Online')) {
        this.approvalRoomNumber = 'Webex Virtual Room';
      } else if (appt.location && appt.location !== 'To be assigned upon approval') {
        this.approvalRoomNumber = appt.location;
      } else {
        this.approvalRoomNumber = 'Block A, Room BK-34';
      }
    }
    this.showActionModal = true;
  }

  closeActionModal() {
    this.showActionModal = false;
    this.selectedAppt = null;
  }

  submitAction() {
    if (!this.selectedAppt) return;

    if (this.actionType === 'APPROVE') {
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
        `Appointment approved! Room "${this.approvalRoomNumber.trim()}" assigned and live notification updated for ${this.selectedAppt.student}.`
      );
    } else if (this.actionType === 'REJECT') {
      if (!this.actionNotes || !this.actionNotes.trim()) {
        alert('Please provide a reason for declining the request.');
        return;
      }
      this.appointmentService.rejectAppointment(this.selectedAppt.id, this.actionNotes);
      alert(`Request declined. Student notified with reason: "${this.actionNotes}"`);
    } else if (this.actionType === 'COMPLETE') {
      this.appointmentService.completeAppointment(this.selectedAppt.id, this.actionNotes);
      alert('Session marked as completed and saved to Consultation History!');
    } else if (this.actionType === 'NO_SHOW') {
      this.appointmentService.markNoShow(this.selectedAppt.id, this.actionNotes);
      alert(`Recorded as No-Show with notes: "${this.actionNotes || 'None'}"`);
    }

    this.closeActionModal();
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
