import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Appointment {
  id: string;
  student: string;
  studentMatric: string;
  matric?: string;
  lecturer: string;
  school: string;
  date: string;
  time: string;
  type: string;
  mode: 'In-Person' | 'Online (Webex)' | string;
  reason: string;
  location: string;
  remarks?: string;
  status: 'PENDING' | 'UPCOMING' | 'CONFIRMED' | 'COMPLETED' | 'NO-SHOW' | 'REJECTED' | 'CANCELLED';
  meetingUrl?: string;
  updatedAt?: string;
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  // PENDING REQUESTS
  {
    id: 'REQ-01',
    student: 'Siti Nurhaliza',
    studentMatric: 'S12347',
    matric: 'S12347',
    lecturer: 'Dr. Ahmad Fauzi',
    school: 'School of Computing & IT',
    date: '2026-05-10',
    time: '10:00 AM',
    type: 'FYP Advising',
    mode: 'In-Person',
    reason: 'I need you to check my Chapter 1 methodology draft before submission.',
    location: 'To be assigned upon approval',
    status: 'PENDING',
  },
  {
    id: 'REQ-02',
    student: 'Muthu Kumar',
    studentMatric: 'S12348',
    matric: 'S12348',
    lecturer: 'Dr. Ahmad Fauzi',
    school: 'School of Computing & IT',
    date: '2026-05-12',
    time: '03:00 PM',
    type: 'General Consultation',
    mode: 'Online (Webex)',
    reason: "I am struggling to understand the pointers concept from yesterday's lecture.",
    location: 'Webex Virtual Room (Pending Link)',
    meetingUrl: 'https://university.webex.com/meet/ahmad.fauzi',
    status: 'PENDING',
  },

  // UPCOMING SESSIONS
  {
    id: 'APT-99',
    student: 'Nur Amirah',
    studentMatric: 'S12345',
    matric: 'S12345',
    lecturer: 'Dr. Ahmad Fauzi',
    school: 'School of Computing & IT',
    date: '2026-05-08',
    time: '09:00 AM',
    type: 'FYP Advising',
    mode: 'In-Person',
    reason: 'System architecture review and Chapter 2 ER Diagram inspection.',
    location: 'Block A, Room BK-34',
    remarks: 'Please print out your latest ER diagram draft.',
    status: 'UPCOMING',
  },
  {
    id: 'APT-100',
    student: 'Jason Lee',
    studentMatric: 'S12346',
    matric: 'S12346',
    lecturer: 'Dr. Ahmad Fauzi',
    school: 'School of Computing & IT',
    date: '2026-05-08',
    time: '02:30 PM',
    type: 'General Consultation',
    mode: 'Online (Webex)',
    reason: 'Career advice regarding software engineering internships and course path.',
    location: 'Webex Virtual Room',
    meetingUrl: 'https://university.webex.com/meet/ahmad.fauzi',
    status: 'UPCOMING',
  },

  // RICH CONSULTATION HISTORY (COMPLETED, REJECTED, CANCELLED, NO-SHOW)
  {
    id: 'APT-088',
    student: 'Jason Lee',
    studentMatric: 'S12346',
    matric: 'S12346',
    lecturer: 'Dr. Ramesh',
    school: 'School of Computing & IT',
    date: '2026-04-28',
    time: '10:00 AM',
    type: 'Exam Review',
    mode: 'In-Person',
    reason: 'Data Structures & Algorithms mid-term paper review and code optimization.',
    location: 'Lecturer Office BK-02',
    remarks: 'Diagrams look good. Advised him to proceed to Chapter 4 methodology.',
    status: 'COMPLETED',
  },
  {
    id: 'APT-085',
    student: 'Nur Amirah',
    studentMatric: 'S12345',
    matric: 'S12345',
    lecturer: 'Dr. Ahmad Fauzi',
    school: 'School of Computing & IT',
    date: '2026-04-25',
    time: '02:00 PM',
    type: 'General Consultation',
    mode: 'In-Person',
    reason: 'Need help understanding the assignment requirements for Software Architecture.',
    location: 'Block A, Room BK-34',
    remarks: 'Explained the grading rubric. Student understands the task now.',
    status: 'COMPLETED',
  },
  {
    id: 'APT-082',
    student: 'Siti Nurhaliza',
    studentMatric: 'S12347',
    matric: 'S12347',
    lecturer: 'Prof. Sarah Tan',
    school: 'School of Business & IT',
    date: '2026-04-22',
    time: '02:30 PM',
    type: 'Career Advice',
    mode: 'In-Person',
    reason: 'Consultation regarding IT Management & Entrepreneurship minor subject requirements.',
    location: 'Lecturer Office BK-08',
    remarks: 'Provided elective course roadmap and prerequisites overview.',
    status: 'COMPLETED',
  },
  {
    id: 'APT-080',
    student: 'Siti Nurhaliza',
    studentMatric: 'S12347',
    matric: 'S12347',
    lecturer: 'Mdm. Aisyah',
    school: 'School of Multimedia',
    date: '2026-04-15',
    time: '11:00 AM',
    type: 'Project Discussion',
    mode: 'Online (Webex)',
    reason: 'UX Design prototype inspection for mobile app design assignment.',
    location: 'Lab 2 (Multimedia)',
    remarks: 'Cancelled by student 24 hours prior due to timetable clash with lab test.',
    status: 'CANCELLED',
  },
  {
    id: 'APT-078',
    student: 'Siti Nurhaliza',
    studentMatric: 'S12347',
    matric: 'S12347',
    lecturer: 'Dr. Ahmad Fauzi',
    school: 'School of Computing & IT',
    date: '2026-04-05',
    time: '03:00 PM',
    type: 'FYP Advising',
    mode: 'In-Person',
    reason: 'Initial topic proposal for Blockchain Smart Contracts in Healthcare.',
    location: 'Block A, Room BK-34',
    remarks: 'Declined because supervision quota for this semester is full.',
    status: 'REJECTED',
  },
  {
    id: 'APT-075',
    student: 'Muthu Kumar',
    studentMatric: 'S12348',
    matric: 'S12348',
    lecturer: 'Dr. Ramesh',
    school: 'School of Computing & IT',
    date: '2026-04-02',
    time: '11:30 AM',
    type: 'General Consultation',
    mode: 'Online (Webex)',
    reason: 'Pointers memory allocation debugging.',
    location: 'Webex Virtual Room',
    remarks: 'Waited 15 minutes. Student did not join Webex online session.',
    status: 'NO-SHOW',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private STORAGE_KEY = 'alcas_appointments_v2';
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  public appointments$: Observable<Appointment[]> = this.appointmentsSubject.asObservable();

  constructor() {
    this.loadAppointments();
  }

  private loadAppointments() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= 6) {
            this.appointmentsSubject.next(parsed);
            return;
          }
        } catch (e) {
          console.error('Failed to parse stored appointments:', e);
        }
      }
    }
    // Default fallback initial dataset
    this.appointmentsSubject.next(INITIAL_APPOINTMENTS);
    this.saveAppointments(INITIAL_APPOINTMENTS);
  }

  private saveAppointments(appts: Appointment[]) {
    this.appointmentsSubject.next(appts);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(appts));
    }
  }

  public getAppointments(): Appointment[] {
    return this.appointmentsSubject.getValue();
  }

  public approveAppointment(id: string, room: string, remarks?: string): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      appts[idx] = {
        ...appts[idx],
        status: 'UPCOMING',
        location: room.trim(),
        remarks: remarks ? remarks.trim() : appts[idx].remarks,
        updatedAt: new Date().toISOString(),
      };
      this.saveAppointments(appts);
      return appts[idx];
    }
    return null;
  }

  public rejectAppointment(id: string, reason: string): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      appts[idx] = {
        ...appts[idx],
        status: 'REJECTED',
        remarks: reason ? reason.trim() : appts[idx].remarks,
        updatedAt: new Date().toISOString(),
      };
      this.saveAppointments(appts);
      return appts[idx];
    }
    return null;
  }

  public completeAppointment(id: string, notes?: string): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      appts[idx] = {
        ...appts[idx],
        status: 'COMPLETED',
        remarks: notes ? notes.trim() : appts[idx].remarks,
        updatedAt: new Date().toISOString(),
      };
      this.saveAppointments(appts);
      return appts[idx];
    }
    return null;
  }

  public markNoShow(id: string, notes?: string): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      appts[idx] = {
        ...appts[idx],
        status: 'NO-SHOW',
        remarks: notes ? notes.trim() : appts[idx].remarks,
        updatedAt: new Date().toISOString(),
      };
      this.saveAppointments(appts);
      return appts[idx];
    }
    return null;
  }

  public rescheduleAppointment(id: string, newDate: string, newTime: string, reason: string): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      appts[idx] = {
        ...appts[idx],
        date: newDate,
        time: newTime,
        status: 'PENDING',
        location: 'To be assigned upon approval',
        remarks: `Reschedule requested by student: "${reason}"`,
        updatedAt: new Date().toISOString(),
      };
      this.saveAppointments(appts);
      return appts[idx];
    }
    return null;
  }

  public cancelAppointment(id: string, reason: string): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      appts[idx] = {
        ...appts[idx],
        status: 'CANCELLED',
        remarks: `Cancelled by student: "${reason}"`,
        updatedAt: new Date().toISOString(),
      };
      this.saveAppointments(appts);
      return appts[idx];
    }
    return null;
  }
}
