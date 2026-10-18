import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { getAdminStatusBadgeClass } from '../admin-status';
import * as XLSX from 'xlsx';

export interface AdminDashboardData {
  stats: {
    todayConsultations: number;
    pendingApprovals: number;
    weeklyNoShows: number;
  };
  todayBreakdown: Array<{
    label: string;
    count: number;
    percentage: number;
    colorClass: string;
  }>;
  recentLogs: Array<{
    id: string;
    student: string;
    lecturer: string;
    status: string;
    time: string;
    topic: string;
    room: string;
    notes: string;
    date?: string;
    matric?: string;
    mode?: string;
  }>;
  todayLogs?: Array<{
    id: string;
    student: string;
    lecturer: string;
    status: string;
    time: string;
    topic: string;
    room: string;
    notes: string;
    date?: string;
    matric?: string;
    mode?: string;
  }>;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Sidebar],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  isDarkMode: boolean = false;

  getStatusBadgeClass(status?: string): string {
    return getAdminStatusBadgeClass(status);
  }

  // 1. Statistics
  stats = {
    todayConsultations: 0,
    pendingApprovals: 0,
    weeklyNoShows: 0,
  };

  // 2. Today's Status Breakdown
  todayBreakdown = [
    { label: 'Completed', count: 0, percentage: 0, colorClass: 'bg-teal' },
    { label: 'Pending', count: 0, percentage: 0, colorClass: 'bg-yellow' },
    { label: 'No-Shows', count: 0, percentage: 0, colorClass: 'bg-red' },
  ];

  // 3. Recent Consultations
  recentLogs: Array<{
    id: string;
    student: string;
    lecturer: string;
    status: string;
    time: string;
    topic: string;
    room: string;
    notes: string;
    date?: string;
    matric?: string;
    mode?: string;
  }> = [];

  // Today's Appointments (for Daily Export)
  todayLogs: Array<{
    id: string;
    student: string;
    lecturer: string;
    status: string;
    time: string;
    topic: string;
    room: string;
    notes: string;
    date?: string;
    matric?: string;
    mode?: string;
  }> = [];

  // Search & Filter State
  searchQuery: string = '';
  selectedStatus: string = 'All';

  // Details Modal State
  selectedLog: any = null;
  showModal: boolean = false;

  // Export State
  isExporting: boolean = false;

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

      this.loadDashboardData();
    }
  }

  loadDashboardData(): void {
    const token = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    this.http.get<AdminDashboardData>('http://localhost:8080/api/admin/dashboard', { headers }).subscribe({
      next: (data) => {
        if (data) {
          if (data.stats) {
            this.stats = data.stats;
          }
          if (data.todayBreakdown && data.todayBreakdown.length > 0) {
            this.todayBreakdown = data.todayBreakdown;
          }
          if (data.recentLogs && data.recentLogs.length > 0) {
            this.recentLogs = data.recentLogs;
          }
          if (data.todayLogs && data.todayLogs.length > 0) {
            this.todayLogs = data.todayLogs;
          }
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.warn('Could not load live admin dashboard stats:', err);
      }
    });
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

  // Filter Logic (limited to at most 5 recent consultations on the dashboard)
  get filteredLogs() {
    return this.recentLogs.filter(log => {
      const q = (this.searchQuery || '').toLowerCase();
      const matchesSearch =
        !q ||
        (log.student || '').toLowerCase().includes(q) ||
        (log.lecturer || '').toLowerCase().includes(q) ||
        (log.id || '').toLowerCase().includes(q) ||
        (log.topic || '').toLowerCase().includes(q);

      const matchesStatus = this.selectedStatus === 'All' || log.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    }).slice(0, 5);
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

  // Export Daily Summary to Excel (strictly for TODAY only, covering all statuses)
  exportLogs() {
    if (this.isExporting) return;

    this.isExporting = true;
    this.cdr.detectChanges();

    const todayDate = new Date();
    const yyyy = todayDate.getFullYear();
    const mm = String(todayDate.getMonth() + 1).padStart(2, '0');
    const dd = String(todayDate.getDate()).padStart(2, '0');
    const todayDateStr = `${yyyy}-${mm}-${dd}`;

    const token = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    // Retrieve consultations from database to strictly export appointments for TODAY
    this.http.get<any[]>('http://localhost:8080/api/admin/consultations', { headers }).subscribe({
      next: (allConsultations) => {
        // Filter strictly for TODAY's date (covering completed, no-show, rejected, cancelled, pending, confirmed, etc.)
        const todayOnly = (allConsultations || []).filter(c => c.scheduledDate === todayDateStr);
        this.buildAndDownloadTodayExcel(todayOnly, todayDateStr);
      },
      error: (err) => {
        console.warn('Could not fetch consultations directly, using todayLogs fallback:', err);
        // Fallback: strictly today's logs from dashboard
        const fallbackList = (this.todayLogs && this.todayLogs.length > 0)
          ? this.todayLogs.filter(l => !l.date || l.date === todayDateStr)
          : (this.recentLogs || []).filter(l => l.date === todayDateStr);
        this.buildAndDownloadTodayExcelFromLogs(fallbackList, todayDateStr);
      }
    });
  }

  private buildAndDownloadTodayExcel(items: any[], dateStr: string) {
    try {
      const workbook = XLSX.utils.book_new();

      // Sheet 1: Today's Appointments (Strictly for TODAY only)
      let exportRows: any[] = [];
      if (items && items.length > 0) {
        exportRows = items.map((c, index) => {
          let statusText = 'Pending';
          const s = (c.status || '').toUpperCase();
          if (s === 'COMPLETED') statusText = 'Completed';
          else if (s === 'NO_SHOW' || s === 'NO-SHOW') statusText = 'No-Show';
          else if (s === 'REJECTED') statusText = 'Rejected';
          else if (s === 'CANCELLED' || s === 'CANCELED') statusText = 'Cancelled';
          else if (s === 'CONFIRMED') statusText = 'Confirmed';
          else if (s === 'RESCHEDULE_PENDING' || s === 'RESCHEDULE-PENDING') statusText = 'Reschedule Pending';
          else statusText = c.status || 'Pending';

          let timeFormatted = c.scheduledTime || '-';
          if (timeFormatted && timeFormatted.includes(':')) {
            const parts = timeFormatted.split(':');
            const h = parseInt(parts[0], 10);
            const m = parts[1];
            if (!isNaN(h)) {
              const ampm = h >= 12 ? 'PM' : 'AM';
              const displayH = h % 12 === 0 ? 12 : h % 12;
              timeFormatted = `${String(displayH).padStart(2, '0')}:${m} ${ampm}`;
            }
          }

          let modeText = 'In-Person';
          if (c.consultationMode) {
            modeText = c.consultationMode.toUpperCase() === 'ONLINE' ? 'Virtual Session (Online)' : 'In-Person';
          }

          let remarks = c.lecturerRemarks || '';
          if (!remarks) {
            if (c.rejectReason) remarks = 'Rejection Reason: ' + c.rejectReason;
            else if (c.cancelReason) remarks = 'Cancellation Reason: ' + c.cancelReason;
            else if (c.rescheduleReason) remarks = 'Reschedule Note: ' + c.rescheduleReason;
            else if (c.reasonDetails) remarks = c.reasonDetails;
            else remarks = '-';
          }

          const rawId = c.id || '';
          const displayId = 'REQ-' + (rawId.length > 8 ? rawId.substring(0, 8).toUpperCase() : rawId.toUpperCase());

          return {
            'No.': index + 1,
            'Request ID': displayId,
            'Scheduled Date': c.scheduledDate || dateStr,
            'Scheduled Time': timeFormatted,
            'Student Name': c.studentName || '-',
            'Matric ID': c.studentMatric || '-',
            'Lecturer Name': c.lecturerName || '-',
            'Status': statusText,
            'Purpose / Reason': c.reason || 'General Consultation',
            'Mode': modeText,
            'Location / Venue': c.location || (modeText.includes('Virtual') ? 'Virtual Meeting' : 'Faculty Office'),
            'Remarks / Notes': remarks
          };
        });
      } else {
        exportRows = [
          {
            'No.': '-',
            'Request ID': '-',
            'Scheduled Date': dateStr,
            'Scheduled Time': '-',
            'Student Name': '-',
            'Matric ID': '-',
            'Lecturer Name': '-',
            'Status': 'No appointments recorded for today (' + dateStr + ').',
            'Purpose / Reason': '-',
            'Mode': '-',
            'Location / Venue': '-',
            'Remarks / Notes': '-'
          }
        ];
      }

      const wsAppointments = XLSX.utils.json_to_sheet(exportRows);
      wsAppointments['!cols'] = [
        { wch: 6 },  // No.
        { wch: 18 }, // Request ID
        { wch: 15 }, // Date
        { wch: 16 }, // Time
        { wch: 22 }, // Student
        { wch: 14 }, // Matric ID
        { wch: 22 }, // Lecturer
        { wch: 18 }, // Status
        { wch: 26 }, // Purpose
        { wch: 22 }, // Mode
        { wch: 20 }, // Location
        { wch: 32 }  // Remarks
      ];

      XLSX.utils.book_append_sheet(workbook, wsAppointments, "Today's Appointments");

      // Sheet 2: Today's Operational Summary & Metrics
      const todayDisplayStr = new Date().toLocaleDateString('en-MY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const completedCount = items.filter(c => (c.status || '').toUpperCase() === 'COMPLETED').length;
      const noShowCount = items.filter(c => (c.status || '').toUpperCase().includes('NO_SHOW') || (c.status || '').toUpperCase().includes('NO-SHOW')).length;
      const rejectedCount = items.filter(c => (c.status || '').toUpperCase() === 'REJECTED').length;
      const cancelledCount = items.filter(c => (c.status || '').toUpperCase().includes('CANCEL')).length;
      const pendingCount = items.filter(c => (c.status || '').toUpperCase().includes('PENDING')).length;
      const confirmedCount = items.filter(c => (c.status || '').toUpperCase() === 'CONFIRMED').length;

      const summaryData = [
        { 'Metric': 'Daily Summary Report Date', 'Value': todayDisplayStr },
        { 'Metric': 'Filter Criteria', 'Value': 'Appointments Scheduled For TODAY (' + dateStr + ') Only' },
        { 'Metric': 'Total Appointments for Today', 'Value': items.length },
        { 'Metric': 'Completed Appointments', 'Value': completedCount },
        { 'Metric': 'Confirmed Appointments', 'Value': confirmedCount },
        { 'Metric': 'Pending Approvals', 'Value': pendingCount },
        { 'Metric': 'No-Show Appointments', 'Value': noShowCount },
        { 'Metric': 'Cancelled Appointments', 'Value': cancelledCount },
        { 'Metric': 'Rejected Appointments', 'Value': rejectedCount }
      ];

      const wsSummary = XLSX.utils.json_to_sheet(summaryData);
      wsSummary['!cols'] = [
        { wch: 34 },
        { wch: 36 }
      ];

      XLSX.utils.book_append_sheet(workbook, wsSummary, 'Operational Summary');

      const fileName = `Daily_Summary_${dateStr}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (e) {
      console.error('Error generating Excel daily summary:', e);
    } finally {
      this.isExporting = false;
      this.cdr.detectChanges();
    }
  }

  private buildAndDownloadTodayExcelFromLogs(logs: any[], dateStr: string) {
    const converted = (logs || []).map(l => ({
      id: l.id,
      scheduledDate: l.date || dateStr,
      scheduledTime: l.time,
      studentName: l.student,
      studentMatric: l.matric,
      lecturerName: l.lecturer,
      status: l.status,
      reason: l.topic,
      consultationMode: l.mode,
      location: l.room,
      lecturerRemarks: l.notes
    }));
    this.buildAndDownloadTodayExcel(converted, dateStr);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}


