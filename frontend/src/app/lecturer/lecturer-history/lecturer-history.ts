import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { AppointmentService, Appointment } from '../../services/appointment.service';

@Component({
  selector: 'app-lecturer-history',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarLect],
  templateUrl: './lecturer-history.html',
  styleUrls: ['./lecturer-history.css'],
})
export class LecturerHistoryComponent implements OnInit, OnDestroy {
  // Filters
  searchQuery: string = '';
  statusFilter: string = 'ALL';
  dateFilter: string = '';

  // Modal State
  showModal = false;
  selectedLog: any = null;

  appointments: Appointment[] = [];
  private apptSub!: Subscription;

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.apptSub = this.appointmentService.appointments$.subscribe((data) => {
      this.appointments = data;
    });
  }

  ngOnDestroy(): void {
    if (this.apptSub) {
      this.apptSub.unsubscribe();
    }
  }

  // History logs derived from appointments stream (COMPLETED, NO-SHOW, REJECTED, CANCELLED)
  get historyLogs(): Appointment[] {
    return this.appointments.filter((a) =>
      a.status === 'COMPLETED' || a.status === 'NO-SHOW' || a.status === 'REJECTED' || a.status === 'CANCELLED'
    );
  }

  // Filter Logic
  get filteredLogs() {
    return this.historyLogs.filter((log) => {
      const matchesStatus = this.statusFilter === 'ALL' || log.status === this.statusFilter;
      const matchesDate = !this.dateFilter || log.date === this.dateFilter;
      const searchLower = this.searchQuery.toLowerCase();
      const studentMatric = log.studentMatric || log.matric || '';
      const matchesSearch =
        log.student.toLowerCase().includes(searchLower) ||
        studentMatric.toLowerCase().includes(searchLower) ||
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
