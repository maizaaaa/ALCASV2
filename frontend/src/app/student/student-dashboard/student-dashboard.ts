import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';
import { SystemSettingsService } from '../../services/system-settings.service';
import { ConsultationService, Consultation } from '../../services/consultation.service';
import { StudentService, StudentClassSchedule } from '../../services/student.service';

interface DashboardAppointment {
  id: string;
  date: string;
  day: string;
  time: string;
  lecturer: string;
  type: string;
  status: string;
}

interface DashboardScheduleItem {
  kind: 'appointment' | 'class';
  time: string;
  sortMinutes: number;
  title: string;
  description: string;
  status?: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarStudent],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css'],
})
export class StudentDashboardComponent implements OnInit {
  studentName = 'Jason Lee';
  currentWeek = 'May 8 - May 12, 2026';

  // Define the days for our weekly calendar
  weekDays: string[] = [];

  // Student Appointments
  myAppointments: DashboardAppointment[] = [];
  classSchedule: StudentClassSchedule[] = [];

  private weekStart = '';
  private weekEnd = '';

  constructor(
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private consultationService: ConsultationService,
    private studentService: StudentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Calculate the current week: Monday to Sunday
    const today = new Date();
    const monday = new Date(today);
    const dayOfWeek = today.getDay();

    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    this.weekStart = this.toDateString(monday);
    this.weekEnd = this.toDateString(sunday);

    this.currentWeek = `${this.formatWeekDate(monday)} - ${this.formatWeekDate(sunday)}`;

    // Load the admin's working days
    this.systemSettingsService.getWorkingDays().subscribe({
      next: (workingDays) => {
        const dayOrder = [
          'SUNDAY',
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
        ];

        this.weekDays = [...workingDays]
          .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
          .map((day) => day.charAt(0) + day.slice(1).toLowerCase());

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load working days:', error);
      },
    });

    // Load the logged-in student's consultations
    this.loadStudentAppointments();
    this.loadStudentClassSchedule();
  }

  private loadStudentAppointments(): void {
    this.consultationService.getStudentConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        this.myAppointments = consultations
          .filter((consultation) =>
            ['CONFIRMED', 'PENDING'].includes((consultation.status || '').toUpperCase()),
          )
          .map((consultation) => ({
            id: consultation.id,
            date: consultation.scheduledDate,
            day: this.getDayName(consultation.scheduledDate),
            time: this.formatTime(consultation.scheduledTime),
            lecturer: consultation.lecturerName,
            type: consultation.reasonDetails || consultation.reason,
            status: consultation.status.toUpperCase(),
          }))
          .filter((appt) => appt.date >= this.weekStart && appt.date <= this.weekEnd)
          .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));

        this.cdr.detectChanges();
        console.log('Student dashboard appointments:', this.myAppointments);
      },
      error: (error) => {
        console.error('Failed to load student consultations:', error);
      },
    });
  }

  private loadStudentClassSchedule(): void {
    this.studentService.getMySchedule().subscribe({
      next: (schedule: StudentClassSchedule[]) => {
        this.classSchedule = schedule;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load student class schedule:', error);
      },
    });
  }

  getClassScheduleForDay(day: string): StudentClassSchedule[] {
    return this.classSchedule.filter((slot) => slot.dayOfWeek?.toLowerCase() === day.toLowerCase());
  }

  getAppointmentsForDay(day: string): DashboardAppointment[] {
    return this.myAppointments.filter((appt) => appt.day === day);
  }

  getScheduleItemsForDay(day: string): DashboardScheduleItem[] {
    const appointments: DashboardScheduleItem[] = this.getAppointmentsForDay(day).map((appt) => ({
      kind: 'appointment',
      time: appt.time,
      sortMinutes: this.timeToMinutes(appt.time),
      title: appt.lecturer,
      description: appt.type,
      status: appt.status,
    }));

    const classes: DashboardScheduleItem[] = this.getClassScheduleForDay(day).map((slot) => ({
      kind: 'class',
      time: slot.timeSlot,
      sortMinutes: this.timeToMinutes(slot.timeSlot),
      title: slot.category,
      description: 'Class Schedule',
    }));

    return [...classes, ...appointments].sort((a, b) => a.sortMinutes - b.sortMinutes);
  }

  private timeToMinutes(time: string): number {
    const match = time
      .trim()
      .toUpperCase()
      .match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?$/);

    if (!match) {
      return Number.MAX_SAFE_INTEGER;
    }

    let hours = Number(match[1]);
    const minutes = Number(match[2]);
    const period = match[3];

    if (period === 'AM' && hours === 12) {
      hours = 0;
    } else if (period === 'PM' && hours !== 12) {
      hours += 12;
    }

    return hours * 60 + minutes;
  }

  private getDayName(dateString: string): string {
    const [year, month, day] = dateString.split('-').map(Number);

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  private formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':').map(Number);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  private toDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private formatWeekDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
