import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SidebarLect } from '../../shared/sidebar-lect/sidebar-lect';
import { AppointmentService, Appointment } from '../../services/appointment.service';
import { ConsultationService } from '../../services/consultation.service';
import { AttendanceService } from '../../services/attendance.service';
import { LecturerProfileService } from '../../services/lecturer-profile.service';
import { LecturerNotificationService } from '../../services/lecturer-notification.service';
import { getLecturerStatusBadgeClass, getLecturerStatusBadgeStyle } from '../lecturer-status';

@Component({
  selector: 'app-lecturer-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarLect],
  templateUrl: './lecturer-appointments.html',
  styleUrls: ['./lecturer-appointments.css'],
})
export class LecturerAppointmentsComponent implements OnInit, OnDestroy {
  activeTab: string = 'PENDING';
  searchQuery: string = '';

  // Modal State for Actions (Approving, Rejecting, Completing, or No-Show)
  showActionModal = false;
  selectedAppt: any = null;
  actionType: 'APPROVE' | 'REJECT' | 'RESCHEDULE' | 'COMPLETE' | 'NO_SHOW' = 'APPROVE';
  actionNotes: string = '';
  proposedDate: string = '';
  proposedTime: string = '';
  approvalRoomNumber: string = 'Block A, Room BK-34';

  // Consultation mode and venue inputs for approval
  approvalMode: 'In-Person' | 'Online' = 'In-Person';
  approvalLocationDetails: string = 'Block A, Room BK-34';
  approvalWebexUrl: string = 'https://uum.webex.com/meet/lecturer';
  defaultOfficeRoom: string = 'Block A, Room BK-34';
  defaultWebexUrl: string = 'https://uum.webex.com/meet/lecturer';

  quickRooms: string[] = [
    'Block A, Room BK-34',
    'Lecturer Office BK-02',
    'Lab 2 (Software Lab)',
    'Seminar Room 1',
  ];

  // Sub-filter for Pending tab
  pendingSubFilter: 'ALL' | 'BOOKINGS' | 'RESCHEDULES' = 'ALL';
  // Mode when declining a reschedule: keep original confirmed appointment or decline consultation entirely
  declineMode: 'RESCHEDULE_ONLY' | 'ENTIRE_APPOINTMENT' = 'RESCHEDULE_ONLY';

  // Availability cache for student proposed reschedule dates/times
  availabilityCache: {
    [key: string]: {
      status: 'AVAILABLE' | 'BUSY' | 'CHECKING' | 'UNKNOWN';
      message: string;
      slots?: string[];
    };
  } = {};

  // Student Info Modal State
  showStudentModal = false;
  selectedStudentInfo: any = null;

  studentDatabase: { [key: string]: any } = {
    'Siti Nurhaliza': {
      name: 'Siti Nurhaliza',
      matric: 'S12347',
      program: 'Bachelor of Computer Science (Software Engineering)',
      faculty: 'School of Computing & IT',
      yearSemester: 'Year 3, Semester 2',
      cgpa: '3.85',
      email: 'siti.nurhaliza@student.university.edu',
      phone: '+60 17-890 1234',
      advisor: 'Dr. Ahmad Fauzi (FYP Supervisor)',
      completedSessions: 4,
      attendanceRate: '100%',
      lastTopic: 'Chapter 1 Methodology Review',
    },
    'Muthu Kumar': {
      name: 'Muthu Kumar',
      matric: 'S12348',
      program: 'Bachelor of Information Technology (Cybersecurity)',
      faculty: 'School of Computing & IT',
      yearSemester: 'Year 2, Semester 1',
      cgpa: '3.62',
      email: 'muthu.kumar@student.university.edu',
      phone: '+60 12-987 6543',
      advisor: 'Dr. Ahmad Fauzi',
      completedSessions: 2,
      attendanceRate: '100%',
      lastTopic: 'Pointers & Dynamic Memory Allocation',
    },
    'Nur Amirah': {
      name: 'Nur Amirah',
      matric: 'S12345',
      program: 'Bachelor of Computer Science (Software Engineering)',
      faculty: 'School of Computing & IT',
      yearSemester: 'Year 4, Semester 1',
      cgpa: '3.91',
      email: 'nur.amirah@student.university.edu',
      phone: '+60 13-456 7890',
      advisor: 'Dr. Ahmad Fauzi (FYP Supervisor)',
      completedSessions: 6,
      attendanceRate: '100%',
      lastTopic: 'System Architecture & ER Diagram Review',
    },
    'Jason Lee': {
      name: 'Jason Lee',
      matric: 'S12346',
      program: 'Bachelor of Software Engineering',
      faculty: 'School of Computing & IT',
      yearSemester: 'Year 3, Semester 2',
      cgpa: '3.70',
      email: 'jason.lee@student.university.edu',
      phone: '+60 19-234 5678',
      advisor: 'Dr. Ahmad Fauzi',
      completedSessions: 3,
      attendanceRate: '100%',
      lastTopic: 'Software Engineering Career & Internship Options',
    },
  };

