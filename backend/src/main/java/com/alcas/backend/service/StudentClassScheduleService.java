package com.alcas.backend.service;

import com.alcas.backend.entity.StudentClassSchedule;
import com.alcas.backend.repository.StudentClassScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentClassScheduleService {

    private final StudentClassScheduleRepository studentClassScheduleRepository;

    public StudentClassScheduleService(StudentClassScheduleRepository studentClassScheduleRepository) {
        this.studentClassScheduleRepository = studentClassScheduleRepository;
    }

    public List<StudentClassSchedule> findAll() {
        return studentClassScheduleRepository.findAll();
    }

    public Optional<StudentClassSchedule> findById(Long id) {
        return studentClassScheduleRepository.findById(id);
    }

    public StudentClassSchedule save(StudentClassSchedule schedule) {
        return studentClassScheduleRepository.save(schedule);
    }

    public void deleteById(Long id) {
        studentClassScheduleRepository.deleteById(id);
    }
}