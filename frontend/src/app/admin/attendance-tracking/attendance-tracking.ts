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
      (r) => r.status === 'NO_SHOW' || r.status === 'NO-SHOW' || this.isLecturerNoShow(r)
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

  isLecturerNoShow(record?: AdminAttendanceItem | null): boolean {
    if (!record || !record.status) return false;
    const s = record.status.trim().toUpperCase();
    return s === 'LECTURER_NO_SHOW' || s === 'LECTURER-NO-SHOW';
  }

  get lecturerNoShowsCount(): number {
    return this.attendanceRecords.filter((r) => this.isLecturerNoShow(r)).length;
  }

  get studentNoShowsCount(): number {
    return this.attendanceRecords.filter((r) => r.status === 'NO_SHOW' || r.status === 'NO-SHOW').length;
  }

  get filteredRecords(): AdminAttendanceItem[] {
    return this.attendanceRecords.filter((record) => {
      let matchesStatus = true;
      if (this.filterStatus === 'NO_SHOW' || this.filterStatus === 'NO-SHOW') {
        matchesStatus = record.status === 'NO_SHOW' || record.status === 'NO-SHOW';
      } else if (this.filterStatus === 'LECTURER_NO_SHOW' || this.filterStatus === 'LECTURER-NO-SHOW') {
        matchesStatus = this.isLecturerNoShow(record);
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

  formatStatus(status?: string): string {
    if (!status) return '';
    const upper = status.trim().toUpperCase();
    if (upper === 'NO_SHOW' || upper === 'NO-SHOW') return 'NO-SHOW';
    if (upper === 'LECTURER_NO_SHOW' || upper === 'LECTURER-NO-SHOW') return 'LECTURER NO-SHOW';
    if (upper === 'RESCHEDULE_PENDING' || upper === 'RESCHEDULE-PENDING') return 'RESCHEDULE-PENDING';
    return upper;
  }

  getStatusBadgeClass(status: string): string {
    if (!status) return '';
    const s = status.toUpperCase();
    if (s === 'PRESENT') return 'present';
    if (s === 'NO_SHOW' || s === 'NO-SHOW') return 'no-show no_show text-violet-600 bg-violet-100';
    if (s === 'LECTURER_NO_SHOW' || s === 'LECTURER-NO-SHOW') return 'lecturer-no-show no-show text-violet-600 bg-violet-100 border border-violet-200';
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

    if (this.isLecturerNoShow(record)) {
      this.warningMessage = `Attendance Warning: Lecturer ${lecturerName} was reported absent by student ${studentName} for the scheduled consultation session on ${dateStr}. Please adhere to scheduled consultation commitments.`;
    } else {
      this.warningMessage = `Attendance Warning: ${studentName} was marked as a NO-SHOW for the scheduled consultation session with ${lecturerName} on ${dateStr}. Please review this missed session.`;
    }
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
    const isNoShow = record.status === 'NO_SHOW' || record.status === 'NO-SHOW' || this.isLecturerNoShow(record);
    return isNoShow && !record.warningIssued;
  }

  isWarningSent(record: AdminAttendanceItem): boolean {
    const isNoShow = record.status === 'NO_SHOW' || record.status === 'NO-SHOW' || this.isLecturerNoShow(record);
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
    const isLecturer = this.isLecturerNoShow(targetRecord);

    // Immediately mark warning as issued on this record so buttons disappear
    targetRecord.warningIssued = true;

    // 1. Close warning modal immediately so user goes directly to attendance-tracking page
    this.closeWarningModal();

    // 2. Increment warning count and update stats
    this.warningsIssuedCount = this.attendanceRecords.filter(r => r.warningIssued).length;
    this.calculateStats();

    // 3. Show small popup success message
    this.successPopupMessage = isLecturer
      ? `Warning sent successfully to lecturer ${lecturerName}!`
      : `Warning sent successfully to ${studentName} and ${lecturerName}!`;
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

  // Excuse Modal State
  isExcuseModalOpen: boolean = false;
  selectedRecordForExcuse: AdminAttendanceItem | null = null;
  excuseReason: string = 'Admin override: Excused absence';
  isSubmittingExcuse: boolean = false;

  openExcuseModal(record: AdminAttendanceItem): void {
    this.selectedRecordForExcuse = record;
    this.excuseReason = 'Admin override: Excused absence';
    this.isExcuseModalOpen = true;
    this.cdr.detectChanges();
  }

  closeExcuseModal(): void {
    this.isExcuseModalOpen = false;
    this.selectedRecordForExcuse = null;
    this.excuseReason = 'Admin override: Excused absence';
    this.isSubmittingExcuse = false;
    this.cdr.detectChanges();
  }

  confirmExcuse(): void {
    if (!this.selectedRecordForExcuse) return;
    const record = this.selectedRecordForExcuse;
    const isLecturer = this.isLecturerNoShow(record);
    const targetName = isLecturer
      ? (record.lecturerName || 'Lecturer')
      : (record.studentName || record.studentMatric || 'Student');

    this.isSubmittingExcuse = true;
    const notes = this.excuseReason.trim() || 'Admin override: Excused absence';

    this.attendanceService
      .updateAttendanceStatus(record.id, 'EXCUSED', notes)
      .subscribe({
        next: (updated) => {
          record.status = updated.status;
          record.notes = updated.notes;
          this.calculateStats();

          this.closeExcuseModal();

          // Display floating success toast message
          this.successPopupMessage = `Absence for ${targetName} has been marked as EXCUSED. Notification sent.`;
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
          this.isSubmittingExcuse = false;
          this.cdr.detectChanges();
        },
      });
  }

  markExcused(record: AdminAttendanceItem) {
    this.openExcuseModal(record);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
