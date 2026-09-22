package com.alcas.backend.repository;

import com.alcas.backend.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ConsultationRepository
        extends JpaRepository<Consultation, String> {

    List<Consultation> findByLecturerUserIdAndScheduledDate(
            Integer lecturerId,
            LocalDate scheduledDate
    );

    List<Consultation> findByLecturerUserIdOrderByScheduledDateAscScheduledTimeAsc(
            Integer lecturerId
    );

    boolean existsByLecturerUserIdAndScheduledDateAndScheduledTimeAndStatusIn(
            Integer lecturerId,
            LocalDate scheduledDate,
            LocalTime scheduledTime,
            List<Consultation.Status> statuses
    );

    List<Consultation> findByStudentUserIdOrderByScheduledDateAscScheduledTimeAsc(
            Integer studentId
    );

    List<Consultation> findByStudentUserIdAndScheduledDateGreaterThanEqualOrderByScheduledDateAscScheduledTimeAsc(
            Integer studentId,
            LocalDate date
    );

    List<Consultation> findByLecturerUserIdAndScheduledDateAndStatusIn(
            Integer lecturerId,
            LocalDate scheduledDate,
            List<Consultation.Status> statuses
    );

}