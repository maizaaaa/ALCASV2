package com.alcas.backend.controller;

import com.alcas.backend.dto.AttendanceResponse;
import com.alcas.backend.entity.Attendance;
import com.alcas.backend.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(
            AttendanceService attendanceService) {

        this.attendanceService = attendanceService;
    }

    @PostMapping("/mark")
    public ResponseEntity<AttendanceResponse> markAttendance(
            @RequestParam String consultationId,
            @RequestParam Integer lecturerId,
            @RequestParam Attendance.Status status,
            @RequestParam(required = false) String notes) {

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

    @GetMapping("/lecturer/{lecturerId}")
    public ResponseEntity<List<AttendanceResponse>> getLecturerAttendance(
            @PathVariable Integer lecturerId) {

        List<AttendanceResponse> response =
                attendanceService
                        .findByLecturerId(lecturerId)
                        .stream()
                        .map(this::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<AttendanceResponse>> getStudentAttendance(
            @PathVariable Integer studentId) {

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