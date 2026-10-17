package com.alcas.backend.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.alcas.backend.entity.Consultation;
import com.alcas.backend.entity.LecturerSchedule;
import com.alcas.backend.entity.Notification;
import com.alcas.backend.entity.StudentClassSchedule;
import com.alcas.backend.entity.User;
import com.alcas.backend.exception.BookingConflictException;
import com.alcas.backend.exception.UnauthorizedException;
import com.alcas.backend.repository.ConsultationRepository;
import com.alcas.backend.repository.LecturerScheduleRepository;
import com.alcas.backend.repository.NotificationRepository;
import com.alcas.backend.repository.StudentClassScheduleRepository;
import com.alcas.backend.repository.UserRepository;

@Service
public class ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final UserRepository userRepository;
    private final LecturerScheduleRepository lecturerScheduleRepository;
    private final StudentClassScheduleRepository studentClassScheduleRepository;
    private final NotificationRepository notificationRepository;
    private final SystemSettingService systemSettingService;

    public ConsultationService(
            ConsultationRepository consultationRepository,
            UserRepository userRepository,
            LecturerScheduleRepository lecturerScheduleRepository,
            StudentClassScheduleRepository studentClassScheduleRepository,
            NotificationRepository notificationRepository,
            SystemSettingService systemSettingService) {

        this.consultationRepository = consultationRepository;
        this.userRepository = userRepository;
        this.lecturerScheduleRepository = lecturerScheduleRepository;
        this.studentClassScheduleRepository = studentClassScheduleRepository;
        this.notificationRepository = notificationRepository;
        this.systemSettingService = systemSettingService;
    }

    public Consultation createConsultation(
            Consultation consultation) {

        Integer lecturerId
                = consultation.getLecturer().getUserId();

        LocalDate scheduledDate
                = consultation.getScheduledDate();

        // 1. Validate Academic Calendar
        String semesterStart = systemSettingService.getSettingValue("SEMESTER_START_DATE", null);
        String semesterEnd = systemSettingService.getSettingValue("SEMESTER_END_DATE", null);

        if (semesterStart != null && !semesterStart.trim().isEmpty()) {
            try {
                LocalDate start = LocalDate.parse(semesterStart.trim());
                if (scheduledDate.isBefore(start)) {
                    throw new BookingConflictException(
                            "Booking is not allowed before the academic semester start date (" + start + ")."
                    );
                }
            } catch (java.time.format.DateTimeParseException ignored) {
            }
        }

        if (semesterEnd != null && !semesterEnd.trim().isEmpty()) {
            try {
                LocalDate end = LocalDate.parse(semesterEnd.trim());
                if (scheduledDate.isAfter(end)) {
                    throw new BookingConflictException(
                            "Booking is not allowed after the academic semester end date (" + end + ")."
                    );
                }
            } catch (java.time.format.DateTimeParseException ignored) {
            }
        }

        // 2. Validate Global Block-Out Dates (Holidays / Special Breaks)
        String globalBlockDatesJson = systemSettingService.getSettingValue("GLOBAL_BLOCK_OUT_DATES", null);
        if (globalBlockDatesJson != null && globalBlockDatesJson.contains("\"" + scheduledDate.toString() + "\"")) {
            throw new BookingConflictException(
                    "The selected date (" + scheduledDate + ") is a scheduled holiday / block-out date."
            );
        }

        LocalTime scheduledTime
                = consultation.getScheduledTime();

        // Get the day of the requested date
        DayOfWeek dayOfWeek
                = scheduledDate.getDayOfWeek();

        String dayName
                = dayOfWeek.getDisplayName(
                        TextStyle.FULL,
                        Locale.ENGLISH
                );

        // 3. Validate student's class schedule (no clash with student's class)
        if (consultation.getStudent() != null && consultation.getStudent().getUserId() != null) {
            Integer studentUserId = consultation.getStudent().getUserId();
            List<StudentClassSchedule> studentSchedules =
                    studentClassScheduleRepository.findByStudentUserId(studentUserId);

            boolean clashesWithClass = studentSchedules.stream()
                    .filter(s -> s.getDayOfWeek() != null && s.getDayOfWeek().equalsIgnoreCase(dayName))
                    .anyMatch(s -> {
                        LocalTime classStart = parseTimeSlot(s.getTimeSlot());
                        if (classStart == null) return false;
                        LocalTime classEnd = classStart.plusMinutes(60);
                        LocalTime slotEnd = scheduledTime.plusMinutes(30);

                        return scheduledTime.isBefore(classEnd) && slotEnd.isAfter(classStart);
                    });

            if (clashesWithClass) {
                throw new BookingConflictException(
                        "Clash with class time: You cannot book a consultation during your scheduled class."
                );
            }
        }

// Get lecturer's schedule for that day
        List<LecturerSchedule> schedules
                = lecturerScheduleRepository
                        .findByLecturerUserIdAndDayOfWeek(
                                lecturerId,
                                dayName
                        );

// Check whether the requested 30-minute slot
// is inside an AVAILABLE schedule
        boolean insideAvailableSchedule
                = schedules.stream()
                        .filter(schedule
                                -> "AVAILABLE".equalsIgnoreCase(
                                        schedule.getSlotType()
                                )
                        )
                        .anyMatch(schedule -> {

                            LocalTime slotEnd
                                    = scheduledTime.plusMinutes(30);

                            return !scheduledTime.isBefore(
                                    schedule.getStartTime()
                            )
                                    && !slotEnd.isAfter(
                                            schedule.getEndTime()
                                    );
                        });

        if (!insideAvailableSchedule) {
            throw new BookingConflictException(
                    "This time slot is not available for consultation."
            );
        }

// Check whether the requested slot overlaps
// CLASS or BUSY schedules
        boolean overlapsUnavailableSchedule
                = schedules.stream()
                        .filter(schedule
                                -> "CLASS".equalsIgnoreCase(
                                        schedule.getSlotType()
                                )
                                || "BUSY".equalsIgnoreCase(
                                        schedule.getSlotType()
                                )
                        )
                        .anyMatch(schedule -> {

                            LocalTime slotEnd
                                    = scheduledTime.plusMinutes(30);

                            return scheduledTime.isBefore(
                                    schedule.getEndTime()
                            )
                                    && slotEnd.isAfter(
                                            schedule.getStartTime()
                                    );
                        });

        if (overlapsUnavailableSchedule) {
            throw new BookingConflictException(
                    "This time slot is not available for consultation."
            );
        }

        boolean alreadyBooked
                = consultationRepository
                        .existsByLecturerUserIdAndScheduledDateAndScheduledTimeAndStatusIn(
                                lecturerId,
                                scheduledDate,
                                scheduledTime,
                                List.of(
                                        Consultation.Status.PENDING,
                                        Consultation.Status.CONFIRMED
                                )
                        );

        if (alreadyBooked) {
            throw new BookingConflictException(
                    "This time slot is already booked."
            );
        }

        if (consultation.getId() == null
                || consultation.getId().isBlank()) {

            consultation.setId(
                    UUID.randomUUID().toString()
            );
        }

        LocalDateTime now = LocalDateTime.now();

        consultation.setStatus(
                Consultation.Status.PENDING
        );

        consultation.setCreatedAt(now);
        consultation.setUpdatedAt(now);

        Consultation saved = consultationRepository.save(consultation);

        try {
            if (saved.getStudent() != null && saved.getStudent().getUser() != null) {
                Notification notif = new Notification();
                notif.setUser(saved.getStudent().getUser());
                notif.setTitle("Booking Submitted Successfully");
                String lecturerName = (saved.getLecturer() != null && saved.getLecturer().getUser() != null)
                        ? saved.getLecturer().getUser().getFullName()
                        : "Lecturer";
                notif.setMessage("Your consultation request with " + lecturerName + " for "
                        + saved.getScheduledDate() + " at " + saved.getScheduledTime() + " has been submitted.");
                notif.setType("BOOKING");
                notif.setIsRead(false);
                notif.setConsultation(saved);
                notif.setCreatedAt(now);
                notificationRepository.save(notif);
            }
        } catch (Exception ignored) {
        }

        return saved;
    }

    public List<Consultation> findByStudentId(Integer studentId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User authenticatedUser
                = userRepository.findByEmail(email)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Authenticated user not found"
                                ));

        if (!authenticatedUser.getId().equals(studentId)) {
            throw new UnauthorizedException(
                    "You are not allowed to view another student's consultations"
            );
        }

        return consultationRepository
                .findByStudentUserIdOrderByScheduledDateAscScheduledTimeAsc(
                        studentId
                );
    }

    public List<Consultation> findByLecturerId(Integer lecturerId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User authenticatedUser
                = userRepository.findByEmail(email)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Authenticated user not found"
                                ));

        if (!authenticatedUser.getId().equals(lecturerId)) {
            throw new UnauthorizedException(
                    "You are not allowed to view another lecturer's consultations"
            );
        }

        return consultationRepository
                .findByLecturerUserIdOrderByScheduledDateAscScheduledTimeAsc(
                        lecturerId
                );
    }

    public Consultation approveConsultation(
            String consultationId,
            Integer lecturerId,
            String location,
            String remarks) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User authenticatedUser
                = userRepository.findByEmail(email)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Authenticated user not found"
                                ));

        if (!authenticatedUser.getId().equals(lecturerId)) {
            throw new UnauthorizedException(
                    "You are not allowed to approve consultations for another lecturer"
            );
        }

        Consultation consultation
                = consultationRepository.findById(consultationId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Consultation not found"
                                ));

        // Make sure this consultation belongs to this lecturer
        if (!consultation.getLecturer().getUserId().equals(lecturerId)) {
            throw new UnauthorizedException(
                    "You are not allowed to approve this consultation."
            );
        }

        // Only PENDING or RESCHEDULE_PENDING consultations can be approved
        if (consultation.getStatus() != Consultation.Status.PENDING
                && consultation.getStatus() != Consultation.Status.RESCHEDULE_PENDING) {
            throw new RuntimeException(
                    "Only pending consultations can be approved."
            );
        }

        if (consultation.getProposedDate() != null) {
            consultation.setScheduledDate(consultation.getProposedDate());
            consultation.setProposedDate(null);
        }
        if (consultation.getProposedTime() != null) {
            consultation.setScheduledTime(consultation.getProposedTime());
            consultation.setProposedTime(null);
        }

        consultation.setLocation(location);
        consultation.setLecturerRemarks(remarks);

        consultation.setStatus(
                Consultation.Status.CONFIRMED
        );
        consultation.setRescheduleInitiator(null);

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        return consultationRepository.save(consultation);
    }

    public Consultation rejectConsultation(
            String consultationId,
            Integer lecturerId,
            String rejectReason) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User authenticatedUser
                = userRepository.findByEmail(email)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Authenticated user not found"
                                ));

        if (!authenticatedUser.getId().equals(lecturerId)) {
            throw new UnauthorizedException(
                    "You are not allowed to reject consultations for another lecturer"
            );
        }

        Consultation consultation
                = consultationRepository.findById(consultationId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Consultation not found"
                                ));

        // Make sure this consultation belongs to this lecturer
        if (!consultation.getLecturer().getUserId().equals(lecturerId)) {
            throw new UnauthorizedException(
                    "You are not allowed to reject this consultation."
            );
        }

        // Only PENDING consultations can be rejected
        if (consultation.getStatus() != Consultation.Status.PENDING) {
            throw new RuntimeException(
                    "Only pending consultations can be rejected."
            );
        }

        consultation.setStatus(
                Consultation.Status.REJECTED
        );
        consultation.setRescheduleInitiator(null);

        consultation.setRejectReason(rejectReason);

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        return consultationRepository.save(consultation);
    }

    public Consultation requestReschedule(
            String consultationId,
            Integer userId,
            LocalDate proposedDate,
            LocalTime proposedTime,
            String rescheduleReason) {

        Consultation consultation
                = consultationRepository.findById(consultationId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Consultation not found"
                                ));

        User authenticatedUser = userRepository.findById(userId).orElse(null);
        boolean isLecturer = (authenticatedUser != null && authenticatedUser.getRole() == User.Role.LECTURER)
                || (consultation.getLecturer() != null && consultation.getLecturer().getUserId() != null && consultation.getLecturer().getUserId().equals(userId))
                || (consultation.getLecturer() != null && consultation.getLecturer().getUser() != null && consultation.getLecturer().getUser().getId().equals(userId));
        boolean isStudent = (authenticatedUser != null && authenticatedUser.getRole() == User.Role.STUDENT)
                || (consultation.getStudent() != null && consultation.getStudent().getUserId() != null && consultation.getStudent().getUserId().equals(userId))
                || (consultation.getStudent() != null && consultation.getStudent().getUser() != null && consultation.getStudent().getUser().getId().equals(userId));

        if (!isLecturer && !isStudent) {
            throw new UnauthorizedException(
                    "You are not allowed to reschedule this consultation."
            );
        }

        // Only CONFIRMED or PENDING consultations can be rescheduled
        if (consultation.getStatus() != Consultation.Status.CONFIRMED
                && consultation.getStatus() != Consultation.Status.PENDING) {
            throw new RuntimeException(
                    "Only confirmed or pending consultations can be rescheduled."
            );
        }

        Integer lecturerId = consultation.getLecturer().getUserId();

        // Get the day of the proposed date
        DayOfWeek dayOfWeek
                = proposedDate.getDayOfWeek();

        String dayName
                = dayOfWeek.getDisplayName(
                        TextStyle.FULL,
                        Locale.ENGLISH
                );

        // Get lecturer's schedule for that day
        List<LecturerSchedule> schedules
                = lecturerScheduleRepository
                        .findByLecturerUserIdAndDayOfWeek(
                                lecturerId,
                                dayName
                        );

        if (!schedules.isEmpty()) {
            boolean overlapsUnavailableSchedule
                    = schedules.stream()
                            .filter(schedule
                                    -> "CLASS".equalsIgnoreCase(
                                            schedule.getSlotType()
                                    )
                                    || "BUSY".equalsIgnoreCase(
                                            schedule.getSlotType()
                                    )
                            )
                            .anyMatch(schedule -> {
                                LocalTime proposedEnd
                                        = proposedTime.plusMinutes(30);

                                return proposedTime.isBefore(
                                        schedule.getEndTime()
                                )
                                        && proposedEnd.isAfter(
                                                schedule.getStartTime()
                                        );
                            });

            if (overlapsUnavailableSchedule) {
                throw new BookingConflictException(
                        "The proposed time is not available for consultation."
                );
            }
        }

        consultation.setProposedDate(proposedDate);
        consultation.setProposedTime(proposedTime);
        consultation.setRescheduleReason(rescheduleReason);

        if (isStudent) {
            consultation.setStatus(Consultation.Status.PENDING);
            consultation.setRescheduleInitiator("STUDENT");
        } else {
            consultation.setStatus(Consultation.Status.RESCHEDULE_PENDING);
            consultation.setRescheduleInitiator("LECTURER");
        }

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        Consultation saved = consultationRepository.save(consultation);

        try {
            if (saved.getStudent() != null && saved.getStudent().getUser() != null) {
                Notification notif = new Notification();
                notif.setUser(saved.getStudent().getUser());
                String lecturerName = (saved.getLecturer() != null && saved.getLecturer().getUser() != null)
                        ? saved.getLecturer().getUser().getFullName()
                        : "Lecturer";
                if (isStudent) {
                    notif.setTitle("Reschedule Requested Successfully");
                    notif.setMessage("Your request to reschedule consultation with " + lecturerName + " to "
                            + saved.getProposedDate() + " at " + saved.getProposedTime() + " has been submitted.");
                } else {
                    notif.setTitle("Reschedule Proposed by Lecturer");
                    notif.setMessage(lecturerName + " has proposed a new time for your consultation: "
                            + saved.getProposedDate() + " at " + saved.getProposedTime() + ".");
                }
                notif.setType("RESCHEDULE");
                notif.setIsRead(false);
                notif.setConsultation(saved);
                notif.setCreatedAt(LocalDateTime.now());
                notificationRepository.save(notif);
            }
        } catch (Exception ignored) {
        }

        return saved;
    }

    public Consultation acceptReschedule(
            String consultationId,
            Integer userId) {

        Consultation consultation
                = consultationRepository.findById(consultationId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Consultation not found"
                                ));

        boolean isStudent = consultation.getStudent() != null
                && consultation.getStudent().getUserId().equals(userId);
        boolean isLecturer = consultation.getLecturer() != null
                && consultation.getLecturer().getUserId().equals(userId);

        if (!isStudent && !isLecturer) {
            throw new UnauthorizedException(
                    "You are not allowed to accept this reschedule."
            );
        }

        // Only RESCHEDULE_PENDING consultations (or student-initiated PENDING) can be accepted
        if (consultation.getStatus() != Consultation.Status.RESCHEDULE_PENDING
                && !(consultation.getStatus() == Consultation.Status.PENDING && "STUDENT".equals(consultation.getRescheduleInitiator()))) {

            throw new RuntimeException(
                    "This consultation does not have a pending reschedule."
            );
        }

        if (consultation.getProposedDate() == null
                || consultation.getProposedTime() == null) {

            throw new RuntimeException(
                    "No proposed date and time found."
            );
        }

        consultation.setScheduledDate(
                consultation.getProposedDate()
        );

        consultation.setScheduledTime(
                consultation.getProposedTime()
        );

        consultation.setProposedDate(null);
        consultation.setProposedTime(null);
        consultation.setRescheduleInitiator(null);

        consultation.setStatus(
                Consultation.Status.CONFIRMED
        );

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        Consultation saved = consultationRepository.save(consultation);

        try {
            if (saved.getStudent() != null && saved.getStudent().getUser() != null) {
                Notification notif = new Notification();
                notif.setUser(saved.getStudent().getUser());
                notif.setTitle("Reschedule Confirmed");
                String lecturerName = (saved.getLecturer() != null && saved.getLecturer().getUser() != null)
                        ? saved.getLecturer().getUser().getFullName()
                        : "Lecturer";
                notif.setMessage("You accepted the proposed consultation time with " + lecturerName
                        + ". Your session is now confirmed for " + saved.getScheduledDate() + " at " + saved.getScheduledTime() + ".");
                notif.setType("RESCHEDULE");
                notif.setIsRead(false);
                notif.setConsultation(saved);
                notif.setCreatedAt(LocalDateTime.now());
                notificationRepository.save(notif);
            }
        } catch (Exception ignored) {
        }

        return saved;
    }

    public Consultation rejectReschedule(
            String consultationId,
            Integer userId) {

        Consultation consultation
                = consultationRepository.findById(consultationId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Consultation not found"
                                ));

        boolean isStudent = consultation.getStudent() != null
                && consultation.getStudent().getUserId().equals(userId);
        boolean isLecturer = consultation.getLecturer() != null
                && consultation.getLecturer().getUserId().equals(userId);

        if (!isStudent && !isLecturer) {
            throw new UnauthorizedException(
                    "You are not allowed to reject this reschedule."
            );
        }

        // Only RESCHEDULE_PENDING consultations (or student-initiated PENDING) can be rejected
        if (consultation.getStatus() != Consultation.Status.RESCHEDULE_PENDING
                && !(consultation.getStatus() == Consultation.Status.PENDING && "STUDENT".equals(consultation.getRescheduleInitiator()))) {

            throw new RuntimeException(
                    "This consultation does not have a pending reschedule."
            );
        }

        consultation.setProposedDate(null);
        consultation.setProposedTime(null);
        consultation.setRescheduleInitiator(null);

        consultation.setStatus(
                Consultation.Status.CONFIRMED
        );

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        Consultation saved = consultationRepository.save(consultation);

        try {
            if (saved.getStudent() != null && saved.getStudent().getUser() != null) {
                Notification notif = new Notification();
                notif.setUser(saved.getStudent().getUser());
                notif.setTitle("Reschedule Proposal Rejected");
                String lecturerName = (saved.getLecturer() != null && saved.getLecturer().getUser() != null)
                        ? saved.getLecturer().getUser().getFullName()
                        : "Lecturer";
                notif.setMessage("You rejected the proposed reschedule time with " + lecturerName
                        + ". Your appointment remains confirmed for " + saved.getScheduledDate() + " at " + saved.getScheduledTime() + ".");
                notif.setType("RESCHEDULE");
                notif.setIsRead(false);
                notif.setConsultation(saved);
                notif.setCreatedAt(LocalDateTime.now());
                notificationRepository.save(notif);
            }
        } catch (Exception ignored) {
        }

        return saved;
    }

    public Consultation cancelConsultation(
            String consultationId,
            Integer studentId,
            String cancelReason) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User authenticatedUser
                = userRepository.findByEmail(email)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Authenticated user not found"
                                ));

        if (!authenticatedUser.getId().equals(studentId)) {
            throw new UnauthorizedException(
                    "You are not allowed to cancel consultations for another student"
            );
        }

        Consultation consultation
                = consultationRepository.findById(consultationId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                        "Consultation not found"
                                ));

        // Make sure the consultation belongs to this student
        if (!consultation.getStudent().getUserId().equals(studentId)) {
            throw new UnauthorizedException(
                    "You are not allowed to cancel this consultation."
            );
        }

        // Only PENDING or CONFIRMED consultations can be cancelled
        if (consultation.getStatus() != Consultation.Status.PENDING
                && consultation.getStatus() != Consultation.Status.CONFIRMED) {

            throw new RuntimeException(
                    "This consultation cannot be cancelled."
            );
        }

        consultation.setStatus(
                Consultation.Status.CANCELLED
        );

        consultation.setCancelReason(cancelReason);

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        Consultation saved = consultationRepository.save(consultation);

        try {
            if (saved.getStudent() != null && saved.getStudent().getUser() != null) {
                Notification notif = new Notification();
                notif.setUser(saved.getStudent().getUser());
                notif.setTitle("Consultation Cancelled");
                String lecturerName = (saved.getLecturer() != null && saved.getLecturer().getUser() != null)
                        ? saved.getLecturer().getUser().getFullName()
                        : "Lecturer";
                notif.setMessage("Your consultation session with " + lecturerName + " on "
                        + saved.getScheduledDate() + " at " + saved.getScheduledTime() + " has been successfully cancelled.");
                notif.setType("CANCELLATION");
                notif.setIsRead(false);
                notif.setConsultation(saved);
                notif.setCreatedAt(LocalDateTime.now());
                notificationRepository.save(notif);
            }
        } catch (Exception ignored) {
        }

        return saved;
    }

    private LocalTime parseTimeSlot(String timeStr) {
        if (timeStr == null || timeStr.trim().isEmpty()) {
            return null;
        }
        String clean = timeStr.trim().toUpperCase();
        try {
            java.time.format.DateTimeFormatter dtf = new java.time.format.DateTimeFormatterBuilder()
                    .parseCaseInsensitive()
                    .appendPattern("[hh:mm a][h:mm a][HH:mm][H:mm]")
                    .toFormatter(Locale.ENGLISH);
            return LocalTime.parse(clean, dtf);
        } catch (Exception e) {
            return null;
        }
    }
}
