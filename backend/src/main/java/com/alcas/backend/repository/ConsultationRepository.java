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

    List<Consultation> findByStatus(Consultation.Status status);

    @org.springframework.data.jpa.repository.Query(
        "SELECT c FROM Consultation c " +
        "JOIN FETCH c.student s " +
        "JOIN FETCH s.user su " +
        "JOIN FETCH c.lecturer l " +
        "JOIN FETCH l.user lu " +
        "WHERE c.scheduledDate = :scheduledDate " +
        "AND c.scheduledTime = :scheduledTime " +
        "AND c.status IN :statuses"
    )
    List<Consultation> findUpcomingExactTime(
            @org.springframework.data.repository.query.Param("scheduledDate") LocalDate scheduledDate,
            @org.springframework.data.repository.query.Param("scheduledTime") LocalTime scheduledTime,
            @org.springframework.data.repository.query.Param("statuses") List<Consultation.Status> statuses
    );

    @org.springframework.data.jpa.repository.Query(
        "SELECT c FROM Consultation c " +
        "JOIN FETCH c.student s " +
        "JOIN FETCH s.user su " +
        "JOIN FETCH c.lecturer l " +
        "JOIN FETCH l.user lu " +
        "WHERE c.scheduledDate = :scheduledDate " +
        "AND c.scheduledTime >= :startTime " +
        "AND c.scheduledTime <= :endTime " +
        "AND c.status IN :statuses"
    )
    List<Consultation> findUpcomingForReminder(
            @org.springframework.data.repository.query.Param("scheduledDate") LocalDate scheduledDate,
            @org.springframework.data.repository.query.Param("startTime") LocalTime startTime,
            @org.springframework.data.repository.query.Param("endTime") LocalTime endTime,
            @org.springframework.data.repository.query.Param("statuses") List<Consultation.Status> statuses
    );
}