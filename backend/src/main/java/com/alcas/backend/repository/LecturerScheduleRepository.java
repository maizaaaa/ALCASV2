package com.alcas.backend.repository;

import com.alcas.backend.entity.LecturerSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LecturerScheduleRepository extends JpaRepository<LecturerSchedule,Long> {
}
