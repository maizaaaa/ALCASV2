import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import * as XLSX from 'xlsx';
import {
  AdminReportService,
  AdminAnalyticsReport,
  School,
  WeeklyTrendItem,
  ConsultationRecordItem,
} from '../../services/admin-report.service';

export interface SvgDonutSegment {
  statusKey: string;
  label: string;
  count: number;
  pct: number;
  color: string;
  dasharray: string;
  dashoffset: string;
}

export interface SvgBarItem {
  week: string;
  count: number;
  x: number;
  y: number;
  width: number;
  height: number;
  textY: number;
  centerX: number;
  fill: string;
}

@Component({
  selector: 'app-analytics-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './analytics-reports.html',
  styleUrls: ['./analytics-reports.css'],
})
export class AnalyticsReportsComponent implements OnInit {
  // 1. Report Parameters
  reportStartDate: string = '';
  reportEndDate: string = '';
  selectedSchoolId: string = 'ALL';

  schools: School[] = [];
  isGenerating = false;
  reportGenerated = false;
  errorMessage = '';

  // Actual Aggregated Database Report Data
  reportData: AdminAnalyticsReport | null = null;
  weeklyTrend: WeeklyTrendItem[] = [];
  todayDate: Date = new Date();

  // Interactive UI & Chart State
  selectedStatusFilter: string = 'ALL';
  tableSearchQuery: string = '';
  svgDonutSegments: SvgDonutSegment[] = [];
  svgBarItems: SvgBarItem[] = [];

  constructor(
    private router: Router,
    private adminReportService: AdminReportService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Set default dates: 30 days prior to today
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    this.reportStartDate = thirtyDaysAgo.toISOString().split('T')[0];
    this.reportEndDate = today.toISOString().split('T')[0];

    this.loadSchools();
    this.generateReport();
  }

  loadSchools(): void {
    this.adminReportService.getSchools().subscribe({
      next: (schools) => {
        this.schools = schools;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load schools for report filter:', err);
      },
    });
  }

  generateReport(): void {
    if (!this.reportStartDate || !this.reportEndDate) {
      alert('Please select a valid date range.');
      return;
    }

    this.isGenerating = true;
    this.errorMessage = '';

    const schoolIdParam =
      this.selectedSchoolId !== 'ALL' ? Number(this.selectedSchoolId) : null;

    this.adminReportService
      .getAnalyticsReport(this.reportStartDate, this.reportEndDate, schoolIdParam)
      .subscribe({
        next: (report) => {
          this.reportData = report;
          if (this.reportData && this.reportData.consultations) {
            this.reportData.consultations.forEach((c) => {
              c.status = this.formatStatus(c.status);
            });
          }
          this.weeklyTrend = report.weeklyTrend || [];
          this.todayDate = new Date();
          this.computeSvgCharts();
          this.reportGenerated = true;
          this.isGenerating = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error generating analytics report:', err);
          this.errorMessage = 'Failed to generate report from database. Please try again.';
          this.isGenerating = false;
          this.cdr.detectChanges();
        },
      });
  }

  setStatusFilter(status: string): void {
    this.selectedStatusFilter = status;
    this.cdr.detectChanges();
  }

  resetTableFilters(): void {
    this.selectedStatusFilter = 'ALL';
    this.tableSearchQuery = '';
    this.cdr.detectChanges();
  }

  formatStatus(status?: string): string {
    if (!status) return '';
    const upper = status.trim().toUpperCase();
    if (upper === 'NO_SHOW' || upper === 'NO-SHOW') return 'NO-SHOW';
    if (upper === 'RESCHEDULE_PENDING' || upper === 'RESCHEDULE-PENDING') return 'RESCHEDULE-PENDING';
    return upper;
  }

  getStatusClass(status?: string): string {
    if (!status) return '';
    const lower = status.toLowerCase();
    const hyphenated = lower.replace(/_/g, '-');
    const underscored = lower.replace(/-/g, '_');
    return `${lower} ${hyphenated} ${underscored}`;
  }

