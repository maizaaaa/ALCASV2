package com.alcas.backend.repository;

import com.alcas.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByLecturerUserIdOrderByAttendanceDateDesc (Integer lecturerId);

    List<Attendance> findByStudentUserIdOrderByAttendanceDateDesc (Integer studentId);

    boolean existsByConsultationId (String consultationId);
}