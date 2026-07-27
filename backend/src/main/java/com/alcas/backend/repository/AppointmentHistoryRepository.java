package com.alcas.backend.repository;

import com.alcas.backend.entity.AppointmentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentHistoryRepository extends JpaRepository<AppointmentHistory, Long> {
    List<AppointmentHistory> findByAppointmentIdOrderByCreatedAtDesc(Long appointmentId);
}
