package com.alcas.backend.repository;

import com.alcas.backend.entity.StudentClassSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentClassScheduleRepository extends JpaRepository<StudentClassSchedule, Long> {
}