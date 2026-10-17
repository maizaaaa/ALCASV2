import { Component, OnInit, ChangeDetectorRef, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';
import { SystemSettingsService } from '../../services/system-settings.service';
import { ConsultationService, Consultation } from '../../services/consultation.service';
import { StudentService, StudentClassSchedule } from '../../services/student.service';
import { StudentNotificationService } from '../../services/student-notification.service';

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
export class StudentDashboardComponent implements OnInit, OnDestroy {
  private studentNotificationService = inject(StudentNotificationService, { optional: true });

  studentName = 'Jason Lee';
  currentWeek = '';
  currentWeekOffset = 0; // 0 = current week, +1 = next week, -1 = prev week

  // Define the visible columns for our weekly calendar
  weekDays: string[] = [];
  baseWorkingDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // All student appointments from API
  allAppointments: DashboardAppointment[] = [];
  // Filtered for currently viewed week
  myAppointments: DashboardAppointment[] = [];
  classSchedule: StudentClassSchedule[] = [];

  private weekStart = '';
  private weekEnd = '';
  private subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private consultationService: ConsultationService,
    private studentService: StudentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadWorkingDays();
    this.loadStudentAppointments();
    this.loadStudentClassSchedule();

    // Listen to real-time notification events
    if (this.studentNotificationService) {
      this.subs.add(
        this.studentNotificationService.refresh$.subscribe(() => {
          this.loadStudentAppointments();
        })
      );
    }

    if (typeof window !== 'undefined') {
      const handleWindowRefresh = () => {
        this.loadStudentAppointments();
      };
      window.addEventListener('student-notification-refresh', handleWindowRefresh);
      this.subs.add({
        unsubscribe: () => window.removeEventListener('student-notification-refresh', handleWindowRefresh),
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private loadWorkingDays(): void {
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

        const normalizedDays = [...workingDays]
          .map((day) => day.trim().toUpperCase())
          .filter((day) => dayOrder.includes(day))
          .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

        if (normalizedDays.length > 0) {
          this.baseWorkingDays = normalizedDays.map(
            (day) => day.charAt(0) + day.slice(1).toLowerCase(),
          );
        }

        this.updateWeekRange();
        this.updateVisibleDays();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load working days:', error);
        this.updateWeekRange();
        this.updateVisibleDays();
      },
    });
  }

  updateWeekRange(): void {
    const today = new Date();

    // Shift date by currentWeekOffset weeks
    const refDate = new Date(today);
    refDate.setDate(today.getDate() + this.currentWeekOffset * 7);

    const dayNumber = refDate.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat

    // If baseWorkingDays starts with Sunday (e.g. Kedah/UUM), week starts on Sunday (0).
    // Otherwise week starts on Monday (1).
    const startsOnSunday =
      this.baseWorkingDays.length > 0 &&
      this.baseWorkingDays[0].toLowerCase() === 'sunday';
    const firstDayIndex = startsOnSunday ? 0 : 1;

    const daysSinceStart = (dayNumber - firstDayIndex + 7) % 7;

    const firstDay = new Date(refDate);
    firstDay.setDate(refDate.getDate() - daysSinceStart);
    firstDay.setHours(0, 0, 0, 0);

    // Full 7-day span for the week so Sunday / Saturday sessions are never cut off
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);
    lastDay.setHours(23, 59, 59, 999);

    this.weekStart = this.toDateString(firstDay);
    this.weekEnd = this.toDateString(lastDay);

    this.currentWeek = `${this.formatWeekDate(firstDay)} - ${this.formatWeekDate(lastDay)}`;

    this.filterAppointmentsForCurrentWeek();
  }

  previousWeek(): void {
    this.currentWeekOffset--;
    this.updateWeekRange();
    this.updateVisibleDays();
    this.cdr.detectChanges();
  }

  nextWeek(): void {
    this.currentWeekOffset++;
    this.updateWeekRange();
    this.updateVisibleDays();
    this.cdr.detectChanges();
  }

  goToCurrentWeek(): void {
    this.currentWeekOffset = 0;
    this.updateWeekRange();
    this.updateVisibleDays();
    this.cdr.detectChanges();
  }

  private filterAppointmentsForCurrentWeek(): void {
    if (!this.weekStart || !this.weekEnd) {
      this.myAppointments = [...this.allAppointments];
    } else {
      this.myAppointments = this.allAppointments.filter(
        (appt) => appt.date >= this.weekStart && appt.date <= this.weekEnd,
      );
    }
  }

  private updateVisibleDays(): void {
    const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const activeDaysSet = new Set<string>();

    // Always include configured base working days
    this.baseWorkingDays.forEach((d) => activeDaysSet.add(d.toLowerCase()));

    // Dynamically include any day that has scheduled appointments or class slots
    this.myAppointments.forEach((a) => {
      if (a.day) activeDaysSet.add(a.day.toLowerCase());
    });
    this.classSchedule.forEach((c) => {
      if (c.dayOfWeek) activeDaysSet.add(c.dayOfWeek.toLowerCase());
    });

    this.weekDays = dayOrder.filter((d) => activeDaysSet.has(d.toLowerCase()));

    if (this.weekDays.length === 0) {
      this.weekDays = [...this.baseWorkingDays];
    }
  }

  private loadStudentAppointments(): void {
    this.consultationService.getStudentConsultations().subscribe({
      next: (consultations: Consultation[]) => {
        this.allAppointments = (consultations || [])
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
          .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));

        this.filterAppointmentsForCurrentWeek();
        this.updateVisibleDays();
        this.cdr.detectChanges();
        console.log('Student dashboard loaded appointments:', this.myAppointments);
      },
      error: (error) => {
        console.error('Failed to load student consultations:', error);
      },
    });
  }

  private loadStudentClassSchedule(): void {
    this.studentService.getMySchedule().subscribe({
      next: (schedule: StudentClassSchedule[]) => {
        this.classSchedule = schedule || [];
        this.updateVisibleDays();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load student class schedule:', error);
      },
    });
  }

  getClassScheduleForDay(day: string): StudentClassSchedule[] {
    if (!day) return [];
    return this.classSchedule.filter(
      (slot) => slot.dayOfWeek?.toLowerCase() === day.toLowerCase(),
    );
  }

  getAppointmentsForDay(day: string): DashboardAppointment[] {
    if (!day) return [];
    return this.myAppointments.filter(
      (appt) => appt.day?.toLowerCase() === day.toLowerCase(),
    );
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
    if (!time) return Number.MAX_SAFE_INTEGER;
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
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  private formatTime(timeString: string): string {
    if (!timeString) return '';
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

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}
