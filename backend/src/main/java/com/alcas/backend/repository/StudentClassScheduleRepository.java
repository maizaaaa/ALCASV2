package com.alcas.backend.repository;

import com.alcas.backend.entity.StudentClassSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentClassScheduleRepository
        extends JpaRepository<StudentClassSchedule, Long> {

    List<StudentClassSchedule> findByStudentUserId(Integer userId);
}