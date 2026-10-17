import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Appointment {
  id: string;
  student: string;
  studentMatric: string;
  matric?: string;
  lecturer: string;
  lecturerId?: number;
  school: string;
  date: string;
  time: string;
  type: string;
  mode: 'In-Person' | 'Online (Webex)' | string;
  reason: string;
  reasonDetails?: string;
  location: string;
  remarks?: string;
  status:
    | 'PENDING'
    | 'UPCOMING'
    | 'CONFIRMED'
    | 'RESCHEDULE_PENDING'
    | 'RESCHEDULE_REQUEST'
    | 'COMPLETED'
    | 'NO-SHOW'
    | 'REJECTED'
    | 'CANCELLED'
    | string;
  rejectReason?: string;
  cancelReason?: string;
  meetingUrl?: string;
  updatedAt?: string;
  proposedDate?: string | null;
  proposedTime?: string | null;
  rescheduleReason?: string | null;
  rescheduleInitiator?: string | null;
  isRescheduleRequest?: boolean;
  selectedMode?: 'In-Person' | 'Online' | string;
  consultationMode?: string;
  locationInput?: string;
  webexInput?: string;
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
    reasonDetails: 'I have completed my Chapter 1 draft on automated attendance tracking and need your feedback before module submission.',
    location: 'To be assigned upon approval',
    status: 'PENDING',
    isRescheduleRequest: false,
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
    reasonDetails: 'Need guidance on pointer arithmetic and memory allocation debugging for assignment 2.',
    location: 'Webex Virtual Room (Pending Link)',
    meetingUrl: 'https://university.webex.com/meet/ahmad.fauzi',
    status: 'PENDING',
    isRescheduleRequest: false,
  },
  {
    id: 'REQ-03',
    student: 'Nur Amirah',
    studentMatric: 'S12345',
    matric: 'S12345',
    lecturer: 'Dr. Ahmad Fauzi',
    school: 'School of Computing & IT',
    date: '2026-05-14',
    time: '10:00 AM',
    type: 'FYP Advising',
    mode: 'In-Person',
    reason: 'System Architecture & ER Diagram Review',
    reasonDetails: 'Review finalized architecture design and relational database schema before coding phase starts.',
    location: 'Block A, Room BK-34',
    status: 'RESCHEDULE_REQUEST',
    isRescheduleRequest: true,
    rescheduleInitiator: 'STUDENT',
    proposedDate: '2026-05-18',
    proposedTime: '02:30 PM',
    rescheduleReason: 'I have an unexpected midterm test clashed at the original slot on May 14th. Requesting to move our consultation to May 18 at 02:30 PM if Dr. Fauzi is free.',
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
];

const DUMMY_HISTORY_IDS = new Set(['APT-088', 'APT-085', 'APT-082', 'APT-080', 'APT-078', 'APT-075']);

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
          let parsed: Appointment[] = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            // Purge any old dummy history records from localStorage
            parsed = parsed.filter((a) => !DUMMY_HISTORY_IDS.has(a.id));

            // Ensure sample reschedule request REQ-03 is present in cached data if needed
            if (!parsed.some((a) => a.id === 'REQ-03')) {
              const req03 = INITIAL_APPOINTMENTS.find((a) => a.id === 'REQ-03');
              if (req03) parsed.unshift(req03);
            }
            this.appointmentsSubject.next(parsed);
            this.saveAppointments(parsed);
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

  public approveAppointment(id: string, room: string, remarks?: string, mode?: string): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      const isOnline =
        (mode && mode.toLowerCase().includes('online')) ||
        room.toLowerCase().includes('http') ||
        room.toLowerCase().includes('webex');
      const resolvedMode = mode || (isOnline ? 'Online (Webex)' : 'In-Person');

      appts[idx] = {
        ...appts[idx],
        status: 'UPCOMING',
        mode: resolvedMode,
        consultationMode: isOnline ? 'ONLINE' : 'IN_PERSON',
        selectedMode: isOnline ? 'Online' : 'In-Person',
        location: room.trim(),
        meetingUrl: isOnline ? room.trim() : undefined,
        remarks: remarks ? remarks.trim() : appts[idx].remarks,
        updatedAt: new Date().toISOString(),
      };
      this.saveAppointments(appts);
      return appts[idx];
    }
    return null;
  }

  public approveReschedule(id: string, room: string, remarks?: string, mode?: string): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      const appt = appts[idx];
      const isOnline =
        (mode && mode.toLowerCase().includes('online')) ||
        room.toLowerCase().includes('http') ||
        room.toLowerCase().includes('webex');
      const resolvedMode = mode || (isOnline ? 'Online (Webex)' : (appt.mode || 'In-Person'));

      appts[idx] = {
        ...appt,
        status: 'UPCOMING',
        date: appt.proposedDate || appt.date,
        time: appt.proposedTime || appt.time,
        mode: resolvedMode,
        consultationMode: isOnline ? 'ONLINE' : 'IN_PERSON',
        selectedMode: isOnline ? 'Online' : 'In-Person',
        location: room ? room.trim() : (appt.location || 'Block A, Room BK-34'),
        meetingUrl: isOnline ? (room ? room.trim() : appt.meetingUrl) : undefined,
        remarks: remarks ? remarks.trim() : appt.remarks,
        isRescheduleRequest: false,
        rescheduleInitiator: undefined,
        proposedDate: undefined,
        proposedTime: undefined,
        updatedAt: new Date().toISOString(),
      };
      this.saveAppointments(appts);
      return appts[idx];
    }
    return null;
  }

  public declineReschedule(id: string, reason?: string, cancelEntireAppointment: boolean = false): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      const appt = appts[idx];
      if (cancelEntireAppointment) {
        appts[idx] = {
          ...appt,
          status: 'REJECTED',
          remarks: reason ? reason.trim() : appt.remarks,
          isRescheduleRequest: false,
          updatedAt: new Date().toISOString(),
        };
      } else {
        // Keep original schedule confirmed
        appts[idx] = {
          ...appt,
          status: 'UPCOMING',
          isRescheduleRequest: false,
          rescheduleInitiator: undefined,
          proposedDate: undefined,
          proposedTime: undefined,
          updatedAt: new Date().toISOString(),
        };
      }
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

  public cancelAppointment(id: string, reason?: string): Appointment | null {
    const appts = [...this.getAppointments()];
    const idx = appts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      appts[idx] = {
        ...appts[idx],
        status: 'CANCELLED',
        cancelReason: reason ? reason.trim() : 'Cancelled by student',
        remarks: reason ? reason.trim() : appts[idx].remarks,
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
}
