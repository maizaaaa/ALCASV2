import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarStudent],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css'],
})
export class StudentDashboardComponent implements OnInit {
  studentName = 'Jason Lee';
  currentWeek = 'May 8 - May 12, 2026';

  // Define the days for our weekly calendar
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Mock Student Appointments
  myAppointments = [
    {
      id: 1,
      day: 'Monday',
      time: '10:00 AM - 11:00 AM',
      lecturer: 'Dr. Ahmad Fauzi',
      type: 'FYP Advising',
      status: 'CONFIRMED',
    },
    {
      id: 2,
      day: 'Wednesday',
      time: '02:00 PM - 03:00 PM',
      lecturer: 'Prof. Sarah Tan',
      type: 'Career Advice',
      status: 'PENDING',
    },
    {
      id: 3,
      day: 'Friday',
      time: '09:00 AM - 10:00 AM',
      lecturer: 'Dr. Ramesh',
      type: 'Exam Review',
      status: 'CONFIRMED',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  // Helper to grab appointments for a specific day column
  getAppointmentsForDay(day: string) {
    return this.myAppointments.filter((appt) => appt.day === day);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