  get filteredConsultations(): ConsultationRecordItem[] {
    if (!this.reportData || !this.reportData.consultations) {
      return [];
    }

    let records = this.reportData.consultations;

    // Filter by status if not 'ALL'
    if (this.selectedStatusFilter !== 'ALL') {
      records = records.filter((c) => {
        const s = (c.status || '').toUpperCase();
        if (this.selectedStatusFilter === 'COMPLETED') return s === 'COMPLETED';
        if (this.selectedStatusFilter === 'NO-SHOW' || this.selectedStatusFilter === 'NO_SHOW') return s === 'NO-SHOW' || s === 'NO_SHOW';
        if (this.selectedStatusFilter === 'CANCELLED') return s === 'CANCELLED' || s === 'REJECTED';
        if (this.selectedStatusFilter === 'PENDING') return s.includes('PENDING') || s === 'CONFIRMED';
        if (this.selectedStatusFilter === 'RESCHEDULE-PENDING' || this.selectedStatusFilter === 'RESCHEDULE_PENDING') return s === 'RESCHEDULE-PENDING' || s === 'RESCHEDULE_PENDING';
        return true;
      });
    }

    // Filter by search query if any
    if (this.tableSearchQuery && this.tableSearchQuery.trim() !== '') {
      const q = this.tableSearchQuery.trim().toLowerCase();
      records = records.filter(
        (c) =>
          (c.studentName || '').toLowerCase().includes(q) ||
          (c.studentMatric || '').toLowerCase().includes(q) ||
          (c.lecturerName || '').toLowerCase().includes(q) ||
          (c.reason || '').toLowerCase().includes(q) ||
          (c.schoolName || '').toLowerCase().includes(q) ||
          (c.consultationMode || '').toLowerCase().includes(q)
      );
    }

    return records;
  }

  computeSvgCharts(): void {
    if (!this.reportData) return;

    // 1. Weekly Volume SVG Bars
    const trend = this.reportData.weeklyTrend || [];
    const maxCount = Math.max(...trend.map((t) => t.count), 1);
    const chartWidth = 460;
    const baselineY = 145;
    const maxBarHeight = 100;
    const n = Math.max(trend.length, 1);
    const colWidth = chartWidth / n;
    const barWidth = Math.min(Math.max(colWidth * 0.42, 28), 52);

    this.svgBarItems = trend.map((t, idx) => {
      const centerX = colWidth * idx + colWidth / 2;
      const x = centerX - barWidth / 2;
      const rawHeight = (t.count / maxCount) * maxBarHeight;
      const height = t.count > 0 ? Math.max(rawHeight, 8) : 4;
      const y = baselineY - height;
      const textY = t.count > 0 ? y - 7 : y - 4;
      return {
        week: t.week,
        count: t.count,
        x,
        y,
        width: barWidth,
        height,
        textY,
        centerX,
        fill: t.count > 0 ? '#0f766e' : '#cbd5e1',
      };
    });

    // 2. Status Doughnut SVG Segments
    const dist = this.reportData.statusDistribution;
    const total = this.reportData.totalConsultations;
    const circumference = 314.16; // 2 * PI * 50

    if (!dist || total === 0) {
      this.svgDonutSegments = [
        {
          statusKey: 'ALL',
          label: 'No Data',
          count: 0,
          pct: 100,
          color: '#cbd5e1',
          dasharray: `${circumference} ${circumference}`,
          dashoffset: '0',
        },
      ];
      return;
    }

    let runningOffset = 0;
    const items = [
      {
        key: 'COMPLETED',
        label: 'Completed',
        count: dist.completedCount,
        pct: dist.completedPercentage,
        color: '#16a34a',
      },
      {
        key: 'NO-SHOW',
        label: 'No-Show',
        count: dist.noShowCount,
        pct: dist.noShowPercentage,
        color: '#dc2626',
      },
      {
        key: 'CANCELLED',
        label: 'Cancelled / Rejected',
        count: dist.cancelledCount,
        pct: dist.cancelledPercentage,
        color: '#64748b',
      },
      {
        key: 'PENDING',
        label: 'Pending',
        count: dist.pendingCount,
        pct: dist.pendingPercentage,
        color: '#f59e0b',
      },
    ];

    this.svgDonutSegments = items.map((item) => {
      const sliceLength = total > 0 ? (item.count / total) * circumference : 0;
      const dasharray = `${sliceLength.toFixed(2)} ${circumference.toFixed(2)}`;
      const dashoffset = (-runningOffset).toFixed(2);
      runningOffset += sliceLength;
      return {
        statusKey: item.key,
        label: item.label,
        count: item.count,
        pct: item.pct,
        color: item.color,
        dasharray,
        dashoffset,
      };
    });
  }

  getPieChartGradient(): string {
    if (
      !this.reportData ||
      !this.reportData.statusDistribution ||
      this.reportData.totalConsultations === 0
    ) {
      return 'conic-gradient(#cbd5e1 0% 100%)';
    }

    const dist = this.reportData.statusDistribution;
    const c = dist.completedPercentage;
    const ns = c + dist.noShowPercentage;
    const can = ns + dist.cancelledPercentage;

    return `conic-gradient(#16a34a 0% ${c}%, #dc2626 ${c}% ${ns}%, #94a3b8 ${ns}% ${can}%, #f59e0b ${can}% 100%)`;
  }

  exportToPDF(): void {
    window.print();
  }

