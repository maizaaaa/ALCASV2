import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';

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

@Component({
  selector: 'app-student-booking',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarStudent],
  templateUrl: './student-booking.html',
})
export class StudentBookingComponent implements OnInit {
  studentName = 'Jason Lee';

  // --- CALENDAR STATE ---
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}
  ngOnInit(): void {
    this.updateCalendar();
    this.loadSchools();
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
    this.selectedDate = day;

    this.selectedDateValue = `${this.currentYear}-${String(this.currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

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

    if (!this.selectedDateValue) {
      console.error('No date selected.');
      return;
    }

    this.loadLecturerAvailability(id, this.selectedDateValue);
  }

  loadLecturerAvailability(lecturerId: number, date: string): void {
    this.http
      .get<{
        lecturerId: number;
        date: string;
        dayOfWeek: string;
        availableSlots: string[];
      }>(`http://localhost:8080/api/lecturer-availability?lecturerId=${lecturerId}&date=${date}`)
      .subscribe({
        next: (response) => {
          this.availableSlots = response.availableSlots;

          console.log('Lecturer availability response:', response);
          console.log('Available slots:', this.availableSlots);
        },

        error: (error) => {
          console.error('Failed to load lecturer availability:', error);

          this.availableSlots = [];
        },
      });
  }

  // When a user wants to change their selected lecturer
  clearLecturer() {
    this.selectedLecturerId = null;
    this.selectedTime = '';
    this.searchQuery = ''; // Clear search so they can start fresh
  }

  // Step 1 -> Step 2
  goToReview() {
    if (!this.selectedLecturerId || !this.selectedTime || !this.reasonForVisit) {
      alert('Please fill in all required fields.');
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

  // Step 2 -> Step 3
  confirmAndSubmit() {
    // Simulate API loading, then show Success
    setTimeout(() => {
      this.bookingStep = 3;
    }, 600);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
