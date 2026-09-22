package com.alcas.backend.repository;

import com.alcas.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByConsultation (String consultationID);

    List<Attendance> findByConsultationId (String consultationID);

    List<Attendance> findByLecturerUserIdOrderByAttendanceDateDesc (Integer lecturerId);

    List<Attendance> findByStudentUserIdOrderByAttendanceDateDesc (Integer studentId);

    boolean existsByConsultationId (String consultationId);
}