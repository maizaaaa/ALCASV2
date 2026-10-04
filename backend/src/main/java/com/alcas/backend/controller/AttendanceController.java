package com.alcas.backend.controller;

import com.alcas.backend.dto.AttendanceResponse;
import com.alcas.backend.entity.Attendance;
import com.alcas.backend.service.AttendanceService;
import com.alcas.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final UserRepository userRepository;

    public AttendanceController(
            AttendanceService attendanceService,
            UserRepository userRepository) {

        this.attendanceService = attendanceService;
        this.userRepository = userRepository;
    }

    @PostMapping("/mark")
    public ResponseEntity<AttendanceResponse> markAttendance(
            @RequestParam String consultationId,
            @RequestParam Attendance.Status status,
            @RequestParam(required = false) String notes,
            Authentication authentication) {

        String email = authentication.getName();

        Integer lecturerId =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Authenticated user not found"
                                ))
                        .getId();

        Attendance attendance =
                attendanceService.markAttendance(
                        consultationId,
                        lecturerId,
                        status,
                        notes
                );

        return ResponseEntity.ok(
                toResponse(attendance)
        );
    }

    @GetMapping("/lecturer")
    public ResponseEntity<List<AttendanceResponse>> getLecturerAttendance(
            Authentication authentication) {

        String email = authentication.getName();

        Integer lecturerId =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Authenticated user not found"
                                ))
                        .getId();

        List<AttendanceResponse> response =
                attendanceService
                        .findByLecturerId(lecturerId)
                        .stream()
                        .map(this::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/student")
    public ResponseEntity<List<AttendanceResponse>> getStudentAttendance(
            Authentication authentication) {

        String email = authentication.getName();

        Integer studentId =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Authenticated user not found"
                                ))
                        .getId();

        List<AttendanceResponse> response =
                attendanceService
                        .findByStudentId(studentId)
                        .stream()
                        .map(this::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    private AttendanceResponse toResponse(
            Attendance attendance) {

        return new AttendanceResponse(
                attendance.getId(),
                attendance.getConsultation().getId(),
                attendance.getStudent().getUserId(),
                attendance.getLecturer().getUserId(),
                attendance.getAttendanceDate().toString(),
                attendance.getStatus().name(),
                attendance.getNotes(),
                attendance.getMarkedBy() != null
                        ? attendance.getMarkedBy().getId()
                        : null,
                attendance.getMarkedAt() != null
                        ? attendance.getMarkedAt().toString()
                        : null
        );
    }
}