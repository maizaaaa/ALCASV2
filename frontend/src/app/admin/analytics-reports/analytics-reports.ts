import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

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
  selectedDepartment: string = 'ALL';

  isGenerating = false;
  reportGenerated = false;

  // Just Mock Data for the Generated Report
  reportData = {
    totalConsultations: 0,
    completionRate: '0%',
    mostActiveLecturer: '-',
    peakDay: '-',
  };

  // 3. Just Mock Chart Data (For Pure CSS Bar Chart)
  weeklyTrend = [
    { week: 'Week 1', count: 45, height: '45%' },
    { week: 'Week 2', count: 60, height: '60%' },
    { week: 'Week 3', count: 85, height: '85%' },
    { week: 'Week 4', count: 50, height: '50%' },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Set default dates to current month
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.reportStartDate = firstDay.toISOString().split('T')[0];
    this.reportEndDate = today.toISOString().split('T')[0];
  }

  generateReport() {
    if (!this.reportStartDate || !this.reportEndDate) {
      alert('Please select a valid date range.');
      return;
    }

    this.isGenerating = true;
    this.reportGenerated = false;

    // Simulate database aggregation delay
    setTimeout(() => {
      this.isGenerating = false;
      this.reportGenerated = true;

      // Populate mock data based on the "query"
      this.reportData = {
        totalConsultations: 342,
        completionRate: '88.5%',
        mostActiveLecturer: 'Dr. Ahmad Fauzi (42 sessions)',
        peakDay: 'Wednesday (35% of bookings)',
      };
    }, 1200);
  }

  exportToPDF() {
    alert(
      `Exporting comprehensive PDF report from ${this.reportStartDate} to ${this.reportEndDate}...`,
    );
  }

  exportToCSV() {
    alert(`Exporting raw data to CSV...`);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
