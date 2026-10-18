import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { ConsultationService, Consultation } from '../../services/consultation.service';
import * as XLSX from 'xlsx';
import { getLecturerStatusBadgeClass, getLecturerStatusBadgeStyle } from '../lecturer-status';

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

  appointments: any[] = [];

  constructor(
    private router: Router,
    private consultationService: ConsultationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadHistory();
    this.cdr.detectChanges();
  }

  loadHistory(): void {
    this.consultationService.getLecturerConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        console.log('REAL LECTURER HISTORY:', consultations);

        const mappedAppointments = (consultations || []).map((consultation) => {
          const rawStatus = (consultation.status || '').trim().toUpperCase().replace(/_/g, '-');
          let mappedStatus = rawStatus;
          if (rawStatus === 'NO_SHOW' || rawStatus === 'NO-SHOW') {
            mappedStatus = 'NO-SHOW';
          } else if (rawStatus === 'RESCHEDULE_PENDING' || rawStatus === 'RESCHEDULE-PENDING') {
            mappedStatus = 'RESCHEDULE-PENDING';
          } else if (rawStatus === 'CANCELLED' || rawStatus === 'CANCELED') {
            mappedStatus = 'CANCELLED';
          } else if (rawStatus === 'REJECTED') {
            mappedStatus = 'REJECTED';
          } else if (rawStatus === 'COMPLETED') {
            mappedStatus = 'COMPLETED';
          }

          const cancelReason = consultation.cancelReason || '';
          const rejectReason = consultation.rejectReason || '';

          if (cancelReason && cancelReason.trim().length > 0 && mappedStatus !== 'REJECTED') {
            mappedStatus = 'CANCELLED';
          }

          return {
            id: consultation.id,
            student: consultation.studentName || 'Unknown Student',
            studentMatric: consultation.studentMatric ? consultation.studentMatric.toString() : '',
            lecturer: consultation.lecturerName,
            type: consultation.reason,
            date: consultation.scheduledDate,
            time: consultation.scheduledTime,
            location: consultation.location || '',
            reason: consultation.reasonDetails || consultation.reason || 'Consultation',
            cancelReason: cancelReason,
            rejectReason: rejectReason,
            remarks: consultation.lecturerRemarks || '',
            notes: '',
            status: mappedStatus,
          };
        });

        this.appointments = mappedAppointments;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('FAILED TO LOAD LECTURER HISTORY:', error);
        this.appointments = [];
        this.cdr.detectChanges();
      },
    });
  }

  getCancelledBy(log: any): 'Student' | 'Lecturer' {
    if (!log) return 'Student';
    if (log.cancelledBy) {
      return log.cancelledBy.toLowerCase().includes('lecturer') ? 'Lecturer' : 'Student';
    }
    if (log.cancelInitiator) {
      return log.cancelInitiator.toLowerCase().includes('lecturer') ? 'Lecturer' : 'Student';
    }
    const combined = ((log.cancelReason || '') + ' ' + (log.remarks || '')).toLowerCase();
    if (combined.includes('by lecturer') || combined.includes('lecturer cancelled')) {
      return 'Lecturer';
    }
    return 'Student';
  }

  getRejectedBy(log: any): 'Lecturer' | 'Student' {
    if (!log) return 'Lecturer';
    if (log.rejectedBy) {
      return log.rejectedBy.toLowerCase().includes('student') ? 'Student' : 'Lecturer';
    }
    if (log.rejectInitiator) {
      return log.rejectInitiator.toLowerCase().includes('student') ? 'Student' : 'Lecturer';
    }
    const combined = ((log.rejectReason || '') + ' ' + (log.remarks || '')).toLowerCase();
    if (combined.includes('by student') || combined.includes('student rejected') || combined.includes('declined by student')) {
      return 'Student';
    }
    return 'Lecturer';
  }

  // History logs derived from real backend consultations
  get historyLogs(): any[] {
    return this.appointments.filter((a) => {
      const status = (a.status || '').trim().toUpperCase().replace(/_/g, '-');
      return (
        status === 'COMPLETED' ||
        status === 'NO-SHOW' ||
        status === 'REJECTED' ||
        status === 'CANCELLED' ||
        status === 'CANCELED' ||
        (!!a.cancelReason && a.cancelReason.trim().length > 0) ||
        (!!a.rejectReason && a.rejectReason.trim().length > 0)
      );
    });
  }

  // Filter Logic
  get filteredLogs(): any[] {
    return this.historyLogs.filter((log) => {
      const logStatus = (log.status || '').trim().toUpperCase().replace(/_/g, '-');
      const filterStatus = (this.statusFilter || '').trim().toUpperCase().replace(/_/g, '-');

      let matchesStatus = false;
      if (filterStatus === 'ALL') {
        matchesStatus = true;
      } else if (filterStatus === 'CANCELLED' || filterStatus === 'CANCELED') {
        matchesStatus =
          logStatus === 'CANCELLED' ||
          logStatus === 'CANCELED' ||
          (!!log.cancelReason && log.cancelReason.trim().length > 0);
      } else if (filterStatus === 'REJECTED') {
        matchesStatus =
          logStatus === 'REJECTED' ||
          (!!log.rejectReason && log.rejectReason.trim().length > 0);
      } else if (filterStatus === 'NO-SHOW') {
        matchesStatus = logStatus === 'NO-SHOW';
      } else {
        matchesStatus = logStatus === filterStatus;
      }

      const matchesDate = !this.dateFilter || log.date === this.dateFilter;

      const searchLower = (this.searchQuery || '').toLowerCase().trim();
      const studentMatric = (log.studentMatric || '').toLowerCase();
      const studentName = (log.student || '').toLowerCase();
      const logId = (log.id || '').toString().toLowerCase();

      const matchesSearch =
        !searchLower ||
        studentName.includes(searchLower) ||
        studentMatric.includes(searchLower) ||
        logId.includes(searchLower);

      return matchesStatus && matchesDate && matchesSearch;
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.statusFilter = 'ALL';
    this.dateFilter = '';
  }

  // Modal Actions
  viewDetails(log: any): void {
    this.selectedLog = log;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedLog = null;
  }

  exportHistory(): void {
    const dataToExport = this.filteredLogs;
    if (!dataToExport || dataToExport.length === 0) {
      alert('No consultation records found to export.');
      return;
    }

    const excelData = dataToExport.map((log) => {
      let detailReason = '';
      if (log.status === 'CANCELLED' || log.cancelReason) {
        detailReason = `Cancelled by ${this.getCancelledBy(log)}: ${log.cancelReason || ''}`.trim();
      } else if (log.status === 'REJECTED' || log.rejectReason) {
        detailReason = `Rejected by ${this.getRejectedBy(log)}: ${log.rejectReason || ''}`.trim();
      } else if (log.status === 'COMPLETED' || log.status === 'NO-SHOW') {
        detailReason = log.remarks || log.notes || '-';
      }

      return {
        'Date': log.date || '-',
        'Time': log.time || '-',
        'Student Name': log.student || '-',
        'Matric ID': log.studentMatric || '-',
        'Consultation Type': log.type || '-',
        'Reason for Visit': log.reason || '-',
        'Status': log.status || '-',
        'Cancellation / Rejection Detail': detailReason || '-',
        'Lecturer Remarks': log.remarks || '-'
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set custom column widths for clean readability in Excel
    worksheet['!cols'] = [
      { wch: 14 }, // Date
      { wch: 12 }, // Time
      { wch: 22 }, // Student Name
      { wch: 14 }, // Matric ID
      { wch: 20 }, // Consultation Type
      { wch: 32 }, // Reason for Visit
      { wch: 14 }, // Status
      { wch: 36 }, // Cancellation / Rejection Detail
      { wch: 30 }, // Remarks
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Consultation History');

    const fileName = `Consultation_History_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  getStatusBadgeClass(status?: string): string {
    return getLecturerStatusBadgeClass(status);
  }

  getStatusBadgeStyle(status?: string): { color: string; backgroundColor: string; borderColor?: string } {
    return getLecturerStatusBadgeStyle(status);
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}

