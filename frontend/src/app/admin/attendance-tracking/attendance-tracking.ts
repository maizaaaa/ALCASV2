import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { AttendanceService, AdminAttendanceItem } from '../../services/attendance.service';

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
    attendanceRate: '0%',
    totalNoShows: 0,
    warningsIssued: 0,
    totalRecords: 0,
  };

  filterStatus: string = 'ALL';
  searchQuery: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  warningsIssuedCount: number = 0;

  attendanceRecords: AdminAttendanceItem[] = [];

  constructor(
    private router: Router,
    private attendanceService: AttendanceService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.attendanceService.getAllAttendance().subscribe({
      next: (data) => {
        this.attendanceRecords = data;
        this.warningsIssuedCount = this.attendanceRecords.filter(r => r.warningIssued).length;
        this.calculateStats();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load attendance:', err);
        this.errorMessage = 'Failed to load attendance records from database.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  calculateStats(): void {
    const total = this.attendanceRecords.length;
    const noShows = this.attendanceRecords.filter(
      (r) => r.status === 'NO_SHOW' || r.status === 'NO-SHOW'
    ).length;
    const present = this.attendanceRecords.filter(
      (r) => r.status === 'PRESENT'
    ).length;

    const rate = total > 0 ? Math.round((present / total) * 100) + '%' : '0%';
    this.stats = {
      attendanceRate: rate,
      totalNoShows: noShows,
      warningsIssued: this.warningsIssuedCount,
      totalRecords: total,
    };
  }

  get filteredRecords(): AdminAttendanceItem[] {
    return this.attendanceRecords.filter((record) => {
      let matchesStatus = true;
      if (this.filterStatus === 'NO_SHOW' || this.filterStatus === 'NO-SHOW') {
        matchesStatus = record.status === 'NO_SHOW' || record.status === 'NO-SHOW';
      } else if (this.filterStatus === 'PRESENT') {
        matchesStatus = record.status === 'PRESENT';
      } else if (this.filterStatus === 'EXCUSED') {
        matchesStatus = record.status === 'EXCUSED';
      }

      const searchLower = this.searchQuery.trim().toLowerCase();
      const studentName = (record.studentName || '').toLowerCase();
      const studentMatric = (record.studentMatric || '').toLowerCase();
      const lecturerName = (record.lecturerName || '').toLowerCase();

      const matchesSearch =
        !searchLower ||
        studentName.includes(searchLower) ||
        studentMatric.includes(searchLower) ||
        lecturerName.includes(searchLower);

      return matchesStatus && matchesSearch;
    });
  }

  getStatusBadgeClass(status: string): string {
    if (!status) return '';
    const s = status.toUpperCase();
    if (s === 'PRESENT') return 'present';
    if (s === 'NO_SHOW' || s === 'NO-SHOW') return 'no-show no_show';
    if (s === 'EXCUSED') return 'excused';
    return s.toLowerCase();
  }

  // Warning Modal State
  isWarningModalOpen: boolean = false;
  selectedRecordForWarning: AdminAttendanceItem | null = null;
  warningMessage: string = '';
  isSendingWarning: boolean = false;

  // Admin Actions
  issueWarning(record: AdminAttendanceItem) {
    this.openWarningModal(record);
  }

  openWarningModal(record: AdminAttendanceItem): void {
    this.selectedRecordForWarning = record;
    const studentName = record.studentName || record.studentMatric || 'Student';
    const lecturerName = record.lecturerName || 'Lecturer';
    const dateStr = record.attendanceDate || 'the scheduled consultation';

    this.warningMessage = `Attendance Warning: ${studentName} was marked as a NO-SHOW for the scheduled consultation session with ${lecturerName} on ${dateStr}. Please review this missed session.`;
    this.isWarningModalOpen = true;
    this.cdr.detectChanges();
  }

  closeWarningModal(): void {
    this.isWarningModalOpen = false;
    this.selectedRecordForWarning = null;
    this.warningMessage = '';
    this.isSendingWarning = false;
    this.cdr.detectChanges();
  }

  isActionRequired(record: AdminAttendanceItem): boolean {
    const isNoShow = record.status === 'NO_SHOW' || record.status === 'NO-SHOW';
    return isNoShow && !record.warningIssued;
  }

  isWarningSent(record: AdminAttendanceItem): boolean {
    const isNoShow = record.status === 'NO_SHOW' || record.status === 'NO-SHOW';
    return isNoShow && !!record.warningIssued;
  }

  isExcused(record: AdminAttendanceItem): boolean {
    return record.status === 'EXCUSED';
  }

  // Small Popup Success Message state
  showSuccessPopup: boolean = false;
  successPopupMessage: string = '';
  private successPopupTimer: any = null;

  sendWarning(): void {
    if (!this.selectedRecordForWarning) return;

    const targetRecord = this.selectedRecordForWarning;
    const studentName =
      targetRecord.studentName ||
      targetRecord.studentMatric ||
      'Student';
    const lecturerName =
      targetRecord.lecturerName || 'Lecturer';
    const msg = this.warningMessage;
    const recordId = targetRecord.id;

    // Immediately mark warning as issued on this record so buttons disappear
    targetRecord.warningIssued = true;

    // 1. Close warning modal immediately so user goes directly to attendance-tracking page
    this.closeWarningModal();

    // 2. Increment warning count and update stats
    this.warningsIssuedCount = this.attendanceRecords.filter(r => r.warningIssued).length;
    this.calculateStats();

    // 3. Show small popup success message
    this.successPopupMessage = `Warning sent successfully to ${studentName} and ${lecturerName}!`;
    this.showSuccessPopup = true;
    this.cdr.detectChanges();

    if (this.successPopupTimer) {
      clearTimeout(this.successPopupTimer);
    }
    this.successPopupTimer = setTimeout(() => {
      this.showSuccessPopup = false;
      this.cdr.detectChanges();
    }, 4500);

    // 4. Send HTTP alert to backend
    this.attendanceService.sendNoShowAlert(recordId, msg).subscribe({
      next: (res) => {
        if (res && res.message) {
          this.successPopupMessage = res.message;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Failed to send warning alert:', err);
      },
    });
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
    if (this.successPopupTimer) {
      clearTimeout(this.successPopupTimer);
    }
    this.cdr.detectChanges();
  }

  markExcused(record: AdminAttendanceItem) {
    const studentName = record.studentName || record.studentMatric || 'Student';
    if (
      confirm(
        `Excuse absence for ${studentName}? This will update the status to EXCUSED and notify the student and lecturer.`
      )
    ) {
      this.attendanceService
        .updateAttendanceStatus(record.id, 'EXCUSED', 'Admin override: Excused absence')
        .subscribe({
          next: (updated) => {
            record.status = updated.status;
            record.notes = updated.notes;
            this.calculateStats();

            // Display floating success toast message
            this.successPopupMessage = `Absence for ${studentName} has been marked as EXCUSED. Notification sent.`;
            this.showSuccessPopup = true;
            if (this.successPopupTimer) {
              clearTimeout(this.successPopupTimer);
            }
            this.successPopupTimer = setTimeout(() => {
              this.showSuccessPopup = false;
              this.cdr.detectChanges();
            }, 4500);

            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Failed to update status to EXCUSED:', err);
            this.errorMessage = 'Failed to update status on server. Please try again.';
            this.cdr.detectChanges();
          },
        });
    }
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
