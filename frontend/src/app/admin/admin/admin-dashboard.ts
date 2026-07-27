import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  isDarkMode: boolean = false;

  // 1. Statistics
  stats = {
    todayConsultations: 42,
    pendingApprovals: 7,
    weeklyNoShows: 3,
  };

  // 2. Today's Status Breakdown
  todayBreakdown = [
    { label: 'Completed', count: 24, percentage: 60, colorClass: 'bg-teal' },
    { label: 'Pending', count: 15, percentage: 35, colorClass: 'bg-yellow' },
    { label: 'No-Shows', count: 3, percentage: 5, colorClass: 'bg-red' },
  ];

  // 3. Recent Consultations
  recentLogs = [
    {
      id: 'REQ-8921',
      student: 'Amirul Hakim',
      lecturer: 'Dr. Siti Nurhaliza',
      status: 'Completed',
      time: '09:00 AM',
      topic: 'Final Year Project Consultation',
      room: 'Room A-102',
      notes: 'Reviewed literature section and approved methodology outline.',
    },
    {
      id: 'REQ-8922',
      student: 'Nurul Maizatul',
      lecturer: 'Prof. Ahmad Zaidi',
      status: 'Pending',
      time: '10:30 AM',
      topic: 'Database Systems Query Optimization',
      room: 'Room C-304',
      notes: 'Needs help with performance tuning on SQL queries.',
    },
    {
      id: 'REQ-8923',
      student: 'Lim Wei Jie',
      lecturer: 'Dr. Aishah',
      status: 'No-Show',
      time: '11:15 AM',
      topic: 'Algorithm Complexity Analysis Assignment',
      room: 'Room B-211',
      notes: 'Did not attend the scheduled virtual meeting. Reminded via email.',
    },
  ];

  // Search & Filter State
  searchQuery: string = '';
  selectedStatus: string = 'All';

  // Details Modal State
  selectedLog: any = null;
  showModal: boolean = false;

  // Export State
  isExporting: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.isDarkMode = true;
        this.document.documentElement.classList.add('dark');
      } else {
        this.isDarkMode = false;
        this.document.documentElement.classList.remove('dark');
      }
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        this.document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        this.document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  // Filter Logic
  get filteredLogs() {
    return this.recentLogs.filter(log => {
      const matchesSearch =
        log.student.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        log.lecturer.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        log.id.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = this.selectedStatus === 'All' || log.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  // Filter by Status (clicked from tabs or stat cards)
  filterByStatus(status: string) {
    this.selectedStatus = status;
  }

  // View Details Modal
  viewDetails(log: any) {
    this.selectedLog = log;
    this.showModal = true;
  }

  // Close Details Modal
  closeModal() {
    this.selectedLog = null;
    this.showModal = false;
  }

  // Export Summary
  exportLogs() {
    if (this.isExporting) return;

    this.isExporting = true;

    setTimeout(() => {
      this.isExporting = false;
      this.toastMessage = "Report REQ-2026-SUMMARY.xlsx exported successfully!";
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 5000);
    }, 1500);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}

