package com.alcas.backend.controller;

import com.alcas.backend.dto.StudentProfileResponse;
import com.alcas.backend.entity.StudentProfile;
import com.alcas.backend.entity.User;
import com.alcas.backend.service.StudentProfileService;
import com.alcas.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final UserService userService;
    private final StudentProfileService studentProfileService;

    public StudentController(
            UserService userService,
            StudentProfileService studentProfileService) {

        this.userService = userService;
        this.studentProfileService = studentProfileService;
    }

    @GetMapping("/me")
    public ResponseEntity<StudentProfileResponse> getMyProfile(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        StudentProfile profile =
                studentProfileService.findById(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException("Student profile not found"));

        StudentProfileResponse response =
                new StudentProfileResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        profile.getMatricNumber(),
                        profile.getPhone(),
                        profile.getProfileImg(),
                        profile.getSchool().getName(),
                        profile.getProgram().getName(),
                        profile.getEmailNotifications(),
                        profile.getAutoReminder24h()
                );

        return ResponseEntity.ok(response);
    }
}