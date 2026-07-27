package com.alcas.backend.repository;

import com.alcas.backend.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    List<TimeSlot> findByLecturerId(Long lecturerId);
    List<TimeSlot> findByLecturerIdAndIsActive(Long lecturerId, boolean isActive);
    List<TimeSlot> findByLecturerIdAndDayOfWeekAndIsActive(Long lecturerId, int dayOfWeek, boolean isActive);
}
