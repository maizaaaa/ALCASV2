import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarStudent } from '../../shared/navbar-student/navbar-student';

@Component({
  selector: 'app-student-booking',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarStudent],
  templateUrl: './student-booking.html',
})
export class StudentBookingComponent implements OnInit {
  studentName = 'Jason Lee';

  // --- CALENDAR STATE (May 2026) ---
  currentMonth = 'May 2026';
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  emptyDays = [0, 1, 2, 3, 4];
  daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // --- BOOKING FORM STATE ---
  isModalOpen = false;
  bookingStep = 1; // 1 = Form, 2 = Review, 3 = Success

  selectedDate: number | null = null;
  searchQuery = '';
  selectedSchool = 'All Schools';
  schools = [
    'All Schools',
    'School of Computing (SOC)',
    'School of Business',
    'School of Multimedia',
  ];

  selectedLecturerId = '';
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

  // --- MOCK LECTURER DATA ---
  allLecturers = [
    {
      id: 'L1',
      name: 'Dr. Ahmad Fauzi',
      school: 'School of Computing (SOC)',
      slots: ['10:00 AM', '11:30 AM', '02:00 PM'],
    },
    {
      id: 'L2',
      name: 'Prof. Sarah Tan',
      school: 'School of Business',
      slots: ['09:00 AM', '02:30 PM'],
    },
    {
      id: 'L3',
      name: 'Dr. Ramesh',
      school: 'School of Computing (SOC)',
      slots: ['09:00 AM', '10:00 AM', '04:00 PM'],
    },
    {
      id: 'L4',
      name: 'Mdm. Aisyah',
      school: 'School of Multimedia',
      slots: ['10:00 AM', '11:00 AM'],
    },
  ];

  constructor(private router: Router) { }
  ngOnInit(): void { }

  // --- FUNCTIONS ---

  openDateForm(day: number) {
    this.selectedDate = day;
    this.isModalOpen = true;
    this.bookingStep = 1;
    this.resetForm();
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedDate = null;
  }

  resetForm() {
    this.searchQuery = '';
    this.selectedSchool = 'All Schools';
    this.selectedLecturerId = '';
    this.selectedTime = '';
    this.reasonForVisit = '';
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
    const lecturer = this.allLecturers.find((l) => l.id === this.selectedLecturerId);
    return lecturer ? lecturer.slots : [];
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
  selectLecturer(id: string) {
    this.selectedLecturerId = id;
    this.selectedTime = ''; // Reset time just in case
  }

  // When a user wants to change their selected lecturer
  clearLecturer() {
    this.selectedLecturerId = '';
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
