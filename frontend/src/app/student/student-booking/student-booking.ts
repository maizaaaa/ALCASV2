import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';
import { SystemSettingsService } from '../../services/system-settings.service';
import { StudentService, StudentClassSchedule } from '../../services/student.service';
import { StudentNotificationService } from '../../services/student-notification.service';

interface School {
  id: number;
  name: string;
}

interface Program {
  id: number;
  name: string;
}

interface Lecturer {
  id: number;
  name: string;
  school: string;
}

interface BlockOutDate {
  id: number;
  lecturerId: number;
  blockDate: string;
  reason: string;
}

@Component({
  selector: 'app-student-booking',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarStudent],
  templateUrl: './student-booking.html',
})
export class StudentBookingComponent implements OnInit {
  private studentNotificationService = inject(StudentNotificationService, { optional: true });

  studentName = 'Jason Lee';
  currentStudentId: number | null = null;
  studentSchedule: StudentClassSchedule[] = [];
  isLoadingStudentSchedule = false;

  // Clash with Class Time Modal State
  showClashModal = false;
  clashSlotTime = '';
  clashClassInfo: {
    dayOfWeek: string;
    timeSlot: string;
    category: string;
  } | null = null;
  clashMessage = '';

  // --- CALENDAR STATE ---
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  workingDays: string[] = [];
  blockOutDates: BlockOutDate[] = [];

  // Academic Calendar & Global Block-Out Dates
  semesterName = '';
  semesterStart: string | null = null;
  semesterEnd: string | null = null;
  globalBlockOutDates: { date: string; reason: string }[] = [];

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonthIndex = this.currentDate.getMonth();

  currentMonth = '';
  emptyDays: number[] = [];
  daysInMonth: number[] = [];

  today = new Date();

  updateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonthIndex, 1);

    const lastDayOfMonth = new Date(this.currentYear, this.currentMonthIndex + 1, 0);

    this.currentMonth = firstDayOfMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    const startingDay = firstDayOfMonth.getDay();

    this.emptyDays = Array.from({ length: startingDay }, (_, i) => i);

    this.daysInMonth = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);
  }

  previousMonth(): void {
    this.currentMonthIndex--;

    if (this.currentMonthIndex < 0) {
      this.currentMonthIndex = 11;
      this.currentYear--;
    }

    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentMonthIndex++;

    if (this.currentMonthIndex > 11) {
      this.currentMonthIndex = 0;
      this.currentYear++;
    }

    this.updateCalendar();
  }

  isPastDate(day: number): boolean {
    const date = new Date(this.currentYear, this.currentMonthIndex, day);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return date < today;
  }

  // --- BOOKING FORM STATE ---
  isModalOpen = false;
  bookingStep = 1; // 1 = Form, 2 = Review, 3 = Success

  selectedDate: number | null = null;
  selectedDateValue: string | null = null;
  searchQuery = '';

  selectedSchool = 'All Schools';
  schools: School[] = [];
  schoolOptions: string[] = ['All Schools'];

  programs: Program[] = [];
  selectedProgramId: number | null = null;

  selectedLecturerId: number | null = null;
  selectedTime = '';
  reasonForVisit = '';
  otherReasonText = ''; // NEW: Holds the custom reason text
  visitReasons = [
    'FYP Advising',
    'Assignment Help',
    'Exam Review',
    'Career Advice',
    'Project Discussion',
    'Other',
  ];

  allLecturers: Lecturer[] = [];
  availableSlots: string[] = [];
  isLoadingAvailability = false;
  isSubmitting = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private systemSettingsService: SystemSettingsService,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.updateCalendar();
    this.loadSchools();
    this.loadSystemSettings();
    this.loadAllLecturers();
    this.loadStudentProfileAndSchedule();
  }

  loadStudentProfileAndSchedule(): void {
    this.isLoadingStudentSchedule = true;
    this.studentService.getMyProfile().subscribe({
      next: (profile) => {
        if (profile?.fullName) {
          this.studentName = profile.fullName;
        }
        if (profile?.userId) {
          this.currentStudentId = profile.userId;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load student profile for booking:', err);
      },
    });

    this.studentService.getMySchedule().subscribe({
      next: (schedules) => {
        this.isLoadingStudentSchedule = false;
        this.studentSchedule = schedules || [];
        console.log('Student class schedule loaded:', this.studentSchedule);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoadingStudentSchedule = false;
        console.error('Failed to load student schedule for booking:', err);
      },
    });
  }

  loadSystemSettings(): void {
    this.systemSettingsService.getAllSettings().subscribe({
      next: (settings) => {
        const semName = settings.find((s) => s.settingKey === 'SEMESTER_NAME');
        if (semName) this.semesterName = semName.settingValue;

        const semStart = settings.find((s) => s.settingKey === 'SEMESTER_START_DATE');
        if (semStart && semStart.settingValue) this.semesterStart = semStart.settingValue.trim();

        const semEnd = settings.find((s) => s.settingKey === 'SEMESTER_END_DATE');
        if (semEnd && semEnd.settingValue) this.semesterEnd = semEnd.settingValue.trim();

        const workingDaysSetting = settings.find((s) => s.settingKey === 'WORKING_DAYS');
        if (workingDaysSetting && workingDaysSetting.settingValue) {
          this.workingDays = workingDaysSetting.settingValue
            .split(',')
            .map((day) => day.trim())
            .filter((day) => day.length > 0);
        }

        const blockOutSetting = settings.find((s) => s.settingKey === 'GLOBAL_BLOCK_OUT_DATES');
        if (blockOutSetting && blockOutSetting.settingValue) {
          try {
            this.globalBlockOutDates = JSON.parse(blockOutSetting.settingValue);
          } catch {
            this.globalBlockOutDates = [];
          }
        }

        console.log('System settings loaded in Student Booking:', {
          semesterName: this.semesterName,
          semesterStart: this.semesterStart,
          semesterEnd: this.semesterEnd,
          workingDays: this.workingDays,
          globalBlockOutDates: this.globalBlockOutDates,
        });

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load system settings for Student Booking:', error);
      },
    });
  }

  loadAllLecturers(): void {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    this.http.get<Lecturer[]>('http://localhost:8080/api/lecturers', { headers }).subscribe({
      next: (lecturers) => {
        this.allLecturers = lecturers;
        console.log('All lecturers loaded:', lecturers);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load all lecturers:', error);
        this.allLecturers = [];
      },
    });
  }

  getDateString(day: number): string {
    return `${this.currentYear}-${String(this.currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  isWithinAcademicPeriod(day: number): boolean {
    if (!this.semesterStart && !this.semesterEnd) {
      return true;
    }
    const dateStr = this.getDateString(day);
    if (this.semesterStart && dateStr < this.semesterStart) {
      return false;
    }
    if (this.semesterEnd && dateStr > this.semesterEnd) {
      return false;
    }
    return true;
  }

  getGlobalBlockOut(day: number): { date: string; reason: string } | undefined {
    const dateStr = this.getDateString(day);
    return this.globalBlockOutDates.find((b) => b.date === dateStr);
  }

  isGlobalBlockOutDate(day: number): boolean {
    return !!this.getGlobalBlockOut(day);
  }

  isDateAvailableForBooking(day: number): boolean {
    if (this.isPastDate(day)) return false;
    if (!this.isWithinAcademicPeriod(day)) return false;
    if (this.isGlobalBlockOutDate(day)) return false;
    if (!this.isWorkingDay(day)) return false;
    return true;
  }

  isWorkingDay(day: number): boolean {
    const date = new Date(this.currentYear, this.currentMonthIndex, day);

    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    const dayName = dayNames[date.getDay()];

    return this.workingDays.includes(dayName);
  }

  isBlockOutDate(day: number): boolean {
    if (!this.selectedLecturerId) {
      return false;
    }

    const date = `${this.currentYear}-${String(this.currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return this.blockOutDates.some((blockOutDate) => blockOutDate.blockDate === date);
  }

  loadSchools(): void {
    this.http.get<School[]>('http://localhost:8080/api/schools').subscribe({
      next: (schools) => {
        this.schools = schools;

        this.schoolOptions = ['All Schools', ...schools.map((school) => school.name)];

        console.log('Schools loaded:', schools);
      },

      error: (error) => {
        console.error('Failed to load schools:', error);
      },
    });
  }

  loadBlockOutDates(lecturerId: number): void {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    this.http
      .get<
        BlockOutDate[]
      >(`http://localhost:8080/api/block-out-dates/lecturer/${lecturerId}`, { headers })
      .subscribe({
        next: (blockOutDates) => {
          this.blockOutDates = blockOutDates;

          console.log('Block-out dates loaded for lecturer:', lecturerId, this.blockOutDates);

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Failed to load block-out dates:', error);

          this.blockOutDates = [];
        },
      });
  }

  loadPrograms(schoolId: number): void {
    this.http.get<Program[]>(`http://localhost:8080/api/programs/school/${schoolId}`).subscribe({
      next: (programs) => {
        this.programs = programs;

        console.log('Programs loaded:', programs);
      },

      error: (error) => {
        console.error('Failed to load programs:', error);
      },
    });
  }

  onSchoolChange(): void {
    if (this.selectedSchool === 'All Schools') {
      this.loadAllLecturers();
      return;
    }

    const selectedSchool = this.schools.find((school) => school.name === this.selectedSchool);

    if (!selectedSchool) {
      this.allLecturers = [];
      return;
    }

    this.loadLecturers(selectedSchool.id);
  }

  loadLecturers(schoolId: number): void {
    this.http.get<Lecturer[]>(`http://localhost:8080/api/lecturers/school/${schoolId}`).subscribe({
      next: (lecturers) => {
        this.allLecturers = lecturers;

        console.log('Lecturers loaded:', lecturers);
      },

      error: (error) => {
        console.error('Failed to load lecturers:', error);

        this.allLecturers = [];
      },
    });
  }

  // --- FUNCTIONS ---

  openDateForm(day: number): void {
    if (!this.isDateAvailableForBooking(day)) {
      return;
    }

    this.selectedDate = day;

    this.selectedDateValue = this.getDateString(day);

    this.isModalOpen = true;
    this.bookingStep = 1;
    this.resetForm();
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedDate = null;
    this.selectedDateValue = null;
  }

  resetForm() {
    this.searchQuery = '';
    this.selectedSchool = 'All Schools';
    this.selectedLecturerId = null;
    this.selectedTime = '';
    this.reasonForVisit = '';
    this.otherReasonText = '';
    this.otherReasonText = '';
  }

  get filteredLecturers() {
    return this.allLecturers.filter((l) => {
      const matchesSearch = l.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesSchool =
        this.selectedSchool === 'All Schools' || l.school === this.selectedSchool;
      return matchesSearch && matchesSchool;
    });
  }

  get currentLecturerSlots() {
    return this.availableSlots;
  }

  get formattedSelectedDate(): string {
    if (!this.selectedDateValue) {
      return '';
    }

    const date = new Date(`${this.selectedDateValue}T00:00:00`);

    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  // Helper to get the name for the Review screen
  get selectedLecturerName() {
    return this.allLecturers.find((l) => l.id === this.selectedLecturerId)?.name;
  }

  // Helper to get the school for the Review screen and Profile Card
  get selectedLecturerSchool() {
    return this.allLecturers.find((l) => l.id === this.selectedLecturerId)?.school;
  }

  // When a user clicks a lecturer from the search list
  selectLecturer(id: number) {
    this.selectedLecturerId = id;
    this.selectedTime = '';
    this.availableSlots = [];
    this.isLoadingAvailability = true;

    // Load block-out dates for the selected lecturer
    this.loadBlockOutDates(id);

    if (!this.selectedDateValue) {
      console.error('No date selected.');
      this.isLoadingAvailability = false;
      return;
    }

    this.loadLecturerAvailability(id, this.selectedDateValue);
  }

  loadLecturerAvailability(lecturerId: number, date: string): void {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    this.http
      .get<{
        lecturerId: number;
        date: string;
        dayOfWeek: string;
        availableSlots: string[];
      }>(`http://localhost:8080/api/lecturer-availability?lecturerId=${lecturerId}&date=${date}`, {
        headers,
      })
      .subscribe({
        next: (response) => {
          console.log('Lecturer availability response:', response);

          this.availableSlots = response.availableSlots;

          // Request has finished
          this.isLoadingAvailability = false;

          console.log('Available slots:', this.availableSlots);
          console.log('isLoadingAvailability:', this.isLoadingAvailability);

          // Force Angular to update the interface
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error('Failed to load lecturer availability:', error);

          this.availableSlots = [];

          // Stop loading even if request fails
          this.isLoadingAvailability = false;

          // Force Angular to update the interface
          this.cdr.detectChanges();
        },
      });
  }

  // When a user wants to change their selected lecturer
  clearLecturer() {
    this.selectedLecturerId = null;
    this.selectedTime = '';
    this.searchQuery = ''; // Clear search so they can start fresh
  }

  // Helper to convert time strings (e.g., '08:30 AM', '14:00') into total minutes from midnight
  timeToMinutes(time: string): number {
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

  // Returns the scheduled class that clashes with the chosen consultation slot, if any
  getClashingClassForSlot(slotTime: string): StudentClassSchedule | undefined {
    if (!slotTime || !this.selectedDateValue || !this.studentSchedule.length) {
      return undefined;
    }

    const [year, month, day] = this.selectedDateValue.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDayName = dayNames[date.getDay()].toLowerCase();

    const consultStart = this.timeToMinutes(slotTime);
    const consultEnd = consultStart + 30; // Consultation slot duration is 30 mins

    return this.studentSchedule.find((cls) => {
      if (!cls.dayOfWeek || cls.dayOfWeek.toLowerCase() !== selectedDayName) {
        return false;
      }

      const classStart = this.timeToMinutes(cls.timeSlot);
      const classEnd = classStart + 60; // Class duration on timetable is 1 hour

      return consultStart < classEnd && consultEnd > classStart;
    });
  }

  isSlotClashing(slotTime: string): boolean {
    return !!this.getClashingClassForSlot(slotTime);
  }

  onTimeSelected(slotTime: string): void {
    if (!slotTime) return;

    const clash = this.getClashingClassForSlot(slotTime);
    if (clash) {
      this.triggerClashPopup(slotTime, clash);
      this.selectedTime = '';
      this.cdr.detectChanges();
      return;
    }

    this.selectedTime = slotTime;
  }

  triggerClashPopup(slotTime: string, clash?: StudentClassSchedule): void {
    const clashingClass = clash || this.getClashingClassForSlot(slotTime);
    this.clashSlotTime = slotTime;

    if (clashingClass) {
      this.clashClassInfo = {
        dayOfWeek: clashingClass.dayOfWeek,
        timeSlot: clashingClass.timeSlot,
        category: clashingClass.category || 'Class',
      };
      this.clashMessage = `You cannot book this slot because it clashes with your class schedule on ${clashingClass.dayOfWeek} at ${clashingClass.timeSlot} (${clashingClass.category || 'Class'}).`;
    } else {
      this.clashClassInfo = null;
      this.clashMessage = `You cannot book this consultation session because it clashes with your class schedule.`;
    }

    this.showClashModal = true;
    this.cdr.detectChanges();
  }

  closeClashModal(): void {
    this.showClashModal = false;
    this.clashSlotTime = '';
    this.clashClassInfo = null;
    this.clashMessage = '';
    this.selectedTime = '';
    this.cdr.detectChanges();
  }

  // Step 1 -> Step 2
  goToReview() {
    if (!this.selectedLecturerId || !this.selectedTime || !this.reasonForVisit) {
      alert('Please fill in all required fields.');
      return;
    }

    // Verify no clash with student class schedule
    const clash = this.getClashingClassForSlot(this.selectedTime);
    if (clash) {
      this.triggerClashPopup(this.selectedTime, clash);
      this.selectedTime = '';
      return;
    }

    if (this.reasonForVisit === 'Other' && !this.otherReasonText.trim()) {
      alert('Please specify your reason in the text box.');
      return;
    }

    this.bookingStep = 2; // Move to Review Screen
  }

  // Step 2 -> Step 1
  goBackToForm() {
    this.bookingStep = 1;
  }

  confirmAndSubmit() {
    if (
      !this.selectedLecturerId ||
      !this.selectedDateValue ||
      !this.selectedTime ||
      !this.reasonForVisit
    ) {
      alert('Please complete all required booking details.');
      return;
    }

    // Double check clash before sending
    const clash = this.getClashingClassForSlot(this.selectedTime);
    if (clash) {
      this.triggerClashPopup(this.selectedTime, clash);
      this.bookingStep = 1;
      this.selectedTime = '';
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const time24Hour = this.convertTimeTo24Hour(this.selectedTime);

    const studentIdParam = this.currentStudentId ? this.currentStudentId.toString() : '2';

    const params = new HttpParams()
      .set('studentId', studentIdParam)
      .set('lecturerId', this.selectedLecturerId.toString())
      .set('date', this.selectedDateValue)
      .set('time', time24Hour)
      .set('reason', this.reasonForVisit)
      .set('reasonDetails', this.otherReasonText || '');

    this.http.post('http://localhost:8080/api/consultations', {}, { params }).subscribe({
      next: (response) => {
        console.log('Consultation created:', response);

        this.bookingStep = 3;
        this.isSubmitting = false;

        // Safely trigger real-time notifications refresh and live toast
        try {
          if (this.studentNotificationService) {
            this.studentNotificationService.triggerRefresh();
            this.studentNotificationService.showToast(
              'Booking Submitted Successfully',
              `Your consultation on ${this.selectedDateValue} at ${this.selectedTime} has been submitted!`,
              'success'
            );
          }
        } catch (notifErr) {
          console.warn('Could not trigger notification toast:', notifErr);
        }

        this.cdr.detectChanges();

        console.log('bookingStep is now:', this.bookingStep);
      },

      error: (error) => {
        console.error('Failed to create consultation:', error);

        this.isSubmitting = false;

        const errorMsg = error.error?.message || '';
        if (errorMsg.toLowerCase().includes('clash with class') || errorMsg.toLowerCase().includes('class schedule')) {
          this.triggerClashPopup(this.selectedTime);
          this.bookingStep = 1;
          this.selectedTime = '';
        } else if (error.status === 409) {
          alert(errorMsg || 'This time slot is already booked. Please choose another time.');
        } else if (error.status === 403) {
          alert('Your session has expired. Please log in again.');
        } else {
          alert('Failed to create booking. Please try again.');
        }
        this.cdr.detectChanges();
      },
    });
  }

  convertTimeTo24Hour(time: string): string {
    const [timePart, period] = time.split(' ');

    let [hours, minutes] = timePart.split(':').map(Number);

    if (period.toLowerCase() === 'pm' && hours !== 12) {
      hours += 12;
    }

    if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
