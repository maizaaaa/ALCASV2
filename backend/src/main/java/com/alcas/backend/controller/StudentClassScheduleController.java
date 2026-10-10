package com.alcas.backend.controller;

import com.alcas.backend.dto.StudentClassScheduleResponse;
import com.alcas.backend.entity.StudentClassSchedule;
import com.alcas.backend.entity.StudentProfile;
import com.alcas.backend.entity.User;
import com.alcas.backend.repository.StudentProfileRepository;
import com.alcas.backend.service.StudentClassScheduleService;
import com.alcas.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/schedule")
public class StudentClassScheduleController {

    private final StudentClassScheduleService studentClassScheduleService;
    private final UserService userService;
    private final StudentProfileRepository studentProfileRepository;

    public StudentClassScheduleController(
            StudentClassScheduleService studentClassScheduleService,
            UserService userService,
            StudentProfileRepository studentProfileRepository) {

        this.studentClassScheduleService = studentClassScheduleService;
        this.userService = userService;
        this.studentProfileRepository = studentProfileRepository;
    }

    @GetMapping
    public ResponseEntity<List<StudentClassScheduleResponse>> getMySchedule(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<StudentClassSchedule> schedules =
                studentClassScheduleService
                        .findByStudentUserId(user.getId());

        List<StudentClassScheduleResponse> response =
                schedules.stream()
                        .map(schedule ->
                                new StudentClassScheduleResponse(
                                        schedule.getId(),
                                        schedule.getDayOfWeek(),
                                        schedule.getTimeSlot(),
                                        schedule.getCategory()
                                )
                        )
                        .toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<StudentClassScheduleResponse> saveScheduleSlot(
            @RequestBody StudentClassSchedule slotRequest,
            Authentication authentication) {

        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile studentProfile = studentProfileRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        List<StudentClassSchedule> existing = studentClassScheduleService.findByStudentUserId(user.getId());
        StudentClassSchedule scheduleToSave = existing.stream()
                .filter(s -> s.getDayOfWeek().equalsIgnoreCase(slotRequest.getDayOfWeek())
                          && s.getTimeSlot().equalsIgnoreCase(slotRequest.getTimeSlot()))
                .findFirst()
                .orElse(new StudentClassSchedule());

        if (slotRequest.getId() != null) {
            scheduleToSave = studentClassScheduleService.findById(slotRequest.getId())
                    .orElse(scheduleToSave);
        }

        scheduleToSave.setStudent(studentProfile);
        scheduleToSave.setDayOfWeek(slotRequest.getDayOfWeek());
        scheduleToSave.setTimeSlot(slotRequest.getTimeSlot());
        scheduleToSave.setCategory(slotRequest.getCategory());

        StudentClassSchedule saved = studentClassScheduleService.save(scheduleToSave);

        return ResponseEntity.ok(new StudentClassScheduleResponse(
                saved.getId(),
                saved.getDayOfWeek(),
                saved.getTimeSlot(),
                saved.getCategory()
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScheduleSlot(
            @PathVariable Long id,
            Authentication authentication) {

        studentClassScheduleService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}