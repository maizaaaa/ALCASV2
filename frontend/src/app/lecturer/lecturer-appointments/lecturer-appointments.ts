import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';

@Component({
  selector: 'app-lecturer-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarLect],
  templateUrl: './lecturer-appointments.html',
  styleUrls: ['./lecturer-appointments.css'],
})
export class LecturerAppointmentsComponent implements OnInit {
  activeTab: string = 'PENDING';
  searchQuery: string = '';

  // Modal State for Actions (Rejecting, Completing, or No-Show)
  showActionModal = false;
  selectedAppt: any = null;
  actionType: 'REJECT' | 'COMPLETE' | 'NO_SHOW' = 'REJECT';
  actionNotes: string = '';

  // Student Profile Quick View Modal State
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

  getStudentInfo(studentName: string) {
    return this.studentDatabase[studentName] || {
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
    };
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

  // Mock Database
  appointments = [
    {
      id: 'REQ-01',
      student: 'Siti Nurhaliza',
      matric: 'S12347',
      date: '2024-05-10',
      time: '10:00 AM',
      type: 'FYP Advising',
      mode: 'In-Person',
      location: 'Block A, Room BK-34',
      reason: 'I need you to check my Chapter 1 methodology before submission.',
      status: 'PENDING',
    },
    {
      id: 'REQ-02',
      student: 'Muthu Kumar',
      matric: 'S12348',
      date: '2024-05-12',
      time: '03:00 PM',
      type: 'General Consultation',
      mode: 'Online (Webex)',
      location: 'Webex Virtual Room',
      meetingUrl: 'https://university.webex.com/meet/ahmad.fauzi',
      reason: "I am struggling to understand the pointers concept from yesterday's lecture.",
      status: 'PENDING',
    },
    {
      id: 'APT-99',
      student: 'Nur Amirah',
      matric: 'S12345',
      date: '2024-05-08',
      time: '09:00 AM',
      type: 'FYP Advising',
      mode: 'In-Person',
      location: 'Block A, Room BK-34',
      reason: 'System architecture review and Chapter 2 ER Diagram inspection.',
      status: 'UPCOMING',
    },
    {
      id: 'APT-100',
      student: 'Jason Lee',
      matric: 'S12346',
      date: '2024-05-08',
      time: '02:30 PM',
      type: 'General Consultation',
      mode: 'Online (Webex)',
      location: 'Webex Virtual Room',
      meetingUrl: 'https://university.webex.com/meet/ahmad.fauzi',
      reason: 'Career advice regarding software engineering internships and course path.',
      status: 'UPCOMING',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  get filteredAppointments() {
    return this.appointments.filter((appt) => {
      const matchesTab = appt.status === this.activeTab;
      const searchLower = this.searchQuery.toLowerCase();
      const matchesSearch =
        appt.student.toLowerCase().includes(searchLower) ||
        appt.matric.toLowerCase().includes(searchLower);
      return matchesTab && matchesSearch;
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // --- Quick Actions ---
  approveRequest(appt: any) {
    if (confirm(`Approve appointment for ${appt.student}?`)) {
      appt.status = 'UPCOMING';
      alert('Appointment approved! An email confirmation has been sent to the student.');
    }
  }

  // --- Modal Actions (Require text input) ---
  openActionModal(appt: any, type: 'REJECT' | 'COMPLETE' | 'NO_SHOW') {
    this.selectedAppt = appt;
    this.actionType = type;
    this.actionNotes = '';
    this.showActionModal = true;
  }

  closeActionModal() {
    this.showActionModal = false;
    this.selectedAppt = null;
  }

  submitAction() {
    if (this.actionType === 'REJECT') {
      if (!this.actionNotes) {
        alert('Please provide a reason for declining the request.');
        return;
      }
      this.selectedAppt.status = 'REJECTED';
      alert(`Request declined. Student notified with reason: "${this.actionNotes}"`);
    } else if (this.actionType === 'COMPLETE') {
      this.selectedAppt.status = 'COMPLETED';
      alert('Session marked as completed and saved to History!');
    } else if (this.actionType === 'NO_SHOW') {
      this.selectedAppt.status = 'NO-SHOW';
      alert(`Recorded as No-Show with notes: "${this.actionNotes || 'None'}"`);
    }

    this.closeActionModal();
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
