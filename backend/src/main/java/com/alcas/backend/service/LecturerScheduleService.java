package com.alcas.backend.service;

import com.alcas.backend.entity.LecturerSchedule;
import com.alcas.backend.repository.LecturerScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LecturerScheduleService {

    private final LecturerScheduleRepository lecturerScheduleRepository;

    public LecturerScheduleService(LecturerScheduleRepository lecturerScheduleRepository) {
        this.lecturerScheduleRepository = lecturerScheduleRepository;
    }

    public List<LecturerSchedule> findAll() {
        return lecturerScheduleRepository.findAll();
    }

    public Optional<LecturerSchedule> findById(Long id) {
        return lecturerScheduleRepository.findById(id);
    }

    public List<LecturerSchedule> findByLecturerIdAndDay(Integer lecturerId, String dayOfWeek) {
        return lecturerScheduleRepository
                .findByLecturerUserIdAndDayOfWeekIgnoreCase(lecturerId, dayOfWeek);
    }
    public LecturerSchedule save(LecturerSchedule schedule) {
        return lecturerScheduleRepository.save(schedule);
    }

    public void deleteById(Long id) {
        lecturerScheduleRepository.deleteById(id);
    }
}