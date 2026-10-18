package com.alcas.backend.service;

import com.alcas.backend.entity.Consultation;
import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.entity.Notification;
import com.alcas.backend.entity.StudentProfile;
import com.alcas.backend.entity.User;
import com.alcas.backend.repository.ConsultationRepository;
import com.alcas.backend.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Background scheduling service to handle automated consultation session reminders.
 *
 * Requirements:
 * Automatically dispatches reminder alerts to both Lecturer and Student:
 * - Trigger 1: Exactly 24 hours prior to the scheduled consultation session.
 * - Trigger 2: Exactly 1 hour prior to the scheduled consultation session.
 */
@Service
public class ConsultationReminderScheduler {

    private static final Logger log = LoggerFactory.getLogger(ConsultationReminderScheduler.class);

    private final ConsultationRepository consultationRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    @Value("${app.reminders.enabled:true}")
    private boolean remindersEnabled;

    public ConsultationReminderScheduler(
            ConsultationRepository consultationRepository,
            NotificationRepository notificationRepository,
            EmailService emailService
    ) {
        this.consultationRepository = consultationRepository;
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
    }

    /**
     * Periodic background job executing every minute to check and dispatch upcoming consultation reminders.
     * Cron expression "0 * * * * *" runs at second 00 of every minute.
     */
    @Scheduled(cron = "${app.scheduling.consultation-reminder-cron:0 * * * * *}")
    public void runScheduledRemindersJob() {
        if (!remindersEnabled) {
            return;
        }

        try {
            LocalDateTime now = LocalDateTime.now();
            checkAndDispatchReminders(now);
        } catch (Exception e) {
            log.error("[REMINDER SCHEDULER] Error during automated consultation reminder scan", e);
        }
    }

    /**
     * Identifies upcoming appointments matching the exact 24-hour and 1-hour timeframes
     * relative to the provided reference timestamp, and dispatches in-app and email alerts.
     *
     * @param referenceTime The reference timestamp (usually LocalDateTime.now())
     * @return Execution metrics and summary map
     */
    @Transactional
    public Map<String, Object> checkAndDispatchReminders(LocalDateTime referenceTime) {
        LocalDateTime currentMinute = referenceTime.truncatedTo(ChronoUnit.MINUTES);
        Map<String, Object> metrics = new HashMap<>();

        // Active statuses eligible for upcoming reminders
        List<Consultation.Status> eligibleStatuses = List.of(
                Consultation.Status.CONFIRMED,
                Consultation.Status.PENDING
        );

        // ---------------------------------------------------------------------
        // Trigger 1: Exactly 24 Hours Prior to Scheduled Session
        // ---------------------------------------------------------------------
        LocalDateTime target24h = currentMinute.plusHours(24);
        LocalDate targetDate24h = target24h.toLocalDate();
        LocalTime targetTime24h = target24h.toLocalTime().withSecond(0).withNano(0);

        List<Consultation> appointments24h = consultationRepository.findUpcomingExactTime(
                targetDate24h,
                targetTime24h,
                eligibleStatuses
        );

        int dispatched24h = 0;
        for (Consultation consultation : appointments24h) {
            boolean dispatched = dispatchReminderAlerts(consultation, "REMINDER_24H", "24 hours");
            if (dispatched) {
                dispatched24h++;
            }
        }

        // ---------------------------------------------------------------------
        // Trigger 2: Exactly 1 Hour Prior to Scheduled Session
        // ---------------------------------------------------------------------
        LocalDateTime target1h = currentMinute.plusHours(1);
        LocalDate targetDate1h = target1h.toLocalDate();
        LocalTime targetTime1h = target1h.toLocalTime().withSecond(0).withNano(0);

        List<Consultation> appointments1h = consultationRepository.findUpcomingExactTime(
                targetDate1h,
                targetTime1h,
                eligibleStatuses
        );

        int dispatched1h = 0;
        for (Consultation consultation : appointments1h) {
            boolean dispatched = dispatchReminderAlerts(consultation, "REMINDER_1H", "1 hour");
            if (dispatched) {
                dispatched1h++;
            }
        }

        metrics.put("referenceTimestamp", currentMinute.toString());
        metrics.put("trigger24hTarget", target24h.toString());
        metrics.put("trigger24hMatchedCount", appointments24h.size());
        metrics.put("trigger24hDispatchedCount", dispatched24h);
        metrics.put("trigger1hTarget", target1h.toString());
        metrics.put("trigger1hMatchedCount", appointments1h.size());
        metrics.put("trigger1hDispatchedCount", dispatched1h);
        metrics.put("status", "SUCCESS");

        if (dispatched24h > 0 || dispatched1h > 0) {
            log.info("[REMINDER SCHEDULER] Reminders dispatched | 24H: {} | 1H: {} | Reference: {}",
                    dispatched24h, dispatched1h, currentMinute);
        }

        return metrics;
    }

