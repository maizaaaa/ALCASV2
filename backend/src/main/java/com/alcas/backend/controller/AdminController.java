package com.alcas.backend.controller;

import com.alcas.backend.entity.*;
import com.alcas.backend.repository.UserRepository;
import com.alcas.backend.repository.StudentProfileRepository;
import com.alcas.backend.repository.LecturerProfileRepository;
import com.alcas.backend.repository.SchoolRepository;
import com.alcas.backend.repository.ProgramRepository;
import com.alcas.backend.repository.ConsultationRepository;
import com.alcas.backend.repository.AttendanceRepository;
import com.alcas.backend.repository.NotificationRepository;
import com.alcas.backend.dto.AdminUserResponse;
import com.alcas.backend.dto.AdminCreateUserRequest;
import com.alcas.backend.dto.ConsultationResponse;
import com.alcas.backend.dto.AdminAttendanceResponse;
import com.alcas.backend.dto.AdminAnalyticsReportResponse;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.DayOfWeek;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final LecturerProfileRepository lecturerProfileRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final ProgramRepository programRepository;
    private final SchoolRepository schoolRepository;
    private final ConsultationRepository consultationRepository;
    private final AttendanceRepository attendanceRepository;
    private final NotificationRepository notificationRepository;

    public AdminController(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            StudentProfileRepository studentProfileRepository,
            LecturerProfileRepository lecturerProfileRepository,
            ProgramRepository programRepository,
            SchoolRepository schoolRepository,
            ConsultationRepository consultationRepository,
            AttendanceRepository attendanceRepository,
            NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.studentProfileRepository = studentProfileRepository;
        this.lecturerProfileRepository = lecturerProfileRepository;
        this.programRepository = programRepository;
        this.schoolRepository = schoolRepository;
        this.consultationRepository = consultationRepository;
        this.attendanceRepository = attendanceRepository;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/test")
    public String testAdminAccess() {
        return "Admin endpoint is working";
    }

    @GetMapping("/users")
    public List<AdminUserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new AdminUserResponse(
                        user,
                        studentProfileRepository,
                        lecturerProfileRepository))
                .toList();
    }

    @GetMapping("/consultations")
    @Transactional(readOnly = true)
    public List<ConsultationResponse> getAllConsultations() {
        return consultationRepository.findAll(Sort.by(Sort.Direction.DESC, "scheduledDate", "scheduledTime"))
                .stream()
                .map(consultation -> new ConsultationResponse(
                        consultation.getId(),
                        consultation.getStudent() != null ? consultation.getStudent().getUserId() : null,
                        consultation.getStudent() != null && consultation.getStudent().getUser() != null
                        ? consultation.getStudent().getUser().getFullName() : "Unknown Student",
                        consultation.getStudent() != null ? consultation.getStudent().getMatricNumber() : "",
                        consultation.getLecturer() != null ? consultation.getLecturer().getUserId() : null,
                        consultation.getLecturer() != null && consultation.getLecturer().getUser() != null
                        ? consultation.getLecturer().getUser().getFullName() : "Unknown Lecturer",
                        consultation.getLecturerRemarks(),
                        consultation.getScheduledDate() != null ? consultation.getScheduledDate().toString() : "",
                        consultation.getScheduledTime() != null ? consultation.getScheduledTime().toString() : "",
                        consultation.getReason(),
                        consultation.getReasonDetails(),
                        consultation.getConsultationMode(),
                        consultation.getLocation(),
                        consultation.getStatus() != null ? consultation.getStatus().name() : "",
                        consultation.getProposedDate() != null ? consultation.getProposedDate().toString() : null,
                        consultation.getProposedTime() != null ? consultation.getProposedTime().toString() : null,
                        consultation.getRescheduleReason(),
                        consultation.getRejectReason(),
                        consultation.getCancelReason()
                ))
                .toList();
    }

    @PutMapping("/users/{id}/status")
    public AdminUserResponse updateUserStatus(
            @PathVariable Integer id,
            @RequestParam String status) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(User.Status.valueOf(status.toUpperCase()));

        User updatedUser = userRepository.save(user);

        return new AdminUserResponse(updatedUser,
                studentProfileRepository,
                lecturerProfileRepository);
    }

    @PutMapping("/users/{id}")
    public AdminUserResponse updateUser(
            @PathVariable Integer id,
            @RequestBody AdminCreateUserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getEmail().equalsIgnoreCase(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException("Email already exists");
        }

        user.setFullName(request.getName());
        user.setEmail(request.getEmail());

        User updatedUser = userRepository.save(user);

        // Update student profile
        if (updatedUser.getRole() == User.Role.STUDENT) {

            if (studentProfileRepository.findAll().stream()
                    .anyMatch(profile
                            -> profile.getMatricNumber() != null
                            && profile.getMatricNumber()
                                    .equalsIgnoreCase(request.getUserId()))) {

                throw new RuntimeException("Matric number already exists");
            }

            StudentProfile profile = studentProfileRepository
                    .findById(updatedUser.getId())
                    .orElseThrow(() -> new RuntimeException("Student profile not found"));

            profile.setPhone(request.getPhone());

            School school = schoolRepository.findById(request.getSchoolId())
                    .orElseThrow(() -> new RuntimeException("School not found"));

            Program program = programRepository.findById(request.getProgramId())
                    .orElseThrow(() -> new RuntimeException("Program not found"));

            profile.setSchool(school);
            profile.setProgram(program);

            studentProfileRepository.save(profile);
        }

        // Update lecturer profile
        if (updatedUser.getRole() == User.Role.LECTURER) {

            if (lecturerProfileRepository.findAll().stream()
                    .anyMatch(profile
                            -> profile.getStaffNumber() != null
                            && profile.getStaffNumber()
                                    .equalsIgnoreCase(request.getUserId()))) {

                throw new RuntimeException("Staff number already exists");
            }

            LecturerProfile profile = lecturerProfileRepository
                    .findById(updatedUser.getId())
                    .orElseThrow(() -> new RuntimeException("Lecturer profile not found"));

            profile.setPhone(request.getPhone());
            profile.setOfficeRoom(request.getOfficeRoom());

            School school = schoolRepository.findById(request.getSchoolId())
                    .orElseThrow(() -> new RuntimeException("School not found"));

            profile.setSchoolId(school.getId());

            lecturerProfileRepository.save(profile);
        }

        return new AdminUserResponse(
                updatedUser,
                studentProfileRepository,
                lecturerProfileRepository);
    }

    @Transactional
    @PostMapping("/users")
    public AdminUserResponse createUser(
            @RequestBody AdminCreateUserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFullName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));
        user.setStatus(User.Status.ACTIVE);

        User savedUser = userRepository.save(user);

        // Create student profile
        if (savedUser.getRole() == User.Role.STUDENT) {

            School school = schoolRepository.findById(request.getSchoolId())
                    .orElseThrow(() -> new RuntimeException("School not found"));

            Program program = programRepository.findById(request.getProgramId())
                    .orElseThrow(() -> new RuntimeException("Program not found"));

            StudentProfile profile = new StudentProfile();

            profile.setUser(savedUser);
            profile.setMatricNumber(request.getUserId());
            profile.setPhone(request.getPhone());
            profile.setSchool(school);
            profile.setProgram(program);

            studentProfileRepository.save(profile);
        }

        // Create lecturer profile
        if (savedUser.getRole() == User.Role.LECTURER) {

            LecturerProfile profile = new LecturerProfile();

            profile.setUser(savedUser);
            profile.setStaffNumber(request.getUserId());
            profile.setSchoolId(request.getSchoolId());
            profile.setPhone(request.getPhone());
            profile.setOfficeRoom(request.getOfficeRoom());

            lecturerProfileRepository.save(profile);
        }

        return new AdminUserResponse(savedUser,
                studentProfileRepository,
                lecturerProfileRepository);
    }

    @GetMapping("/attendance")
    @Transactional(readOnly = true)
    public List<AdminAttendanceResponse> getAllAttendance() {
        return attendanceRepository.findAllWithDetails()
                .stream()
                .map(this::toAdminAttendanceResponse)
                .toList();
    }

    @PutMapping("/attendance/{id}/status")
    @Transactional
    public AdminAttendanceResponse updateAttendanceStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String notes) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found with id: " + id));

        Attendance.Status newStatus = Attendance.Status.valueOf(status.toUpperCase().replace('-', '_'));
        attendance.setStatus(newStatus);

        if (notes != null && !notes.isBlank()) {
            attendance.setNotes(notes);
        }

        if (attendance.getConsultation() != null) {
            if (newStatus == Attendance.Status.PRESENT || newStatus == Attendance.Status.EXCUSED) {
                attendance.getConsultation().setStatus(Consultation.Status.COMPLETED);
            } else if (newStatus == Attendance.Status.NO_SHOW) {
                attendance.getConsultation().setStatus(Consultation.Status.NO_SHOW);
            }
        }

        // Send notifications if absence was excused
        if (newStatus == Attendance.Status.EXCUSED) {
            User studentUser = null;
            if (attendance.getStudent() != null) {
                studentUser = attendance.getStudent().getUser();
                if (studentUser == null && attendance.getStudent().getUserId() != null) {
                    studentUser = userRepository.findById(attendance.getStudent().getUserId()).orElse(null);
                }
            }

            User lecturerUser = null;
            if (attendance.getLecturer() != null) {
                lecturerUser = attendance.getLecturer().getUser();
                if (lecturerUser == null && attendance.getLecturer().getUserId() != null) {
                    lecturerUser = userRepository.findById(attendance.getLecturer().getUserId()).orElse(null);
                }
            }

            String studentName = (studentUser != null && studentUser.getFullName() != null)
                    ? studentUser.getFullName()
                    : (attendance.getStudent() != null && attendance.getStudent().getMatricNumber() != null ? attendance.getStudent().getMatricNumber() : "Student");
            String lecturerName = (lecturerUser != null && lecturerUser.getFullName() != null)
                    ? lecturerUser.getFullName()
                    : "Lecturer";
            String dateStr = attendance.getAttendanceDate() != null ? attendance.getAttendanceDate().toString() : "the scheduled session";

            if (studentUser != null) {
                Notification studentNotif = new Notification();
                studentNotif.setUser(studentUser);
                studentNotif.setTitle("Attendance Update: Absence Excused");
                studentNotif.setMessage("Notice: Your absence for the consultation session with " + lecturerName + " on " + dateStr + " has been excused by the administrator.");
                studentNotif.setType("EXCUSED");
                studentNotif.setIsRead(false);
                studentNotif.setConsultation(attendance.getConsultation());
                studentNotif.setCreatedAt(LocalDateTime.now());
                notificationRepository.save(studentNotif);
            }

            if (lecturerUser != null) {
                Notification lectNotif = new Notification();
                lectNotif.setUser(lecturerUser);
                lectNotif.setTitle("Attendance Update: Student Absence Excused");
                lectNotif.setMessage("Notice: The absence for student " + studentName + " on " + dateStr + " has been excused by the administrator.");
                lectNotif.setType("EXCUSED");
                lectNotif.setIsRead(false);
                lectNotif.setConsultation(attendance.getConsultation());
                lectNotif.setCreatedAt(LocalDateTime.now());
                notificationRepository.save(lectNotif);
            }
        }

        Attendance savedAttendance = attendanceRepository.save(attendance);
        return toAdminAttendanceResponse(savedAttendance);
    }

    @PostMapping("/attendance/{id}/alert")
    @Transactional
    public ResponseEntity<?> sendNoShowAlert(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> payload) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found with id: " + id));

        attendance.setWarningIssued(true);
        attendanceRepository.save(attendance);

        String customMessage = (payload != null && payload.containsKey("message") && !payload.get("message").isBlank())
                ? payload.get("message")
                : null;

        User studentUser = null;
        if (attendance.getStudent() != null) {
            studentUser = attendance.getStudent().getUser();
            if (studentUser == null && attendance.getStudent().getUserId() != null) {
                studentUser = userRepository.findById(attendance.getStudent().getUserId()).orElse(null);
            }
        }

        User lecturerUser = null;
        if (attendance.getLecturer() != null) {
            lecturerUser = attendance.getLecturer().getUser();
            if (lecturerUser == null && attendance.getLecturer().getUserId() != null) {
                lecturerUser = userRepository.findById(attendance.getLecturer().getUserId()).orElse(null);
            }
        }

        String studentName = (studentUser != null && studentUser.getFullName() != null)
                ? studentUser.getFullName()
                : (attendance.getStudent() != null && attendance.getStudent().getMatricNumber() != null ? attendance.getStudent().getMatricNumber() : "Student");
        String lecturerName = (lecturerUser != null && lecturerUser.getFullName() != null)
                ? lecturerUser.getFullName()
                : "Lecturer";
        String dateStr = attendance.getAttendanceDate() != null ? attendance.getAttendanceDate().toString() : "the scheduled session";

        // 1. Notification for Student
        if (studentUser != null) {
            Notification studentNotif = new Notification();
            studentNotif.setUser(studentUser);
            studentNotif.setTitle("Attendance Warning: Missed Consultation");
            studentNotif.setMessage(customMessage != null ? customMessage :
                    "Warning: You were recorded as a NO-SHOW for your consultation session with " + lecturerName + " on " + dateStr + ". Please contact your lecturer or provide a valid reason.");
            studentNotif.setType("WARNING");
            studentNotif.setIsRead(false);
            studentNotif.setConsultation(attendance.getConsultation());
            studentNotif.setCreatedAt(LocalDateTime.now());
            notificationRepository.save(studentNotif);
        }

        // 2. Notification for Lecturer
        if (lecturerUser != null) {
            Notification lectNotif = new Notification();
            lectNotif.setUser(lecturerUser);
            lectNotif.setTitle("Attendance Notice: Student No-Show");
            lectNotif.setMessage(customMessage != null ? customMessage :
                    "Notice: Student " + studentName + " was marked as a NO-SHOW for the scheduled consultation session on " + dateStr + ".");
            lectNotif.setType("WARNING");
            lectNotif.setIsRead(false);
            lectNotif.setConsultation(attendance.getConsultation());
            lectNotif.setCreatedAt(LocalDateTime.now());
            notificationRepository.save(lectNotif);
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Warning notification has been sent to " + studentName + " and " + lecturerName + "."
        ));
    }

    private AdminAttendanceResponse toAdminAttendanceResponse(Attendance attendance) {
        boolean warningIssued = (attendance.getWarningIssued() != null && attendance.getWarningIssued());
        if (!warningIssued && attendance.getConsultation() != null && attendance.getConsultation().getId() != null) {
            warningIssued = notificationRepository.existsByConsultationIdAndType(attendance.getConsultation().getId(), "WARNING");
        }

        AdminAttendanceResponse response = new AdminAttendanceResponse(
                attendance.getId(),
                attendance.getConsultation() != null ? attendance.getConsultation().getId() : null,
                attendance.getStudent() != null ? attendance.getStudent().getUserId() : null,
                attendance.getStudent() != null && attendance.getStudent().getUser() != null
                ? attendance.getStudent().getUser().getFullName() : "Unknown Student",
                attendance.getStudent() != null ? attendance.getStudent().getMatricNumber() : "",
                attendance.getLecturer() != null ? attendance.getLecturer().getUserId() : null,
                attendance.getLecturer() != null && attendance.getLecturer().getUser() != null
                ? attendance.getLecturer().getUser().getFullName() : "Unknown Lecturer",
                attendance.getAttendanceDate() != null ? attendance.getAttendanceDate().toString() : "",
                attendance.getStatus() != null ? (attendance.getStatus() == Attendance.Status.NO_SHOW ? "NO-SHOW" : attendance.getStatus().name()) : "",
                attendance.getNotes() != null ? attendance.getNotes() : "",
                attendance.getMarkedBy() != null ? attendance.getMarkedBy().getId() : null,
                attendance.getMarkedBy() != null ? attendance.getMarkedBy().getFullName() : null,
                attendance.getMarkedAt() != null ? attendance.getMarkedAt().toString() : null
        );
        response.setWarningIssued(warningIssued);
        return response;
    }

    @GetMapping("/schools")
    public List<School> getAdminSchools() {
        return schoolRepository.findAll();
    }

    @GetMapping("/reports/analytics")
    @Transactional(readOnly = true)
    public AdminAnalyticsReportResponse getAnalyticsReport(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) Integer schoolId) {

        LocalDate start;
        LocalDate end;

        try {
            start = (startDate != null && !startDate.isBlank())
                    ? LocalDate.parse(startDate)
                    : LocalDate.now().minusMonths(1);
        } catch (Exception e) {
            start = LocalDate.now().minusMonths(1);
        }

        try {
            end = (endDate != null && !endDate.isBlank())
                    ? LocalDate.parse(endDate)
                    : LocalDate.now();
        } catch (Exception e) {
            end = LocalDate.now();
        }

        if (start.isAfter(end)) {
            LocalDate temp = start;
            start = end;
            end = temp;
        }

        final LocalDate effectiveStart = start;
        final LocalDate effectiveEnd = end;

        List<Consultation> all = consultationRepository.findAll();

        List<Consultation> filtered = all.stream()
                .filter(c -> {
                    if (c.getScheduledDate() == null) {
                        return false;
                    }
                    if (c.getScheduledDate().isBefore(effectiveStart) || c.getScheduledDate().isAfter(effectiveEnd)) {
                        return false;
                    }
                    if (schoolId != null && schoolId > 0) {
                        boolean match = false;
                        if (c.getStudent() != null && c.getStudent().getSchool() != null
                                && schoolId.equals(c.getStudent().getSchool().getId())) {
                            match = true;
                        }
                        if (c.getLecturer() != null && schoolId.equals(c.getLecturer().getSchoolId())) {
                            match = true;
                        }
                        return match;
                    }
                    return true;
                })
                .sorted((a, b) -> {
                    int d = a.getScheduledDate().compareTo(b.getScheduledDate());
                    if (d != 0) return d;
                    if (a.getScheduledTime() != null && b.getScheduledTime() != null) {
                        return a.getScheduledTime().compareTo(b.getScheduledTime());
                    }
                    return 0;
                })
                .toList();

        AdminAnalyticsReportResponse response = new AdminAnalyticsReportResponse();
        response.setStartDate(effectiveStart.toString());
        response.setEndDate(effectiveEnd.toString());
        response.setSchoolId(schoolId != null && schoolId > 0 ? schoolId : null);

        String schoolName = "All Schools";
        if (schoolId != null && schoolId > 0) {
            schoolName = schoolRepository.findById(schoolId)
                    .map(School::getName)
                    .orElse("School #" + schoolId);
        }
        response.setSchoolName(schoolName);

        int total = filtered.size();
        response.setTotalConsultations(total);

        int completed = 0;
        int noShow = 0;
        int cancelled = 0;
        int pending = 0;

        for (Consultation c : filtered) {
            Consultation.Status st = c.getStatus();
            if (st == null) {
                pending++;
            } else {
                switch (st) {
                    case COMPLETED -> completed++;
                    case NO_SHOW -> noShow++;
                    case CANCELLED, REJECTED -> cancelled++;
                    default -> pending++;
                }
            }
        }

        response.setCompletedCount(completed);
        response.setNoShowCount(noShow);
        response.setCancelledCount(cancelled);
        response.setPendingCount(pending);

        double compRate = total > 0 ? (completed * 100.0) / total : 0.0;
        response.setCompletionRate(String.format(Locale.US, "%.1f%%", compRate));

        // Top Lecturer
        Map<String, Long> lecturerCounts = filtered.stream()
                .filter(c -> c.getLecturer() != null && c.getLecturer().getUser() != null)
                .collect(Collectors.groupingBy(
                        c -> c.getLecturer().getUser().getFullName(),
                        Collectors.counting()
                ));

        var topLecturerEntry = lecturerCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue());

        if (topLecturerEntry.isPresent()) {
            response.setMostActiveLecturer(topLecturerEntry.get().getKey() + " (" + topLecturerEntry.get().getValue() + " sessions)");
        } else {
            response.setMostActiveLecturer("No sessions");
        }

        // Peak Day
        Map<DayOfWeek, Long> dayCounts = filtered.stream()
                .filter(c -> c.getScheduledDate() != null)
                .collect(Collectors.groupingBy(
                        c -> c.getScheduledDate().getDayOfWeek(),
                        Collectors.counting()
                ));

        var peakDayEntry = dayCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue());

        if (peakDayEntry.isPresent() && total > 0) {
            double dayPct = (peakDayEntry.get().getValue() * 100.0) / total;
            String dayName = peakDayEntry.get().getKey().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
            response.setPeakDay(String.format(Locale.US, "%s (%.0f%% of bookings)", dayName, dayPct));
        } else {
            response.setPeakDay("No bookings");
        }

        // Weekly Trend: calculate 4 dynamic intervals covering [effectiveStart, effectiveEnd]
        long totalDays = ChronoUnit.DAYS.between(effectiveStart, effectiveEnd) + 1;
        int numBuckets = 4;
        long bucketDays = Math.max(1, (totalDays + numBuckets - 1) / numBuckets);

        int[] counts = new int[numBuckets];
        for (Consultation c : filtered) {
            long diff = ChronoUnit.DAYS.between(effectiveStart, c.getScheduledDate());
            int bucket = (int) (diff / bucketDays);
            if (bucket >= numBuckets) bucket = numBuckets - 1;
            if (bucket < 0) bucket = 0;
            counts[bucket]++;
        }

        int maxWeeklyCount = 0;
        for (int c : counts) {
            if (c > maxWeeklyCount) maxWeeklyCount = c;
        }

        List<AdminAnalyticsReportResponse.WeeklyTrendItem> weeklyTrend = new ArrayList<>();
        for (int i = 0; i < numBuckets; i++) {
            LocalDate wStart = effectiveStart.plusDays(i * bucketDays);
            String label = "Week " + (i + 1);
            if (totalDays > 7) {
                label = "W" + (i + 1) + " (" + wStart.getMonthValue() + "/" + wStart.getDayOfMonth() + ")";
            }
            String height = maxWeeklyCount > 0
                    ? Math.max(10, Math.round((counts[i] * 100.0f) / maxWeeklyCount)) + "%"
                    : "0%";
            weeklyTrend.add(new AdminAnalyticsReportResponse.WeeklyTrendItem(label, counts[i], height));
        }
        response.setWeeklyTrend(weeklyTrend);

        // Status Distribution
        double completedPct = total > 0 ? Math.round((completed * 1000.0) / total) / 10.0 : 0.0;
        double noShowPct = total > 0 ? Math.round((noShow * 1000.0) / total) / 10.0 : 0.0;
        double cancelledPct = total > 0 ? Math.round((cancelled * 1000.0) / total) / 10.0 : 0.0;
        double pendingPct = total > 0 ? Math.round((pending * 1000.0) / total) / 10.0 : 0.0;

        response.setStatusDistribution(new AdminAnalyticsReportResponse.StatusDistribution(
                completed, completedPct,
                noShow, noShowPct,
                cancelled, cancelledPct,
                pending, pendingPct
        ));

        // Detailed consultations for report table & CSV export
        List<AdminAnalyticsReportResponse.ConsultationRecordItem> recordItems = filtered.stream()
                .map(c -> {
                    String sName = "Unknown";
                    if (c.getStudent() != null && c.getStudent().getSchool() != null) {
                        sName = c.getStudent().getSchool().getName();
                    } else if (c.getLecturer() != null && c.getLecturer().getSchoolId() != null) {
                        sName = schoolRepository.findById(c.getLecturer().getSchoolId())
                                .map(School::getName)
                                .orElse("School #" + c.getLecturer().getSchoolId());
                    }
                    String statusStr = "";
                    if (c.getStatus() != null) {
                        if (c.getStatus() == Consultation.Status.NO_SHOW) {
                            statusStr = "NO-SHOW";
                        } else if (c.getStatus() == Consultation.Status.RESCHEDULE_PENDING) {
                            statusStr = "RESCHEDULE-PENDING";
                        } else {
                            statusStr = c.getStatus().name();
                        }
                    }
                    return new AdminAnalyticsReportResponse.ConsultationRecordItem(
                            c.getId(),
                            c.getScheduledDate() != null ? c.getScheduledDate().toString() : "",
                            c.getScheduledTime() != null ? c.getScheduledTime().toString() : "",
                            c.getStudent() != null && c.getStudent().getUser() != null ? c.getStudent().getUser().getFullName() : "Unknown Student",
                            c.getStudent() != null && c.getStudent().getMatricNumber() != null ? c.getStudent().getMatricNumber() : "",
                            c.getLecturer() != null && c.getLecturer().getUser() != null ? c.getLecturer().getUser().getFullName() : "Unknown Lecturer",
                            sName,
                            c.getReason() != null ? c.getReason() : "",
                            c.getConsultationMode() != null ? c.getConsultationMode() : "",
                            statusStr
                    );
                })
                .toList();
        response.setConsultations(recordItems);

        return response;
    }
}
