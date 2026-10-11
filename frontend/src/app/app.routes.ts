import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { ForgotPassword } from './auth/forgot-password/forgot-password';
import { RegisterComponent } from './auth/register/register';
import { RegistrationSuccess } from './auth/registration-success/registration-success';
import { VerificationCode } from './auth/verification-code/verification-code';
import { ResetPassword } from './auth/reset-password/reset-password';


//-- ADMIN --//
import { AdminDashboardComponent } from './admin/admin/admin-dashboard';
import { UserManagementComponent } from './admin/user-management/user-management';
import { ConsultationLogsComponent } from './admin/consultation-logs/consultation-logs';
import { AttendanceTrackingComponent } from './admin/attendance-tracking/attendance-tracking';
import { SystemSettingsComponent } from './admin/system-settings/system-settings';
import { BroadcastHubComponent } from './admin/broadcast-hub/broadcast-hub';
import { AnalyticsReportsComponent } from './admin/analytics-reports/analytics-reports';

//-- LECTURER --//
import { LecturerDashboardComponent } from './lecturer/lecturer-dashboard/lecturer-dashboard';
import { LecturerScheduleComponent } from './lecturer/lecturer-schedule/lecturer-schedule';
import { LecturerAppointmentsComponent } from './lecturer/lecturer-appointments/lecturer-appointments';
import { LecturerHistoryComponent } from './lecturer/lecturer-history/lecturer-history';
import { LecturerProfileComponent } from './lecturer/lecturer-profile/lecturer-profile';

//-- STUDENT --//
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard';
import { StudentBookingComponent } from './student/student-booking/student-booking';
import { StudentAppointmentsComponent } from './student/student-appointments/student-appointments';
import { StudentProfileComponent } from './student/student-profile/student-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'register', component: RegisterComponent },
  { path: 'registration-success', component: RegistrationSuccess },
  { path: 'verification-code', component: VerificationCode },
  { path: 'reset-password', component: ResetPassword },


  //-- ADMIN ROUTES --//
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/users', component: UserManagementComponent },
  { path: 'admin/logs', component: ConsultationLogsComponent },
  { path: 'admin/attendance', component: AttendanceTrackingComponent },
  { path: 'admin/settings', component: SystemSettingsComponent },
  { path: 'admin/broadcasts', component: BroadcastHubComponent },
  { path: 'admin/analytics', component: AnalyticsReportsComponent },

  //-- LECTURER ROUTES --//
  { path: 'lecturer', component: LecturerDashboardComponent },
  { path: 'lecturer/schedule', component: LecturerScheduleComponent },
  { path: 'lecturer/appointments', component: LecturerAppointmentsComponent },
  { path: 'lecturer/history', component: LecturerHistoryComponent },
  { path: 'lecturer/profile', component: LecturerProfileComponent },

  //-- STUDENT ROUTES --//
  { path: 'student', component: StudentDashboardComponent },
  { path: 'student/book', component: StudentBookingComponent },
  { path: 'student/history', component: StudentAppointmentsComponent },
  { path: 'student/profile', component: StudentProfileComponent },

  // Add this at the very end to catch typos and redirect to login
  { path: '**', redirectTo: 'login' },
];