    /**
     * Executes the notification dispatch function for both Lecturer and Student.
     * Prevents duplicate alerts by verifying if a reminder of the same type has already been recorded.
     *
     * @param consultation   The upcoming consultation session
     * @param reminderType   Unique reminder identifier ("REMINDER_24H" or "REMINDER_1H")
     * @param timeframeLabel Human-readable timeframe label ("24 hours" or "1 hour")
     * @return true if alerts were dispatched; false if already previously dispatched
     */
    public boolean dispatchReminderAlerts(
            Consultation consultation,
            String reminderType,
            String timeframeLabel
    ) {
        if (consultation == null) {
            return false;
        }

        String consultationId = consultation.getId();

        // Duplicate prevention check: Verify if this reminder was already processed
        boolean alreadyDispatched = notificationRepository.existsByConsultationIdAndType(consultationId, reminderType);
        if (alreadyDispatched) {
            return false;
        }

        StudentProfile studentProfile = consultation.getStudent();
        LecturerProfile lecturerProfile = consultation.getLecturer();

        User studentUser = studentProfile != null ? studentProfile.getUser() : null;
        User lecturerUser = lecturerProfile != null ? lecturerProfile.getUser() : null;

        String dateStr = consultation.getScheduledDate() != null ? consultation.getScheduledDate().toString() : "";
        String timeStr = consultation.getScheduledTime() != null ? consultation.getScheduledTime().toString() : "";
        String mode = consultation.getConsultationMode() != null ? consultation.getConsultationMode() : "Face to Face";
        String location = consultation.getLocation() != null && !consultation.getLocation().isBlank()
                ? consultation.getLocation()
                : ("Online".equalsIgnoreCase(mode) ? "Virtual Meeting Room" : "Lecturer Office");

        String studentName = studentUser != null && studentUser.getFullName() != null
                ? studentUser.getFullName()
                : "Student";
        String lecturerName = lecturerUser != null && lecturerUser.getFullName() != null
                ? lecturerUser.getFullName()
                : "Lecturer";

        LocalDateTime now = LocalDateTime.now();

        // ---------------------------------------------------------------------
        // 1. Dispatch Alert to Student (In-App + Email)
        // ---------------------------------------------------------------------
        if (studentUser != null) {
            Notification studentNotif = new Notification();
            studentNotif.setUser(studentUser);
            studentNotif.setTitle("Upcoming Consultation (" + timeframeLabel + ")");
            studentNotif.setMessage("Reminder: You have an upcoming consultation with "
                    + lecturerName + " scheduled for " + dateStr + " at " + timeStr
                    + " (" + mode + " - " + location + ").");
            studentNotif.setType(reminderType);
            studentNotif.setConsultation(consultation);
            studentNotif.setIsRead(false);
            studentNotif.setCreatedAt(now);

            notificationRepository.save(studentNotif);

            if (studentUser.getEmail() != null && !studentUser.getEmail().isBlank()) {
                emailService.sendConsultationReminderEmail(
                        studentUser.getEmail(),
                        studentUser.getFullName(),
                        "Student",
                        lecturerName,
                        dateStr,
                        timeStr,
                        location,
                        mode,
                        timeframeLabel
                );
            }
        }

        // ---------------------------------------------------------------------
        // 2. Dispatch Alert to Lecturer (In-App + Email)
        // ---------------------------------------------------------------------
        if (lecturerUser != null) {
            Notification lecturerNotif = new Notification();
            lecturerNotif.setUser(lecturerUser);
            lecturerNotif.setTitle("Upcoming Consultation (" + timeframeLabel + ")");
            lecturerNotif.setMessage("Reminder: Consultation session with student "
                    + studentName + " is scheduled for " + dateStr + " at " + timeStr
                    + " (" + mode + " - " + location + ").");
            lecturerNotif.setType(reminderType);
            lecturerNotif.setConsultation(consultation);
            lecturerNotif.setIsRead(false);
            lecturerNotif.setCreatedAt(now);

            notificationRepository.save(lecturerNotif);

            if (lecturerUser.getEmail() != null && !lecturerUser.getEmail().isBlank()) {
                emailService.sendConsultationReminderEmail(
                        lecturerUser.getEmail(),
                        lecturerUser.getFullName(),
                        "Lecturer",
                        studentName,
                        dateStr,
                        timeStr,
                        location,
                        mode,
                        timeframeLabel
                );
            }
        }

        log.info("[REMINDER DISPATCH] Alert dispatched for Consultation [{}] | Window: {} | Date: {} {}",
                consultationId, timeframeLabel, dateStr, timeStr);

        return true;
    }
}
