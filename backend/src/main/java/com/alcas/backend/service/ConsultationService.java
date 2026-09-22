package com.alcas.backend.service;

import com.alcas.backend.entity.Consultation;
import com.alcas.backend.repository.ConsultationRepository;
import com.alcas.backend.exception.BookingConflictException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
public class ConsultationService {

    private final ConsultationRepository consultationRepository;

    public ConsultationService(
            ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    public Consultation createConsultation(
            Consultation consultation) {

        Integer lecturerId =
                consultation.getLecturer().getUserId();

        LocalDate scheduledDate =
                consultation.getScheduledDate();

        LocalTime scheduledTime =
                consultation.getScheduledTime();

        boolean alreadyBooked =
                consultationRepository
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

        if (consultation.getId() == null ||
                consultation.getId().isBlank()) {

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

        return consultationRepository
                .findByStudentUserIdOrderByScheduledDateAscScheduledTimeAsc(
                        studentId
                );
    }

    public List<Consultation> findByLecturerId(Integer lecturerId) {

        return consultationRepository
                .findByLecturerUserIdOrderByScheduledDateAscScheduledTimeAsc(
                        lecturerId
                );
    }

    public Consultation approveConsultation(
            String consultationId,
            Integer lecturerId) {

        Consultation consultation =
                consultationRepository.findById(consultationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Consultation not found"
                                ));

        // Make sure this consultation belongs to this lecturer
        if (!consultation.getLecturer().getUserId().equals(lecturerId)) {
            throw new RuntimeException(
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

        Consultation consultation =
                consultationRepository.findById(consultationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Consultation not found"
                                ));

        // Make sure this consultation belongs to this lecturer
        if (!consultation.getLecturer().getUserId().equals(lecturerId)) {
            throw new RuntimeException(
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

        Consultation consultation =
                consultationRepository.findById(consultationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Consultation not found"
                                ));

        if (!consultation.getLecturer().getUserId().equals(lecturerId)) {
            throw new RuntimeException(
                    "You are not allowed to reschedule this consultation."
            );
        }

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

        Consultation consultation =
                consultationRepository.findById(consultationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Consultation not found"
                                ));

        if (!consultation.getStudent().getUserId().equals(studentId)) {
            throw new RuntimeException(
                    "You are not allowed to accept this reschedule."
            );
        }

        if (consultation.getStatus() !=
                Consultation.Status.RESCHEDULE_PENDING) {

            throw new RuntimeException(
                    "This consultation does not have a pending reschedule."
            );
        }

        if (consultation.getProposedDate() == null ||
                consultation.getProposedTime() == null) {

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

        Consultation consultation =
                consultationRepository.findById(consultationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Consultation not found"
                                ));

        if (!consultation.getStudent().getUserId().equals(studentId)) {
            throw new RuntimeException(
                    "You are not allowed to reject this reschedule."
            );
        }

        if (consultation.getStatus() !=
                Consultation.Status.RESCHEDULE_PENDING) {

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

        Consultation consultation =
                consultationRepository.findById(consultationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Consultation not found"
                                ));

        // Make sure the consultation belongs to this student
        if (!consultation.getStudent().getUserId().equals(studentId)) {
            throw new RuntimeException(
                    "You are not allowed to cancel this consultation."
            );
        }

        // Only PENDING or CONFIRMED consultations can be cancelled
        if (consultation.getStatus() != Consultation.Status.PENDING &&
                consultation.getStatus() != Consultation.Status.CONFIRMED) {

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