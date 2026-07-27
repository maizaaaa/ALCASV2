package com.alcas.backend.repository;

import com.alcas.backend.entity.Appointment;
import com.alcas.backend.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByStudentId(Long studentId);
    List<Appointment> findByLecturerId(Long lecturerId);
    List<Appointment> findByLecturerIdAndDate(Long lecturerId, LocalDate date);
    List<Appointment> findByLecturerIdAndDateBetween(Long lecturerId, LocalDate start, LocalDate end);
    List<Appointment> findByStudentIdAndDateBetween(Long studentId, LocalDate start, LocalDate end);
    List<Appointment> findByLecturerIdAndDateAndStatusIn(Long lecturerId, LocalDate date, Collection<AppointmentStatus> statuses);
}
