import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { AppointmentService, Appointment } from '../../services/appointment.service';
import { ConsultationService } from '../../services/consultation.service';
import { AttendanceService } from '../../services/attendance.service';

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
  actionType: 'APPROVE' | 'REJECT' | 'RESCHEDULE' | 'COMPLETE' | 'NO_SHOW' = 'APPROVE';
  actionNotes: string = '';
  proposedDate: string = '';
  proposedTime: string = '';
  approvalRoomNumber: string = 'Block A, Room BK-34';
  quickRooms: string[] = [
    'Block A, Room BK-34',
    'Lecturer Office BK-02',
    'Lab 2 (Software Lab)',
    'Seminar Room 1',
    'Webex Virtual Room',
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
    private appointmentService: AppointmentService,
    private consultationService: ConsultationService,
    private attendanceService: AttendanceService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Just call the load method here instead of duplicating the API call
    this.loadLecturerConsultations();
  }

  loadLecturerConsultations(): void {
    this.consultationService.getLecturerConsultations().subscribe({
      next: (consultations) => {
        console.log('REAL LECTURER CONSULTATIONS:', consultations);

        this.appointments = consultations.map((consultation) => {
          const rawStatus = (consultation.status || '').trim().toUpperCase();

          let mappedStatus = 'PENDING';
          if (rawStatus === 'CONFIRMED' || rawStatus === 'UPCOMING') {
            mappedStatus = 'UPCOMING';
          } else if (rawStatus === 'PENDING') {
            mappedStatus = 'PENDING';
          } else {
            mappedStatus = rawStatus; // handles COMPLETED, NO-SHOW, REJECTED, etc.
          }

          return {
            id: consultation.id,
            student: consultation.studentName,
            // Safely handle both matric fields just in case
            studentMatric: consultation.studentMatric?.toString() || '',
            lecturer: consultation.lecturerName,
            school: '',
            type: consultation.reason,
            date: consultation.scheduledDate,
            time: consultation.scheduledTime,
            mode: consultation.consultationMode,
            location: consultation.location || 'To be assigned upon approval',
            reason: consultation.reason || '',
            reasonDetails: consultation.reasonDetails || '',
            remarks: consultation.lecturerRemarks || '',
            status: mappedStatus as any,
          };
        });

        this.appointments.sort((a, b) => {
          const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
          const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();

          return dateTimeA - dateTimeB;
        });

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('FAILED TO LOAD LECTURER CONSULTATIONS:', error);
      },
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
      // Safely compare statuses case-insensitively
      const apptStatus = (appt.status || '').trim().toUpperCase();
      const currentTab = (this.activeTab || '').trim().toUpperCase();

      const matchesTab = apptStatus === currentTab;

      const searchLower = (this.searchQuery || '').toLowerCase();
      // Safely handle student matric and name
      const studentMatric = (appt.studentMatric || '').toLowerCase();
      const studentName = (appt.student || '').toLowerCase();

      const matchesSearch =
        studentName.includes(searchLower) || studentMatric.includes(searchLower);

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

  requestReschedule(appt: any) {
    this.openActionModal(appt, 'RESCHEDULE');
  }

  // --- Modal Actions ---
  openActionModal(appt: any, type: 'APPROVE' | 'REJECT' | 'RESCHEDULE' | 'COMPLETE' | 'NO_SHOW') {
    this.selectedAppt = appt;
    this.actionType = type;
    this.actionNotes = '';
    this.proposedDate = '';
    this.proposedTime = '';
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

      this.consultationService.approveConsultation(
        this.selectedAppt.id,
        this.approvalRoomNumber.trim(),
        this.actionNotes.trim()
      ).subscribe({
        next: (response) => {
          console.log('APPROVE RESPONSE:', response);
          alert(`Appointment approved successfully for ${this.selectedAppt.student}.`);
          this.closeActionModal();
          this.loadLecturerConsultations();
        },
        error: (error) => {
          console.error('APPROVE FAILED:', error);
          alert(error?.error?.message || 'Failed to approve the appointment.');
        },
      });
    } else if (this.actionType === 'REJECT') {
      if (!this.actionNotes || !this.actionNotes.trim()) {
        alert('Please provide a reason for declining the request.');
        return;
      }

      this.consultationService
        .rejectConsultation(this.selectedAppt.id, this.actionNotes.trim())
        .subscribe({
          next: (response) => {
            console.log('REJECT RESPONSE:', response);

            alert(`Request declined successfully for ${this.selectedAppt.student}.`);

            this.closeActionModal();

            // Reload the consultation list
            this.loadLecturerConsultations();
          },

          error: (error) => {
            console.error('REJECT FAILED:', error);

            alert(error?.error?.message || 'Failed to decline the request.');
          },
        });
    } else if (this.actionType === 'RESCHEDULE') {
      if (!this.proposedDate) {
        alert('Please select a proposed date.');
        return;
      }

      if (!this.proposedTime) {
        alert('Please select a proposed time.');
        return;
      }

      if (!this.actionNotes || !this.actionNotes.trim()) {
        alert('Please provide a reason for rescheduling.');
        return;
      }

      this.consultationService
        .requestReschedule(
          this.selectedAppt.id,
          this.proposedDate,
          this.proposedTime,
          this.actionNotes.trim(),
        )
        .subscribe({
          next: (response) => {
            console.log('RESCHEDULE RESPONSE:', response);

            alert(`Reschedule request sent successfully for ${this.selectedAppt.student}.`);

            this.closeActionModal();
            this.loadLecturerConsultations();
          },

          error: (error) => {
            console.error('RESCHEDULE FAILED:', error);

            alert(error?.error?.message || 'Failed to request reschedule.');
          },
        });
    } else if (this.actionType === 'COMPLETE') {
      this.attendanceService
        .markAttendance(this.selectedAppt.id, 'PRESENT', this.actionNotes || '')
        .subscribe({
          next: (response) => {
            console.log('COMPLETE SESSION RESPONSE:', response);
            alert(`Session with ${this.selectedAppt.student} marked as completed successfully.`);
            this.closeActionModal();
            this.loadLecturerConsultations();
          },
          error: (error) => {
            console.error('COMPLETE SESSION FAILED:', error);
            alert(error?.error?.message || 'Failed to mark the session as completed.');
          },
        });
    } else if (this.actionType === 'NO_SHOW') {
      this.attendanceService
        .markAttendance(this.selectedAppt.id, 'NO_SHOW', this.actionNotes || '')
        .subscribe({
          next: (response) => {
            console.log('NO-SHOW SESSION RESPONSE:', response);

            alert(`Session with ${this.selectedAppt.student} marked as no-show successfully.`);

            this.closeActionModal();
            this.loadLecturerConsultations();
          },
          error: (error) => {
            console.error('NO-SHOW SESSION FAILED:', error);

            alert(error?.error?.message || 'Failed to mark the session as no-show.');
          },
        });
    }
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
