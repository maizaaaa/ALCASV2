package com.alcas.backend.controller;

import com.alcas.backend.entity.LecturerSchedule;
import com.alcas.backend.dto.LecturerResponse;
import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.service.LecturerProfileService;
import com.alcas.backend.entity.School;
import com.alcas.backend.service.SchoolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lecturers")
public class LecturerController {

    private final LecturerProfileService lecturerProfileService;
    private final SchoolService schoolService;

    public LecturerController(
            LecturerProfileService lecturerProfileService,
            SchoolService schoolService)
    {
        this.lecturerProfileService = lecturerProfileService;
        this.schoolService = schoolService;
    }

    @GetMapping
    public ResponseEntity<List<LecturerResponse>> getAllLecturers() {
        List<LecturerProfile> lecturers = lecturerProfileService.findAll();

        List<LecturerResponse> response = lecturers.stream()
                .map(lecturer -> {
                    String schoolName = schoolService.findById(lecturer.getSchoolId())
                            .map(School::getName)
                            .orElse("General");
                    String lecturerName = lecturer.getUser() != null ? lecturer.getUser().getFullName() : "Lecturer";
                    return new LecturerResponse(
                            lecturer.getUserId(),
                            lecturerName,
                            schoolName
                    );
                })
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/school/{schoolId}")
    public ResponseEntity<List<LecturerResponse>> getLecturersBySchool(
            @PathVariable Integer schoolId) {

        List<LecturerProfile> lecturers =
                lecturerProfileService.findBySchoolId(schoolId);

        School school = schoolService.findById(schoolId)
                .orElseThrow(() ->
                        new RuntimeException("School not found"));

        List<LecturerResponse> response =
                lecturers.stream()
                        .map(lecturer ->
                                new LecturerResponse(
                                        lecturer.getUserId(),
                                        lecturer.getUser().getFullName(),
                                        school.getName()
                                )
                        )
                        .toList();

        return ResponseEntity.ok(response);
    }
}