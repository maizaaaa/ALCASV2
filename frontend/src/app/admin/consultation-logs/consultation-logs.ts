import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { ConsultationService, Consultation } from '../../services/consultation.service';
import { getAdminStatusBadgeClass } from '../admin-status';
import * as XLSX from 'xlsx';

export interface ConsultationLogItem {
  id: string;
  displayId: string;
  date: string;
  time: string;
  student: string;
  studentName: string;
  studentMatric: string;
  lecturer: string;
  reason: string;
  reasonDetails?: string;
  status: string;
  location: string;
  notes: string;
  statusClass: string;
}

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
  isLoading: boolean = false;
  errorMessage: string = '';

  getStatusBadgeClass(status?: string): string {
    return getAdminStatusBadgeClass(status);
  }

  // --- MODAL STATE ---
  showModal = false;
  selectedLog: ConsultationLogItem | null = null;

  logs: ConsultationLogItem[] = [];

  constructor(
    private router: Router,
    private consultationService: ConsultationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.consultationService.getAllConsultations().subscribe({
      next: (data) => {
        this.logs = (data || []).map((c) => this.mapConsultationToLog(c));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load consultation logs:', err);
        this.errorMessage = 'Failed to load consultation records from database.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  private mapConsultationToLog(c: Consultation): ConsultationLogItem {
    const studentName = c.studentName || 'Student #' + (c.studentId || '');
    const studentMatric = c.studentMatric ? String(c.studentMatric) : '';
    const studentDisplay = studentMatric ? `${studentName} (${studentMatric})` : studentName;
    const lecturerDisplay = c.lecturerName || 'Lecturer #' + (c.lecturerId || '');

    const formattedTime = this.formatTime(c.scheduledTime);

    let loc = c.location;
    if (!loc || loc.trim() === '') {
      loc = c.consultationMode === 'ONLINE' ? 'Webex / Online Room' : 'Lecturer Office';
    }

    let notes = c.lecturerRemarks || '';
    if (!notes && c.cancelReason) {
      notes = `Cancelled: ${c.cancelReason}`;
    } else if (!notes && c.rejectReason) {
      notes = `Rejected: ${c.rejectReason}`;
    } else if (!notes && c.rescheduleReason) {
      notes = `Reschedule reason: ${c.rescheduleReason}`;
    }
    if (!notes) {
      notes = '-';
    }

    let status = (c.status || 'PENDING').toUpperCase();
    if (status === 'NO_SHOW') status = 'NO-SHOW';
    const statusClass = this.getStatusBadgeClass(status);

    return {
      id: c.id,
      displayId: c.id && c.id.length > 12 ? c.id.substring(0, 8).toUpperCase() : c.id,
      date: c.scheduledDate || '',
      time: formattedTime,
      student: studentDisplay,
      studentName,
      studentMatric,
      lecturer: lecturerDisplay,
      reason: c.reason || 'General Consultation',
      reasonDetails: c.reasonDetails,
      status: status,
      location: loc,
      notes: notes,
      statusClass: statusClass,
    };
  }

  private formatTime(timeStr?: string): string {
    if (!timeStr) return '';
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      let hours = parseInt(parts[0], 10);
      const minutes = parts[1];
      if (!isNaN(hours)) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHour = hours < 10 ? `0${hours}` : `${hours}`;
        return `${formattedHour}:${minutes} ${ampm}`;
      }
    }
    return timeStr;
  }

  get filteredLogs(): ConsultationLogItem[] {
    return this.logs.filter((log) => {
      const matchesStatus =
        this.statusFilter === 'ALL' ||
        log.status.replace(/[-_]/g, '') === this.statusFilter.replace(/[-_]/g, '');

      const matchesDate = !this.dateFilter || log.date === this.dateFilter;

      const searchLower = this.searchQuery.trim().toLowerCase();
      const matchesSearch =
        !searchLower ||
        log.id.toLowerCase().includes(searchLower) ||
        log.displayId.toLowerCase().includes(searchLower) ||
        log.student.toLowerCase().includes(searchLower) ||
        log.lecturer.toLowerCase().includes(searchLower) ||
        log.reason.toLowerCase().includes(searchLower) ||
        (log.location && log.location.toLowerCase().includes(searchLower));

      return matchesStatus && matchesDate && matchesSearch;
    });
  }

  // --- MODAL ACTIONS ---
  viewDetails(log: ConsultationLogItem) {
    this.selectedLog = log;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedLog = null;
  }

  exportLogs() {
    if (!this.filteredLogs.length) {
      alert('No consultation records to export.');
      return;
    }

    // Prepare clean, structured tabular data for Excel
    const excelData = this.filteredLogs.map((log) => ({
      'Log ID': log.displayId,
      'Full ID': log.id,
      'Date': log.date,
      'Time': log.time,
      'Student Name': log.studentName,
      'Matric ID': log.studentMatric || '-',
      'Lecturer': log.lecturer,
      'Reason for Visit': log.reason,
      'Reason Details': log.reasonDetails || '-',
      'Status': log.status,
      'Location / Platform': log.location,
      'Lecturer Remarks': log.notes && log.notes !== '-' ? log.notes : 'None',
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Custom column widths so text does not overlap or get cramped in Excel
    worksheet['!cols'] = [
      { wch: 12 }, // Log ID
      { wch: 38 }, // Full ID
      { wch: 13 }, // Date
      { wch: 12 }, // Time
      { wch: 22 }, // Student Name
      { wch: 14 }, // Matric ID
      { wch: 22 }, // Lecturer
      { wch: 24 }, // Reason for Visit
      { wch: 30 }, // Reason Details
      { wch: 14 }, // Status
      { wch: 24 }, // Location / Platform
      { wch: 32 }, // Remarks
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Consultation Logs');

    const fileName = `consultation_logs_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
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
