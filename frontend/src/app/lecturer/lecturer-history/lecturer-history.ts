import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';

@Component({
  selector: 'app-lecturer-history',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarLect],
  templateUrl: './lecturer-history.html',
  styleUrls: ['./lecturer-history.css'],
})
export class LecturerHistoryComponent implements OnInit {
  // Filters
  searchQuery: string = '';
  statusFilter: string = 'ALL';
  dateFilter: string = '';

  // Modal State
  showModal = false;
  selectedLog: any = null;

  // Mock Database of Past Consultations
  historyLogs = [
    {
      id: 'APT-088',
      date: '2024-04-28',
      time: '10:00 AM',
      student: 'Jason Lee',
      matric: 'S12346',
      type: 'FYP Advising',
      reason: 'Review Chapter 3 architecture diagrams.',
      status: 'COMPLETED',
      notes: 'Diagrams look good. Advised him to proceed to Chapter 4.',
    },
    {
      id: 'APT-085',
      date: '2024-04-25',
      time: '02:00 PM',
      student: 'Nur Amirah',
      matric: 'S12345',
      type: 'General Consultation',
      reason: 'Need help understanding the assignment requirements.',
      status: 'COMPLETED',
      notes: 'Explained the grading rubric. Student understands the task now.',
    },
    {
      id: 'APT-082',
      date: '2024-04-20',
      time: '09:30 AM',
      student: 'Muthu Kumar',
      matric: 'S12348',
      type: 'General Consultation',
      reason: 'Ask questions about mid-term syllabus.',
      status: 'NO-SHOW',
      notes: 'Waited 15 minutes. Student did not join Webex.',
    },
    {
      id: 'APT-080',
      date: '2024-04-18',
      time: '11:00 AM',
      student: 'Siti Nurhaliza',
      matric: 'S12347',
      type: 'FYP Advising',
      reason: 'Initial topic proposal.',
      status: 'REJECTED',
      notes: 'Declined because I am already supervising 5 students this semester.',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  // Filter Logic
  get filteredLogs() {
    return this.historyLogs.filter((log) => {
      const matchesStatus = this.statusFilter === 'ALL' || log.status === this.statusFilter;
      const matchesDate = !this.dateFilter || log.date === this.dateFilter;
      const searchLower = this.searchQuery.toLowerCase();
      const matchesSearch =
        log.student.toLowerCase().includes(searchLower) ||
        log.matric.toLowerCase().includes(searchLower) ||
        log.id.toLowerCase().includes(searchLower);

      return matchesStatus && matchesDate && matchesSearch;
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.statusFilter = 'ALL';
    this.dateFilter = '';
  }

  // Modal Actions
  viewDetails(log: any) {
    this.selectedLog = log;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedLog = null;
  }

  exportHistory() {
    alert(`Successfully generated a CSV report of ${this.filteredLogs.length} past consultations.`);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
