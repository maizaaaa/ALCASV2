import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-attendance-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './attendance-tracking.html',
  styleUrls: ['./attendance-tracking.css'],
})
export class AttendanceTrackingComponent implements OnInit {
  // 1. Quick Stats
  stats = {
    attendanceRate: '92%',
    totalNoShows: 24,
    warningsIssued: 5,
  };

  filterStatus: string = 'ALL';
  searchQuery: string = '';

  // 2. Just Mock Database for Attendance
  attendanceRecords = [
    {
      id: 'AT-101',
      student: 'Nur Amirah',
      matric: 'S12345',
      lecturer: 'Dr. Ahmad Fauzi',
      date: '25 Oct 2023',
      status: 'PRESENT',
      notes: '-',
    },
    {
      id: 'AT-102',
      student: 'Siti Nurhaliza',
      matric: 'S12346',
      lecturer: 'Prof. Sarah Tan',
      date: '25 Oct 2023',
      status: 'NO-SHOW',
      notes: 'Second missed session',
    },
    {
      id: 'AT-103',
      student: 'Jason Lee',
      matric: 'S12347',
      lecturer: 'Dr. Ramesh',
      date: '24 Oct 2023',
      status: 'PRESENT',
      notes: '-',
    },
    {
      id: 'AT-104',
      student: 'Muthu Kumar',
      matric: 'S12348',
      lecturer: 'Dr. Ahmad Fauzi',
      date: '23 Oct 2023',
      status: 'EXCUSED',
      notes: 'Medical certificate provided',
    },
    {
      id: 'AT-105',
      student: 'Aiman Hakim',
      matric: 'S12349',
      lecturer: 'Prof. David',
      date: '22 Oct 2023',
      status: 'NO-SHOW',
      notes: 'No contact',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  get filteredRecords() {
    return this.attendanceRecords.filter((record) => {
      const matchesStatus = this.filterStatus === 'ALL' || record.status === this.filterStatus;
      const searchLower = this.searchQuery.toLowerCase();
      const matchesSearch =
        record.student.toLowerCase().includes(searchLower) ||
        record.matric.toLowerCase().includes(searchLower);
      return matchesStatus && matchesSearch;
    });
  }

  // Admin Actions
  issueWarning(studentName: string) {
    if (
      confirm(
        `Are you sure you want to send a formal warning email to ${studentName} for missing consultations?`,
      )
    ) {
      alert(`Warning email sent to ${studentName}.`);
      this.stats.warningsIssued++;
    }
  }

  markExcused(record: any) {
    record.status = 'EXCUSED';
    record.notes = 'Admin override: Excused absence';
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
