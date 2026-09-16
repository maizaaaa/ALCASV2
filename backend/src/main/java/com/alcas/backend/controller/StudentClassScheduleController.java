package com.alcas.backend.controller;

import com.alcas.backend.dto.StudentClassScheduleResponse;
import com.alcas.backend.entity.StudentClassSchedule;
import com.alcas.backend.entity.User;
import com.alcas.backend.service.StudentClassScheduleService;
import com.alcas.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/student/schedule")
public class StudentClassScheduleController {

    private final StudentClassScheduleService studentClassScheduleService;
    private final UserService userService;

    public StudentClassScheduleController(
            StudentClassScheduleService studentClassScheduleService,
            UserService userService) {

        this.studentClassScheduleService =
                studentClassScheduleService;

        this.userService = userService;
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
}