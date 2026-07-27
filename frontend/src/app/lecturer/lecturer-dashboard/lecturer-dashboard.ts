import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';

@Component({
  selector: 'app-lecturer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarLect],
  templateUrl: './lecturer-dashboard.html',
  styleUrls: ['./lecturer-dashboard.css'],
})
export class LecturerDashboardComponent implements OnInit {
  // Quick Stats
  stats = {
    todayMeetings: 4,
    pendingRequests: 3,
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
  pendingRequests = [
    {
      id: 'REQ-01',
      student: 'Siti Nurhaliza',
      date: 'Tomorrow',
      time: '10:00 AM',
      reason: 'FYP Chapter 1 Review',
    },
    {
      id: 'REQ-02',
      student: 'Muthu Kumar',
      date: 'Thursday',
      time: '03:00 PM',
      reason: 'Assignment Guidance',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  approveRequest(req: any) {
    alert(
      `Appointment for ${req.student} has been APPROVED. The system will notify them via email.`,
    );
    this.pendingRequests = this.pendingRequests.filter((r) => r.id !== req.id);
    this.stats.pendingRequests--;
  }

  rejectRequest(req: any) {
    const reason = prompt(
      `Please provide a reason for declining ${req.student}'s request (Optional):`,
    );
    if (reason !== null) {
      alert(`Appointment declined. Student will be notified.`);
      this.pendingRequests = this.pendingRequests.filter((r) => r.id !== req.id);
      this.stats.pendingRequests--;
    }
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
