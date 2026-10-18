package com.alcas.backend.repository;

import com.alcas.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByLecturerUserIdOrderByAttendanceDateDesc (Integer lecturerId);

    List<Attendance> findByStudentUserIdOrderByAttendanceDateDesc (Integer studentId);

    boolean existsByConsultationId (String consultationId);

    Optional<Attendance> findByConsultationId (String consultationId);

    @Query("SELECT a FROM Attendance a " +
           "LEFT JOIN FETCH a.student s " +
           "LEFT JOIN FETCH s.user su " +
           "LEFT JOIN FETCH a.lecturer l " +
           "LEFT JOIN FETCH l.user lu " +
           "LEFT JOIN FETCH a.consultation c " +
           "LEFT JOIN FETCH a.markedBy mb " +
           "ORDER BY a.attendanceDate DESC, a.id DESC")
    List<Attendance> findAllWithDetails();
}