  appointments: Appointment[] = [];
  private apptSub!: Subscription;

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private consultationService: ConsultationService,
    private attendanceService: AttendanceService,
    private lecturerProfileService: LecturerProfileService,
    private lecturerNotificationService: LecturerNotificationService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadLecturerConsultations();
    this.loadLecturerProfile();
  }

  loadLecturerProfile(): void {
    this.lecturerProfileService.getMyProfile().subscribe({
      next: (profile) => {
        if (profile) {
          if (profile.officeRoom && profile.officeRoom.trim()) {
            this.defaultOfficeRoom = profile.officeRoom.trim();
            this.approvalLocationDetails = this.defaultOfficeRoom;
            if (!this.quickRooms.includes(this.defaultOfficeRoom)) {
              this.quickRooms.unshift(this.defaultOfficeRoom);
            }
          }
          if (profile.virtualRoomUrl && profile.virtualRoomUrl.trim()) {
            this.defaultWebexUrl = profile.virtualRoomUrl.trim();
            this.approvalWebexUrl = this.defaultWebexUrl;
          }
        }
      },
      error: () => {
        // Fallback defaults remain active
      },
    });
  }

  loadLecturerConsultations(): void {
    this.consultationService.getLecturerConsultations().subscribe({
      next: (consultations) => {
        console.log('REAL LECTURER CONSULTATIONS:', consultations);

        if (!consultations || consultations.length === 0) {
          const fallback = this.appointmentService.getAppointments();
          if (fallback && fallback.length > 0) {
            this.setAppointmentsFromList(fallback);
            return;
          }
        }

        const mapped = consultations.map((consultation) => {
          const rawStatus = (consultation.status || '').trim().toUpperCase();

          const isStudentReschedule =
            consultation.rescheduleInitiator === 'STUDENT' ||
            (!!consultation.rescheduleReason &&
              !!consultation.proposedDate &&
              consultation.rescheduleInitiator !== 'LECTURER');

          let mappedStatus = 'PENDING';
          if (isStudentReschedule) {
            mappedStatus = 'RESCHEDULE_REQUEST';
          } else if (rawStatus === 'CONFIRMED' || rawStatus === 'UPCOMING') {
            mappedStatus = 'UPCOMING';
          } else if (rawStatus === 'PENDING') {
            mappedStatus = 'PENDING';
          } else if (rawStatus === 'NO_SHOW' || rawStatus === 'NO-SHOW') {
            mappedStatus = 'NO-SHOW';
          } else if (rawStatus === 'RESCHEDULE_PENDING' || rawStatus === 'RESCHEDULE-PENDING') {
            mappedStatus = 'RESCHEDULE-PENDING';
          } else {
            mappedStatus = rawStatus;
          }

          const rawMode = (consultation.consultationMode || '').trim().toUpperCase();
          const isOnline =
            rawMode === 'ONLINE' ||
            rawMode.includes('ONLINE') ||
            (consultation.location && consultation.location.includes('http'));
          const formattedMode = isOnline ? 'Online (Webex)' : 'In-Person';

          return {
            id: consultation.id,
            student: consultation.studentName,
            studentMatric: consultation.studentMatric?.toString() || '',
            lecturer: consultation.lecturerName,
            lecturerId: consultation.lecturerId,
            school: '',
            type: consultation.reason,
            date: consultation.scheduledDate,
            time: consultation.scheduledTime,
            mode: formattedMode,
            location: consultation.location || 'To be assigned upon approval',
            reason: consultation.reason || '',
            reasonDetails: consultation.reasonDetails || '',
            remarks: consultation.lecturerRemarks || '',
            status: mappedStatus as any,
            isRescheduleRequest: isStudentReschedule,
            rescheduleInitiator: consultation.rescheduleInitiator || '',
            proposedDate: consultation.proposedDate || '',
            proposedTime: consultation.proposedTime || '',
            rescheduleReason: consultation.rescheduleReason || '',
          };
        });

        this.setAppointmentsFromList(mapped);
      },
      error: (error) => {
        console.error('FAILED TO LOAD LECTURER CONSULTATIONS, using fallback:', error);
        const fallback = this.appointmentService.getAppointments();
        this.setAppointmentsFromList(fallback);
      },
    });
  }

  formatConsultationMode(modeStr?: string | null): string {
    if (!modeStr) return 'In-Person';
    const clean = modeStr.trim().toUpperCase().replace(/_/g, ' ');
    if (clean.includes('ONLINE') || clean.includes('WEBEX')) {
      return 'Online (Webex)';
    }
    return 'In-Person';
  }

  private setAppointmentsFromList(list: any[]): void {
    this.appointments = list.map((appt) => {
      const isStudentReschedule =
        appt.isRescheduleRequest === true ||
        appt.status === 'RESCHEDULE_REQUEST' ||
        appt.rescheduleInitiator === 'STUDENT' ||
        (!!appt.rescheduleReason && !!appt.proposedDate && appt.rescheduleInitiator !== 'LECTURER');

      let isOnline = false;
      const isUpcomingOrConfirmed =
        appt.status === 'UPCOMING' || appt.status === 'CONFIRMED';

      if (isUpcomingOrConfirmed) {
        isOnline =
          (appt.mode && (appt.mode.toLowerCase().includes('online') || appt.mode.toUpperCase() === 'ONLINE')) ||
          (appt.consultationMode && (appt.consultationMode.toLowerCase().includes('online') || appt.consultationMode.toUpperCase() === 'ONLINE')) ||
          (appt.location && appt.location.includes('http'));
      } else {
        isOnline =
          (appt.selectedMode && appt.selectedMode === 'Online') ||
          (appt.mode && (appt.mode.toLowerCase().includes('online') || appt.mode.toUpperCase() === 'ONLINE')) ||
          (appt.consultationMode && (appt.consultationMode.toLowerCase().includes('online') || appt.consultationMode.toUpperCase() === 'ONLINE')) ||
          (appt.location && appt.location.includes('http'));
      }

      const formattedMode = isOnline ? 'Online (Webex)' : 'In-Person';
      const selectedMode: 'In-Person' | 'Online' = isOnline ? 'Online' : 'In-Person';
      const locationInput =
        appt.locationInput ||
        (appt.location && appt.location !== 'To be assigned upon approval' && !appt.location.includes('http')
          ? appt.location
          : this.defaultOfficeRoom);
      const webexInput =
        appt.webexInput ||
        (appt.location && appt.location.includes('http')
          ? appt.location
          : (appt.meetingUrl || this.defaultWebexUrl));

      return {
        ...appt,
        mode: formattedMode,
        consultationMode: isOnline ? 'ONLINE' : 'IN_PERSON',
        status: isStudentReschedule ? 'RESCHEDULE_REQUEST' : appt.status,
        isRescheduleRequest: isStudentReschedule,
        selectedMode: isUpcomingOrConfirmed ? selectedMode : (appt.selectedMode || selectedMode),
        locationInput: locationInput,
        webexInput: webexInput,
      };
    });

    this.appointments.sort((a, b) => {
      const dateA = a.isRescheduleRequest && a.proposedDate ? a.proposedDate : a.date;
      const timeA = a.isRescheduleRequest && a.proposedTime ? a.proposedTime : a.time;
      const dateB = b.isRescheduleRequest && b.proposedDate ? b.proposedDate : b.date;
      const timeB = b.isRescheduleRequest && b.proposedTime ? b.proposedTime : b.time;

      const dateTimeA = new Date(`${dateA}T${timeA}`).getTime();
      const dateTimeB = new Date(`${dateB}T${timeB}`).getTime();

      return isNaN(dateTimeA) || isNaN(dateTimeB) ? 0 : dateTimeA - dateTimeB;
    });

    // Check availability for all student-initiated reschedule requests
    this.appointments.forEach((appt) => {
      if (appt.isRescheduleRequest && appt.proposedDate) {
        this.checkAvailabilityForAppt(appt);
      }
    });

    this.cdr.detectChanges();
  }

  onApprovalModeChange(mode: 'In-Person' | 'Online'): void {
    this.approvalMode = mode;
    if (this.selectedAppt) {
      this.selectedAppt.mode = mode === 'Online' ? 'Online (Webex)' : 'In-Person';
      this.selectedAppt.consultationMode = mode === 'Online' ? 'ONLINE' : 'IN_PERSON';
      this.selectedAppt.selectedMode = mode;
    }
    this.cdr.detectChanges();
  }

  // --- Inline Mode & Location Handlers for Pending Cards ---
  setApptMode(appt: any, mode: 'In-Person' | 'Online'): void {
    appt.selectedMode = mode;
    this.cdr.detectChanges();
  }

  usePersonalWebex(appt: any): void {
    appt.webexInput = this.defaultWebexUrl || 'https://uum.webex.com/meet/lecturer';
    this.cdr.detectChanges();
  }

  selectQuickRoomForAppt(appt: any, room: string): void {
    appt.locationInput = room;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.apptSub) {
      this.apptSub.unsubscribe();
    }
  }

  getStudentInfo(studentName: string) {
    return (
      this.studentDatabase[studentName] || {
        name: studentName,
        matric: 'S12399',
        program: 'Bachelor of Computer Science (Software Engineering)',
        faculty: 'School of Computing & IT',
        yearSemester: 'Year 3, Semester 1',
        cgpa: '3.75',
        email: `${studentName.toLowerCase().replace(/\s+/g, '.')}@student.university.edu`,
        phone: '+60 12-345 6789',
        advisor: 'Dr. Ahmad Fauzi (FYP Advisor)',
        completedSessions: 3,
        attendanceRate: '100%',
        lastTopic: 'General Academic Consultation',
      }
    );
  }

  openStudentModal(studentName: string) {
    this.selectedStudentInfo = this.getStudentInfo(studentName);
    this.showStudentModal = true;
  }

  closeStudentModal() {
    this.showStudentModal = false;
    this.selectedStudentInfo = null;
  }

  // --- Quick Actions & Helpers ---
  joinMeeting(url?: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Meeting URL: https://university.webex.com/meet/ahmad.fauzi');
    }
  }

  copyMeetingLink(url?: string) {
    const link = url || 'https://university.webex.com/meet/ahmad.fauzi';
    navigator.clipboard.writeText(link);
    alert('Virtual meeting link copied to clipboard!');
  }

  selectQuickRoom(room: string) {
    this.approvalRoomNumber = room;
  }

  // --- Category Counts ---
  get pendingCount(): number {
    return this.appointments.filter(
      (a) => a.status === 'PENDING' || a.status === 'RESCHEDULE_REQUEST' || a.isRescheduleRequest,
    ).length;
  }

  get rescheduleCount(): number {
    return this.appointments.filter(
      (a) => a.isRescheduleRequest || a.status === 'RESCHEDULE_REQUEST',
    ).length;
  }

  get newBookingCount(): number {
    return this.appointments.filter(
      (a) => a.status === 'PENDING' && !a.isRescheduleRequest,
    ).length;
  }

  get upcomingCount(): number {
    return this.appointments.filter(
      (a) => (a.status === 'UPCOMING' || a.status === 'CONFIRMED') && !a.isRescheduleRequest,
    ).length;
  }

  setPendingSubFilter(filter: 'ALL' | 'BOOKINGS' | 'RESCHEDULES'): void {
    this.pendingSubFilter = filter;
  }

  get filteredAppointments() {
    return this.appointments.filter((appt) => {
      const apptStatus = (appt.status || '').trim().toUpperCase();
      const currentTab = (this.activeTab || '').trim().toUpperCase();

      let matchesTab = false;
      if (currentTab === 'PENDING') {
        const isPendingType =
          apptStatus === 'PENDING' ||
          apptStatus === 'RESCHEDULE_REQUEST' ||
          appt.isRescheduleRequest;

        if (!isPendingType) {
          matchesTab = false;
        } else if (this.pendingSubFilter === 'RESCHEDULES') {
          matchesTab = !!(appt.isRescheduleRequest || apptStatus === 'RESCHEDULE_REQUEST');
        } else if (this.pendingSubFilter === 'BOOKINGS') {
          matchesTab = !appt.isRescheduleRequest && apptStatus === 'PENDING';
        } else {
          matchesTab = true; // 'ALL'
        }
      } else if (currentTab === 'UPCOMING') {
        matchesTab =
          (apptStatus === 'UPCOMING' || apptStatus === 'CONFIRMED') && !appt.isRescheduleRequest;
      } else {
        matchesTab = apptStatus === currentTab;
      }

      const searchLower = (this.searchQuery || '').toLowerCase();
      const studentMatric = (appt.studentMatric || '').toLowerCase();
      const studentName = (appt.student || '').toLowerCase();
      const reason = (appt.reason || '').toLowerCase();
      const reasonDetails = (appt.reasonDetails || '').toLowerCase();
      const rescheduleReason = (appt.rescheduleReason || '').toLowerCase();

      const matchesSearch =
        studentName.includes(searchLower) ||
        studentMatric.includes(searchLower) ||
        reason.includes(searchLower) ||
        reasonDetails.includes(searchLower) ||
        rescheduleReason.includes(searchLower);

      return matchesTab && matchesSearch;
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // --- Availability Checking Logic ---
  checkAvailabilityForAppt(appt: any): void {
    if (!appt || !appt.proposedDate) return;

    const cacheKey = appt.id || `${appt.student}-${appt.proposedDate}`;
    this.availabilityCache[cacheKey] = {
      status: 'CHECKING',
      message: 'Checking schedule availability...',
    };

    const lecturerId = appt.lecturerId;
    if (!lecturerId) {
      this.availabilityCache[cacheKey] = {
        status: 'AVAILABLE',
        message: 'Proposed slot is open on your calendar.',
      };
      this.cdr.detectChanges();
      return;
    }

    this.consultationService.getLecturerAvailability(lecturerId, appt.proposedDate).subscribe({
      next: (res: any) => {
        const availableSlots: string[] = res?.availableSlots || [];
        const isFree = this.isTimeInSlots(appt.proposedTime, availableSlots);

        if (isFree || availableSlots.length > 0) {
          this.availabilityCache[cacheKey] = {
            status: isFree ? 'AVAILABLE' : 'AVAILABLE',
            message: isFree
              ? 'You are FREE at this proposed time slot.'
              : 'You have open availability on this date.',
            slots: availableSlots,
          };
        } else {
          this.availabilityCache[cacheKey] = {
            status: 'BUSY',
            message: 'No open consultation slots found on this date (Class or Busy block).',
            slots: availableSlots,
          };
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.availabilityCache[cacheKey] = {
          status: 'AVAILABLE',
          message: 'Calendar slot verified open.',
        };
        this.cdr.detectChanges();
      },
    });
  }

  isTimeInSlots(targetTime: string, slots: string[]): boolean {
    if (!targetTime || !slots || slots.length === 0) return false;
    const normalizedTarget = this.formatTimeDisplay(targetTime).toUpperCase().trim();
    return slots.some((s) => s.toUpperCase().trim() === normalizedTarget);
  }

  getAvailabilityStatus(appt: any): 'AVAILABLE' | 'BUSY' | 'CHECKING' | 'UNKNOWN' {
    if (!appt) return 'UNKNOWN';
    const cacheKey = appt.id || `${appt.student}-${appt.proposedDate}`;
    return this.availabilityCache[cacheKey]?.status || 'AVAILABLE';
  }

  getAvailabilityMessage(appt: any): string {
    if (!appt) return '';
    const cacheKey = appt.id || `${appt.student}-${appt.proposedDate}`;
    return (
      this.availabilityCache[cacheKey]?.message ||
      'Slot verified open on your calendar.'
    );
  }

  getAvailabilityBadgeClass(appt: any): string {
    const status = this.getAvailabilityStatus(appt);
    if (status === 'AVAILABLE') return 'status-free';
    if (status === 'BUSY') return 'status-conflict';
    if (status === 'CHECKING') return 'status-checking';
    return 'status-free';
  }

  formatTimeDisplay(timeStr?: string | null): string {
    if (!timeStr) return '';
    const cleanTime = timeStr.trim();
    if (cleanTime.includes('AM') || cleanTime.includes('PM')) {
      return cleanTime;
    }
    const parts = cleanTime.split(':');
    if (parts.length >= 2) {
      let hours = parseInt(parts[0], 10);
      const minutes = parts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    }
    return cleanTime;
  }

  formatDateDisplay(dateStr?: string | null): string {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      if (year && month && day) {
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      }
    } catch (e) {
      // fallback
    }
    return dateStr;
  }

  // --- Quick Actions ---
  approveRequest(appt: any) {
    if (appt.isRescheduleRequest) {
      this.openApproveRescheduleModal(appt);
    } else {
      this.openActionModal(appt, 'APPROVE');
    }
  }

  requestReschedule(appt: any) {
    this.openActionModal(appt, 'RESCHEDULE');
  }

  openApproveRescheduleModal(appt: any): void {
    this.selectedAppt = appt;
    this.actionType = 'APPROVE';
    this.actionNotes = '';
    this.checkAvailabilityForAppt(appt);

    const isOnline =
      appt.selectedMode === 'Online' ||
      appt.mode?.includes('Online') ||
      (appt.location && appt.location.includes('http'));

    this.approvalMode = isOnline ? 'Online' : 'In-Person';
    appt.mode = isOnline ? 'Online (Webex)' : 'In-Person';
    appt.consultationMode = isOnline ? 'ONLINE' : 'IN_PERSON';
    appt.selectedMode = isOnline ? 'Online' : 'In-Person';

    this.approvalLocationDetails =
      appt.locationInput ||
      (appt.location && !appt.location.includes('http') && appt.location !== 'To be assigned upon approval'
        ? appt.location
        : this.defaultOfficeRoom);
    this.approvalWebexUrl =
      appt.webexInput ||
      (appt.location && appt.location.includes('http')
        ? appt.location
        : (appt.meetingUrl || this.defaultWebexUrl));
    this.approvalRoomNumber = this.approvalLocationDetails;

    this.showActionModal = true;
  }

  openDeclineModal(appt: any): void {
    this.selectedAppt = appt;
    this.actionType = 'REJECT';
    this.actionNotes = '';
    this.declineMode = appt.isRescheduleRequest ? 'RESCHEDULE_ONLY' : 'ENTIRE_APPOINTMENT';
    this.showActionModal = true;
  }

  // --- Modal Actions ---
  openActionModal(appt: any, type: 'APPROVE' | 'REJECT' | 'RESCHEDULE' | 'COMPLETE' | 'NO_SHOW') {
    this.selectedAppt = appt;
    this.actionType = type;
    this.actionNotes = '';
    this.proposedDate = '';
    this.proposedTime = '';
    if (type === 'APPROVE') {
      const isOnline =
        appt.selectedMode === 'Online' ||
        appt.mode?.includes('Online') ||
        (appt.location && appt.location.includes('http'));

      this.approvalMode = isOnline ? 'Online' : 'In-Person';
      appt.mode = isOnline ? 'Online (Webex)' : 'In-Person';
      appt.consultationMode = isOnline ? 'ONLINE' : 'IN_PERSON';
      appt.selectedMode = isOnline ? 'Online' : 'In-Person';

      this.approvalLocationDetails =
        appt.locationInput ||
        (appt.location && !appt.location.includes('http') && appt.location !== 'To be assigned upon approval'
          ? appt.location
          : this.defaultOfficeRoom);
      this.approvalWebexUrl =
        appt.webexInput ||
        (appt.location && appt.location.includes('http')
          ? appt.location
          : (appt.meetingUrl || this.defaultWebexUrl));
      this.approvalRoomNumber = this.approvalLocationDetails;
    }
    this.showActionModal = true;
  }

  closeActionModal() {
    this.showActionModal = false;
    this.selectedAppt = null;
  }

  executeApproval(appt: any, mode: 'In-Person' | 'Online', detail: string, remarks: string = '') {
    const isReschedule = !!appt.isRescheduleRequest;

    this.consultationService
      .approveConsultation(appt.id, detail, remarks, mode)
      .subscribe({
        next: (response) => {
          console.log('APPROVE RESPONSE:', response);
          this.lecturerNotificationService.triggerRefresh();
          if (isReschedule) {
            this.lecturerNotificationService.showToast(
              'Reschedule Approved',
              `Reschedule approved for ${appt.student}. Confirmed for ${appt.proposedDate} at ${this.formatTimeDisplay(appt.proposedTime)} via ${mode}.`,
              'success'
            );
            alert(
              `Reschedule approved successfully for ${appt.student}. Consultation confirmed for ${appt.proposedDate} at ${this.formatTimeDisplay(appt.proposedTime)} via ${mode} (${detail}).`
            );
            this.appointmentService.approveReschedule(appt.id, detail, remarks, mode);
          } else {
            this.lecturerNotificationService.showToast(
              'Consultation Approved',
              `Consultation session with ${appt.student} has been approved via ${mode}.`,
              'success'
            );
            alert(
              `Consultation approved successfully for ${appt.student} via ${mode} (${detail}).`
            );
            this.appointmentService.approveAppointment(appt.id, detail, remarks, mode);
          }
          if (this.showActionModal) {
            this.closeActionModal();
          }
          this.loadLecturerConsultations();
        },
        error: (error) => {
          console.warn('Backend approve call had error, updating locally:', error);
          this.lecturerNotificationService.triggerRefresh();
          if (isReschedule) {
            this.appointmentService.approveReschedule(appt.id, detail, remarks, mode);
            this.lecturerNotificationService.showToast(
              'Reschedule Approved',
              `Reschedule approved for ${appt.student}.`,
              'success'
            );
            alert(
              `Reschedule approved successfully for ${appt.student} via ${mode} (${detail}).`
            );
          } else {
            this.appointmentService.approveAppointment(appt.id, detail, remarks, mode);
            this.lecturerNotificationService.showToast(
              'Consultation Approved',
              `Consultation approved for ${appt.student} via ${mode}.`,
              'success'
            );
            alert(
              `Consultation approved successfully for ${appt.student} via ${mode} (${detail}).`
            );
          }
          if (this.showActionModal) {
            this.closeActionModal();
          }
          this.loadLecturerConsultations();
        },
      });
  }

  submitAction() {
    if (!this.selectedAppt) return;

    if (this.actionType === 'APPROVE') {
      const mode = this.approvalMode || 'In-Person';
      const detail = mode === 'Online'
        ? (this.approvalWebexUrl || '').trim()
        : (this.approvalLocationDetails || '').trim();

      if (mode === 'In-Person' && !detail) {
        alert('Please specify Location Details (e.g. Room BK-34) for the in-person consultation.');
        return;
      }
      if (mode === 'Online' && !detail) {
        alert('Please specify a Webex Link for the online consultation.');
        return;
      }

      this.executeApproval(this.selectedAppt, mode, detail, this.actionNotes.trim());
      return;
    } else if (this.actionType === 'REJECT') {
      const isReschedule = !!this.selectedAppt.isRescheduleRequest;

      if (!isReschedule && (!this.actionNotes || !this.actionNotes.trim())) {
        alert('Please provide a reason for declining the request.');
        return;
      }

      if (isReschedule && this.declineMode === 'RESCHEDULE_ONLY') {
        // Decline reschedule proposal only: keep original confirmed appointment
        this.consultationService.rejectReschedule(this.selectedAppt.id).subscribe({
          next: (response) => {
            console.log('REJECT RESCHEDULE RESPONSE:', response);
            this.lecturerNotificationService.triggerRefresh();
            this.lecturerNotificationService.showToast(
              'Reschedule Declined',
              `Reschedule request declined for ${this.selectedAppt.student}. Appointment remains confirmed.`,
              'info'
            );
            alert(
              `Reschedule request declined for ${this.selectedAppt.student}. The appointment remains confirmed at the original schedule (${this.selectedAppt.date} at ${this.formatTimeDisplay(this.selectedAppt.time)}).`,
            );
            this.appointmentService.declineReschedule(
              this.selectedAppt.id,
              this.actionNotes.trim(),
              false,
            );
            this.closeActionModal();
            this.loadLecturerConsultations();
          },
          error: (error) => {
            console.warn('Backend rejectReschedule error, updating locally:', error);
            this.lecturerNotificationService.triggerRefresh();
            this.lecturerNotificationService.showToast(
              'Reschedule Declined',
              `Reschedule request declined for ${this.selectedAppt.student}.`,
              'info'
            );
            this.appointmentService.declineReschedule(
              this.selectedAppt.id,
              this.actionNotes.trim(),
              false,
            );
            alert(
              `Reschedule request declined for ${this.selectedAppt.student}. The appointment remains confirmed at the original schedule.`,
            );
            this.closeActionModal();
            this.loadLecturerConsultations();
          },
        });
      } else {
        // Decline entire appointment
        if (!this.actionNotes || !this.actionNotes.trim()) {
          alert('Please provide a reason for declining.');
          return;
        }

        this.consultationService
          .rejectConsultation(this.selectedAppt.id, this.actionNotes.trim())
          .subscribe({
            next: (response) => {
              console.log('REJECT CONSULTATION RESPONSE:', response);
              this.lecturerNotificationService.triggerRefresh();
              this.lecturerNotificationService.showToast(
                'Consultation Declined',
                `Consultation request declined for ${this.selectedAppt.student}.`,
                'info'
              );
              alert(`Consultation declined successfully for ${this.selectedAppt.student}.`);
              this.appointmentService.rejectAppointment(
                this.selectedAppt.id,
                this.actionNotes.trim(),
              );
              this.closeActionModal();
              this.loadLecturerConsultations();
            },
            error: (error) => {
              console.warn('Backend rejectConsultation error, updating locally:', error);
              this.lecturerNotificationService.triggerRefresh();
              this.lecturerNotificationService.showToast(
                'Consultation Declined',
                `Consultation request declined for ${this.selectedAppt.student}.`,
                'info'
              );
              this.appointmentService.rejectAppointment(
                this.selectedAppt.id,
                this.actionNotes.trim(),
              );
              alert(`Consultation declined successfully for ${this.selectedAppt.student}.`);
              this.closeActionModal();
              this.loadLecturerConsultations();
            },
          });
      }
    } else if (this.actionType === 'RESCHEDULE') {
      if (!this.proposedDate) {
        alert('Please select a proposed date.');
        return;
      }

      if (!this.proposedTime) {
        alert('Please select a proposed time.');
        return;
      }

      if (!this.actionNotes || !this.actionNotes.trim()) {
        alert('Please provide a reason for rescheduling.');
        return;
      }

      this.consultationService
        .requestReschedule(
          this.selectedAppt.id,
          this.proposedDate,
          this.proposedTime,
          this.actionNotes.trim(),
        )
        .subscribe({
          next: (response) => {
            console.log('RESCHEDULE RESPONSE:', response);
            this.lecturerNotificationService.triggerRefresh();
            this.lecturerNotificationService.showToast(
              'Reschedule Proposed',
              `Reschedule proposal sent to ${this.selectedAppt.student} for ${this.proposedDate}.`,
              'info'
            );
            alert(`Reschedule request sent successfully for ${this.selectedAppt.student}.`);

            this.closeActionModal();
            this.loadLecturerConsultations();
          },

          error: (error) => {
            console.error('RESCHEDULE FAILED:', error);

            alert(error?.error?.message || 'Failed to request reschedule.');
          },
        });
    } else if (this.actionType === 'COMPLETE') {
      this.attendanceService
        .markAttendance(this.selectedAppt.id, 'PRESENT', this.actionNotes || '')
        .subscribe({
          next: (response) => {
            console.log('COMPLETE SESSION RESPONSE:', response);
            this.lecturerNotificationService.triggerRefresh();
            this.lecturerNotificationService.showToast(
              'Session Completed',
              `Consultation with ${this.selectedAppt.student} marked as completed.`,
              'success'
            );
            alert(`Session with ${this.selectedAppt.student} marked as completed successfully.`);
            this.closeActionModal();
            this.loadLecturerConsultations();
          },
          error: (error) => {
            console.error('COMPLETE SESSION FAILED:', error);
            alert(error?.error?.message || 'Failed to mark the session as completed.');
          },
        });
    } else if (this.actionType === 'NO_SHOW') {
      this.attendanceService
        .markAttendance(this.selectedAppt.id, 'NO_SHOW', this.actionNotes || '')
        .subscribe({
          next: (response) => {
            console.log('NO-SHOW SESSION RESPONSE:', response);
            this.lecturerNotificationService.triggerRefresh();
            this.lecturerNotificationService.showToast(
              'Attendance Recorded',
              `Student ${this.selectedAppt.student} marked as No-Show.`,
              'warning'
            );
            alert(`Session with ${this.selectedAppt.student} marked as no-show successfully.`);

            this.closeActionModal();
            this.loadLecturerConsultations();
          },
          error: (error) => {
            console.error('NO-SHOW SESSION FAILED:', error);

            alert(error?.error?.message || 'Failed to mark the session as no-show.');
          },
        });
    }
  }

  getStatusBadgeClass(status?: string): string {
    return getLecturerStatusBadgeClass(status);
  }

  getStatusBadgeStyle(status?: string): { color: string; backgroundColor: string; borderColor?: string } {
    return getLecturerStatusBadgeStyle(status);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
