import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';

@Component({
  selector: 'app-lecturer-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarLect],
  templateUrl: './lecturer-schedule.html',
  styleUrls: ['./lecturer-schedule.css'],
})
export class LecturerScheduleComponent implements OnInit {
  showModal = false;
  isEditing = false;
  editingSlotId: number | null = null;

  slotForm = { day: 'Monday', startTime: '', endTime: '', type: 'AVAILABLE', title: '' };

  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  blockOutDates: any[] = [];

  scheduleData = [
    {
      id: 1,
      day: 'Monday',
      startTime: '09:00 AM',
      endTime: '11:00 AM',
      type: 'CLASS',
      title: 'STIA1123 Programming 1',
    },
    {
      id: 2,
      day: 'Monday',
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      type: 'AVAILABLE',
      title: 'Open Consultation',
    },
    {
      id: 3,
      day: 'Tuesday',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      type: 'AVAILABLE',
      title: 'FYP Advising Only',
    },
    {
      id: 4,
      day: 'Wednesday',
      startTime: '08:00 AM',
      endTime: '01:00 PM',
      type: 'BUSY',
      title: 'Faculty Meeting',
    },
    {
      id: 5,
      day: 'Thursday',
      startTime: '02:30 PM',
      endTime: '04:30 PM',
      type: 'AVAILABLE',
      title: 'Open Consultation',
    },
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadSchedule();
    this.loadBlockOutDates();
  }

  loadSchedule(): void {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any[]>('http://localhost:8080/api/lecturer-availability/schedule/me', {
        headers,
      })
      .subscribe({
        next: (schedules) => {
          this.scheduleData = schedules.map((schedule) => ({
            id: schedule.id,
            day: schedule.dayOfWeek,
            startTime: this.formatToAMPM(schedule.startTime),
            endTime: this.formatToAMPM(schedule.endTime),
            type: schedule.slotType,
            title: schedule.title,
          }));

          console.log('Schedules loaded:', this.scheduleData);

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Failed to load schedules:', error);
        },
      });
  }

  loadBlockOutDates(): void {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any[]>('http://localhost:8080/api/block-out-dates/lecturer/14', {
        headers,
      })
      .subscribe({
        next: (dates) => {
          this.blockOutDates = dates;

          console.log('Block out dates loaded:', this.blockOutDates);

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Failed to load block out dates:', error);
        },
      });
  }

  getSlotsForDay(day: string) {
    return this.scheduleData
      .filter((slot) => slot.day === day)
      .sort((a, b) =>
        this.convertTo24Hour(a.startTime).localeCompare(this.convertTo24Hour(b.startTime)),
      );
  }

  // --- MODAL & EDIT LOGIC ---

  openAddSlotModal() {
    this.isEditing = false;
    this.editingSlotId = null;
    this.slotForm = { day: 'Monday', startTime: '', endTime: '', type: 'AVAILABLE', title: '' };
    this.showModal = true;
  }

  editSlot(slot: any) {
    this.isEditing = true;
    this.editingSlotId = slot.id;
    // We must convert "02:00 PM" back to "14:00" so the HTML <input type="time"> can read it!
    this.slotForm = {
      day: slot.day,
      startTime: this.convertTo24Hour(slot.startTime),
      endTime: this.convertTo24Hour(slot.endTime),
      type: slot.type,
      title: slot.title,
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveSlot() {
    if (!this.slotForm.startTime || !this.slotForm.endTime || !this.slotForm.title) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isEditing) {
      const token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });

      const requestBody = {
        dayOfWeek: this.slotForm.day,
        startTime: this.slotForm.startTime,
        endTime: this.slotForm.endTime,
        slotType: this.slotForm.type,
        title: this.slotForm.title,
      };

      this.http
        .put(
          `http://localhost:8080/api/lecturer-availability/schedule/${this.editingSlotId}`,
          requestBody,
          { headers },
        )
        .subscribe({
          next: () => {
            alert('Schedule updated!');
            this.closeModal();
            this.loadSchedule();
          },
          error: (error) => {
            console.error('Failed to update schedule:', error);
            alert('Failed to update schedule.');
          },
        });

      return;
    }

    // CREATE NEW SCHEDULE
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const requestBody = {
      dayOfWeek: this.slotForm.day,
      startTime: this.slotForm.startTime,
      endTime: this.slotForm.endTime,
      slotType: this.slotForm.type,
      title: this.slotForm.title,
    };

    this.http
      .post(
        'http://localhost:8080/api/lecturer-availability/schedule',
        requestBody,
        { headers },
      )
      .subscribe({
        next: () => {
          alert('Schedule added successfully!');
          this.closeModal();
          this.loadSchedule();
        },
        error: (error) => {
          console.error('Failed to create schedule:', error);
          console.error('Backend response:', error.error);

          alert(
            error?.error?.message ||
            'Failed to create schedule.'
          );
        },
      });
  }

  deleteSlot(id: number) {
    if (confirm('Remove this time slot? Any students booked here will be notified.')) {
      const token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http
        .delete(`http://localhost:8080/api/lecturer-availability/schedule/${id}`, { headers })
        .subscribe({
          next: () => {
            alert('Schedule deleted!');
            this.loadSchedule();
          },
          error: (error) => {
            console.error('Failed to delete schedule:', error);
            alert('Failed to delete schedule.');
          },
        });
    }
  }

  // --- TIME FORMAT HELPERS ---

  // Converts "14:30" -> "02:30 PM"
  formatToAMPM(time24: string): string {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12; // Convert '0' to '12'
    const hStr = h < 10 ? '0' + h : h.toString();
    return `${hStr}:${minutes} ${ampm}`;
  }

  // Converts "02:30 PM" -> "14:30"
  convertTo24Hour(time12: string): string {
    if (!time12 || !time12.includes(' ')) return time12; // fallback if already 24h
    const [time, modifier] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = (parseInt(hours, 10) + 12).toString();
    if (hours.length === 1) hours = '0' + hours;
    return `${hours}:${minutes}`;
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
