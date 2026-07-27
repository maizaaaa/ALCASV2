import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-consultation-logs',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './consultation-logs.html',
  styleUrls: ['./consultation-logs.css'],
})
export class ConsultationLogsComponent implements OnInit {
  searchQuery: string = '';
  statusFilter: string = 'ALL';
  dateFilter: string = '';

  // --- MODAL STATE ---
  showModal = false;
  selectedLog: any = null;

  // Mock Database (Added location and notes)
  logs = [
    {
      id: 'CS-8042',
      date: '2024-05-05',
      time: '10:00 AM - 10:30 AM',
      student: 'Nur Amirah (S12345)',
      lecturer: 'Dr. Ahmad Fauzi',
      reason: 'I need help reviewing Chapter 3 of my FYP before the final submission next week.',
      status: 'COMPLETED',
      location: 'Lecturer Office (Awang Had Salleh)',
      notes: 'Student is on track. Advised to fix formatting on page 12.',
    },
    {
      id: 'CS-8043',
      date: '2024-05-05',
      time: '11:30 AM - 12:00 PM',
      student: 'Jason Lee (S12346)',
      lecturer: 'Prof. Sarah Tan',
      reason: 'Career Advice and Resume Review',
      status: 'PENDING',
      location: 'Webex Online',
      notes: '-',
    },
    {
      id: 'CS-8044',
      date: '2024-05-04',
      time: '09:00 AM - 09:30 AM',
      student: 'Siti Nurhaliza (S12347)',
      lecturer: 'Dr. Ahmad Fauzi',
      reason: 'Assignment 2 Clarification',
      status: 'NO-SHOW',
      location: 'Lecturer Office',
      notes: 'Waited for 15 minutes, student did not attend.',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  get filteredLogs() {
    return this.logs.filter((log) => {
      const matchesStatus = this.statusFilter === 'ALL' || log.status === this.statusFilter;
      const matchesDate = !this.dateFilter || log.date === this.dateFilter;
      const searchLower = this.searchQuery.toLowerCase();
      const matchesSearch =
        log.id.toLowerCase().includes(searchLower) ||
        log.student.toLowerCase().includes(searchLower) ||
        log.lecturer.toLowerCase().includes(searchLower);

      return matchesStatus && matchesDate && matchesSearch;
    });
  }

  // --- MODAL ACTIONS ---
  viewDetails(log: any) {
    this.selectedLog = log;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedLog = null;
  }

  exportLogs() {
    alert(`Successfully exported ${this.filteredLogs.length} consultation records!`);
  }

  clearFilters() {
    this.searchQuery = '';
    this.statusFilter = 'ALL';
    this.dateFilter = '';
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
