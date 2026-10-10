package com.alcas.backend.repository;

import com.alcas.backend.entity.LecturerSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LecturerScheduleRepository
        extends JpaRepository<LecturerSchedule, Long> {

    List<LecturerSchedule> findByLecturerUserId(Integer lecturerId);

    List<LecturerSchedule> findByLecturerUserIdAndDayOfWeek(
            Integer lecturerId,
            String dayOfWeek
    );

    List<LecturerSchedule> findByLecturerUserIdAndDayOfWeekIgnoreCase(
            Integer lecturerId,
            String dayOfWeek
    );
}