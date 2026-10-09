import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { ConsultationService, Consultation } from '../../services/consultation.service';

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

        this.appointments = consultations.map((consultation) => ({
          id: consultation.id,
          student: consultation.studentName || 'Unknown Student',
          studentMatric: consultation.studentMatric ? consultation.studentMatric.toString() : '',
          lecturer: consultation.lecturerName,
          type: consultation.reason,
          date: consultation.scheduledDate,
          time: consultation.scheduledTime,
          location: consultation.location || '',
          reason: consultation.reasonDetails || '',
          remarks: consultation.lecturerRemarks|| consultation.rejectReason || consultation.cancelReason || '',
          notes: '',
          status: consultation.status === 'NO_SHOW' ? 'NO-SHOW' : consultation.status,
        }));

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('FAILED TO LOAD LECTURER HISTORY:', error);
      },
    });
  }

  // History logs derived from real backend consultations
  get historyLogs(): any[] {
    return this.appointments.filter(
      (a) =>
        a.status === 'COMPLETED' ||
        a.status === 'NO-SHOW' ||
        a.status === 'REJECTED' ||
        a.status === 'CANCELLED',
    );
  }

  // Filter Logic
  get filteredLogs(): any[] {
    return this.historyLogs.filter((log) => {
      const matchesStatus = this.statusFilter === 'ALL' || log.status === this.statusFilter;

      const matchesDate = !this.dateFilter || log.date === this.dateFilter;

      const searchLower = this.searchQuery.toLowerCase();

      const studentMatric = log.studentMatric || '';

      const matchesSearch =
        log.student.toLowerCase().includes(searchLower) ||
        studentMatric.toLowerCase().includes(searchLower) ||
        log.id.toLowerCase().includes(searchLower);

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
    alert(`Successfully generated a CSV report of ${this.filteredLogs.length} past consultations.`);
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}

