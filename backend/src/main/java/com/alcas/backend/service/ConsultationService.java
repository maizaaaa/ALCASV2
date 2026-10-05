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
import com.alcas.backend.entity.User;
import com.alcas.backend.exception.BookingConflictException;
import com.alcas.backend.exception.UnauthorizedException;
import com.alcas.backend.repository.ConsultationRepository;
import com.alcas.backend.repository.LecturerScheduleRepository;
import com.alcas.backend.repository.UserRepository;

@Service
public class ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final UserRepository userRepository;
    private final LecturerScheduleRepository lecturerScheduleRepository;

    public ConsultationService(
            ConsultationRepository consultationRepository,
            UserRepository userRepository,
            LecturerScheduleRepository lecturerScheduleRepository) {

        this.consultationRepository = consultationRepository;
        this.userRepository = userRepository;
        this.lecturerScheduleRepository = lecturerScheduleRepository;
    }

    public Consultation createConsultation(
            Consultation consultation) {

        Integer lecturerId
                = consultation.getLecturer().getUserId();

        LocalDate scheduledDate
                = consultation.getScheduledDate();

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

        return consultationRepository.save(consultation);
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
            Integer lecturerId) {

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

        // Only PENDING consultations can be approved
        if (consultation.getStatus() != Consultation.Status.PENDING) {
            throw new RuntimeException(
                    "Only pending consultations can be approved."
            );
        }

        consultation.setStatus(
                Consultation.Status.CONFIRMED
        );

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

        consultation.setRejectReason(rejectReason);

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        return consultationRepository.save(consultation);
    }

    public Consultation requestReschedule(
            String consultationId,
            Integer lecturerId,
            LocalDate proposedDate,
            LocalTime proposedTime,
            String rescheduleReason) {

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

// Check whether the proposed 30-minute slot
// is inside an AVAILABLE schedule
        boolean insideAvailableSchedule
                = schedules.stream()
                        .filter(schedule
                                -> "AVAILABLE".equalsIgnoreCase(
                                schedule.getSlotType()
                        )
                        )
                        .anyMatch(schedule -> {

                            LocalTime proposedEnd
                                    = proposedTime.plusMinutes(30);

                            return !proposedTime.isBefore(
                                    schedule.getStartTime()
                            )
                                    && !proposedEnd.isAfter(
                                            schedule.getEndTime()
                                    );
                        });

        if (!insideAvailableSchedule) {
            throw new BookingConflictException(
                    "The proposed time is not available for consultation."
            );
        }

// Check whether the proposed slot overlaps
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
                    "You are not allowed to reschedule consultations for another lecturer"
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
                    "You are not allowed to reschedule this consultation."
            );
        }

        // Only CONFIRMED consultations can be rescheduled
        if (consultation.getStatus() != Consultation.Status.CONFIRMED) {
            throw new RuntimeException(
                    "Only confirmed consultations can be rescheduled."
            );
        }

        consultation.setProposedDate(proposedDate);
        consultation.setProposedTime(proposedTime);
        consultation.setRescheduleReason(rescheduleReason);

        consultation.setStatus(
                Consultation.Status.RESCHEDULE_PENDING
        );

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        return consultationRepository.save(consultation);
    }

    public Consultation acceptReschedule(
            String consultationId,
            Integer studentId) {

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
                    "You are not allowed to accept reschedules for another student"
            );
        }

        Consultation consultation
                = consultationRepository.findById(consultationId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Consultation not found"
                        ));

        // Make sure this consultation belongs to this student
        if (!consultation.getStudent().getUserId().equals(studentId)) {
            throw new UnauthorizedException(
                    "You are not allowed to accept this reschedule."
            );
        }

        // Only RESCHEDULE_PENDING consultations can be accepted
        if (consultation.getStatus()
                != Consultation.Status.RESCHEDULE_PENDING) {

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

        consultation.setStatus(
                Consultation.Status.CONFIRMED
        );

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        return consultationRepository.save(consultation);
    }

    public Consultation rejectReschedule(
            String consultationId,
            Integer studentId) {

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
                    "You are not allowed to reject reschedules for another student"
            );
        }

        Consultation consultation
                = consultationRepository.findById(consultationId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Consultation not found"
                        ));

        // Make sure this consultation belongs to this student
        if (!consultation.getStudent().getUserId().equals(studentId)) {
            throw new UnauthorizedException(
                    "You are not allowed to reject this reschedule."
            );
        }

        // Only RESCHEDULE_PENDING consultations can be rejected
        if (consultation.getStatus()
                != Consultation.Status.RESCHEDULE_PENDING) {

            throw new RuntimeException(
                    "This consultation does not have a pending reschedule."
            );
        }

        consultation.setProposedDate(null);
        consultation.setProposedTime(null);

        consultation.setStatus(
                Consultation.Status.CONFIRMED
        );

        consultation.setUpdatedAt(
                LocalDateTime.now()
        );

        return consultationRepository.save(consultation);
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

        return consultationRepository.save(consultation);
    }
}