  exportToExcel(): void {
    if (
      !this.reportData ||
      !this.reportData.consultations ||
      this.reportData.consultations.length === 0
    ) {
      alert('No consultation records available to export for the selected criteria.');
      return;
    }

    const workbook = XLSX.utils.book_new();
    const data = this.reportData;
    const dist = data.statusDistribution;
    const consultations = data.consultations;

    // ============================================================
    // SHEET 1: EXECUTIVE ANALYTICS REPORT (MAIN DASHBOARD & RECORDS)
    // ============================================================
    const dashboardRows: any[][] = [];

    // Header Banners
    dashboardRows.push(['ALCAS — ACADEMIC CONSULTATION & ADVISING SYSTEM']);
    dashboardRows.push(['EXECUTIVE ANALYTICS & ATTENDANCE PERFORMANCE REPORT']);
    dashboardRows.push([]);

    // Executive KPI Summary Section Header
    dashboardRows.push([
      'REPORT CONTEXT', '',
      'KEY PERFORMANCE INDICATORS', '',
      'STATUS DISTRIBUTION', '',
      'WEEKLY SESSION TREND', ''
    ]);

    const w1 = this.weeklyTrend[0] ? `${this.weeklyTrend[0].week}: ${this.weeklyTrend[0].count} sessions` : '-';
    const w2 = this.weeklyTrend[1] ? `${this.weeklyTrend[1].week}: ${this.weeklyTrend[1].count} sessions` : '-';
    const w3 = this.weeklyTrend[2] ? `${this.weeklyTrend[2].week}: ${this.weeklyTrend[2].count} sessions` : '-';
    const w4 = this.weeklyTrend[3] ? `${this.weeklyTrend[3].week}: ${this.weeklyTrend[3].count} sessions` : '-';

    dashboardRows.push([
      'Target School:', data.schoolName || 'All Schools',
      'Total Consultations:', data.totalConsultations,
      'Completed Sessions:', `${dist?.completedCount ?? 0} (${dist?.completedPercentage ?? 0}%)`,
      'Week 1:', w1
    ]);

    dashboardRows.push([
      'Date Range:', `${this.reportStartDate} to ${this.reportEndDate}`,
      'Completion Rate:', data.completionRate,
      'No-Show Sessions:', `${dist?.noShowCount ?? 0} (${dist?.noShowPercentage ?? 0}%)`,
      'Week 2:', w2
    ]);

    dashboardRows.push([
      'Top Lecturer:', data.mostActiveLecturer,
      'Peak Booking Day:', data.peakDay,
      'Cancelled / Rejected:', `${dist?.cancelledCount ?? 0} (${dist?.cancelledPercentage ?? 0}%)`,
      'Week 3:', w3
    ]);

    dashboardRows.push([
      'Exported At:', new Date().toLocaleString(),
      'Data Source:', 'Verified MySQL Database',
      'Pending / In-Review:', `${dist?.pendingCount ?? 0} (${dist?.pendingPercentage ?? 0}%)`,
      'Week 4:', w4
    ]);

    dashboardRows.push([]);
    dashboardRows.push(['DETAILED CONSULTATION RECORDS & ATTENDANCE LOG (USE FILTER ARROWS ON TABLE HEADERS TO FILTER DATA)']);

    // Table Header
    const tableHeaderRowIndex = dashboardRows.length; // 0-indexed row for header
    dashboardRows.push([
      'No.',
      'Consultation ID',
      'Scheduled Date',
      'Scheduled Time',
      'Student Name',
      'Matric ID',
      'Lecturer Name',
      'School / Department',
      'Reason / Purpose',
      'Mode',
      'Attendance Status'
    ]);

    // Data Rows
    consultations.forEach((c, idx) => {
      dashboardRows.push([
        idx + 1,
        c.id,
        c.scheduledDate,
        c.scheduledTime,
        c.studentName || '-',
        c.studentMatric || '-',
        c.lecturerName || '-',
        c.schoolName || '-',
        c.reason || '-',
        c.consultationMode || '-',
        this.formatStatus(c.status) || '-'
      ]);
    });

    const dashboardSheet = XLSX.utils.aoa_to_sheet(dashboardRows);

    // Banners & Section Header Merges
    dashboardSheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 10 } }, // Main Title Banner
      { s: { r: 1, c: 0 }, e: { r: 1, c: 10 } }, // Subtitle Banner
      { s: { r: 3, c: 0 }, e: { r: 3, c: 1 } },  // Scope
      { s: { r: 3, c: 2 }, e: { r: 3, c: 3 } },  // KPIs
      { s: { r: 3, c: 4 }, e: { r: 3, c: 5 } },  // Status Breakdown
      { s: { r: 3, c: 6 }, e: { r: 3, c: 7 } },  // Weekly Trend
      { s: { r: 8, c: 0 }, e: { r: 8, c: 10 } }  // Table Section Header
    ];

    // Interactive AutoFilter across the consultation records table
    const lastRowIndex = dashboardRows.length;
    dashboardSheet['!autofilter'] = {
      ref: `A${tableHeaderRowIndex + 1}:K${lastRowIndex}`
    };

    // Column Widths for comfortable readability
    dashboardSheet['!cols'] = [
      { wch: 6 },  // No.
      { wch: 38 }, // Consultation ID
      { wch: 15 }, // Date
      { wch: 12 }, // Time
      { wch: 22 }, // Student Name
      { wch: 15 }, // Matric ID
      { wch: 22 }, // Lecturer Name
      { wch: 30 }, // School
      { wch: 26 }, // Reason
      { wch: 14 }, // Mode
      { wch: 18 }, // Status
    ];

    XLSX.utils.book_append_sheet(workbook, dashboardSheet, 'Executive Report');

    // ============================================================
    // SHEET 2: FLAT DATA (READY FOR PIVOT TABLES & CHARTS)
    // ============================================================
    const pivotData = consultations.map((c, i) => {
      const d = c.scheduledDate ? new Date(c.scheduledDate) : null;
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = d && !isNaN(d.getTime()) ? dayNames[d.getDay()] : '-';

      return {
        'Index': i + 1,
        'Consultation ID': c.id,
        'Scheduled Date': c.scheduledDate,
        'Scheduled Time': c.scheduledTime,
        'Day of Week': dayOfWeek,
        'Student Name': c.studentName || '',
        'Matric ID': c.studentMatric || '',
        'Lecturer Name': c.lecturerName || '',
        'School': c.schoolName || '',
        'Purpose': c.reason || '',
        'Mode': c.consultationMode || '',
        'Attendance Status': this.formatStatus(c.status) || '',
      };
    });

    const pivotSheet = XLSX.utils.json_to_sheet(pivotData);
    pivotSheet['!autofilter'] = { ref: `A1:L${pivotData.length + 1}` };
    pivotSheet['!cols'] = [
      { wch: 8 },
      { wch: 38 },
      { wch: 15 },
      { wch: 12 },
      { wch: 14 },
      { wch: 22 },
      { wch: 15 },
      { wch: 22 },
      { wch: 30 },
      { wch: 25 },
      { wch: 14 },
      { wch: 18 },
    ];
    XLSX.utils.book_append_sheet(workbook, pivotSheet, 'Data for Pivot Tables');

    // ============================================================
    // SHEET 3: STATUS & WEEKLY BREAKDOWN TABLES
    // ============================================================
    const summarySheetRows: any[][] = [];
    summarySheetRows.push(['STATUS BREAKDOWN ANALYSIS']);
    summarySheetRows.push(['Status Category', 'Session Count', 'Percentage Ratio']);
    summarySheetRows.push(['Completed', dist?.completedCount ?? 0, `${dist?.completedPercentage ?? 0}%`]);
    summarySheetRows.push(['No-Show', dist?.noShowCount ?? 0, `${dist?.noShowPercentage ?? 0}%`]);
    summarySheetRows.push(['Cancelled / Rejected', dist?.cancelledCount ?? 0, `${dist?.cancelledPercentage ?? 0}%`]);
    summarySheetRows.push(['Pending / In-Review', dist?.pendingCount ?? 0, `${dist?.pendingPercentage ?? 0}%`]);
    summarySheetRows.push(['Total Consultations', data.totalConsultations, '100.0%']);
    summarySheetRows.push([]);

    summarySheetRows.push(['WEEKLY SESSION VOLUME']);
    summarySheetRows.push(['Period Week', 'Total Sessions']);
    this.weeklyTrend.forEach((w) => {
      summarySheetRows.push([w.week, w.count]);
    });

    const summaryBreakdownSheet = XLSX.utils.aoa_to_sheet(summarySheetRows);
    summaryBreakdownSheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
      { s: { r: 7, c: 0 }, e: { r: 7, c: 1 } },
    ];
    summaryBreakdownSheet['!cols'] = [{ wch: 28 }, { wch: 16 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(workbook, summaryBreakdownSheet, 'Summary Breakdown');

    // File download
    const schoolLabel = data.schoolName
      ? data.schoolName.replace(/[^a-zA-Z0-9]/g, '_')
      : 'AllSchools';
    const fileName = `ALCAS_${schoolLabel}_Analytics_${this.reportStartDate}_to_${this.reportEndDate}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  }

  // Backwards-compatibility alias
  exportToCSV(): void {
    this.exportToExcel();
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}
