package com.alcas.backend.controller;

import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.entity.User;
import com.alcas.backend.repository.UserRepository;
import com.alcas.backend.service.LecturerProfileService;
import com.alcas.backend.dto.ChangePasswordRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lecturer-profile")
@CrossOrigin(origins = "http://localhost:4200")
public class LecturerProfileController {

    private final LecturerProfileService lecturerProfileService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LecturerProfileController(
            LecturerProfileService lecturerProfileService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.lecturerProfileService = lecturerProfileService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/me")
    public ResponseEntity<LecturerProfile> getMyProfile(
            Authentication authentication) {

        User user =
                userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        LecturerProfile profile =
                lecturerProfileService.findById(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException("Lecturer profile not found"));

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/me")
    public ResponseEntity<LecturerProfile> updateMyProfile(
            Authentication authentication,
            @RequestBody LecturerProfile updatedProfile) {

        User user =
                userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        LecturerProfile profile =
                lecturerProfileService.findById(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException("Lecturer profile not found"));

        // Update User information
        user.setFullName(updatedProfile.getUser().getFullName());
        user.setEmail(updatedProfile.getUser().getEmail());

        // Update Lecturer Profile information
        profile.setPhone(updatedProfile.getPhone());
        profile.setOfficeRoom(updatedProfile.getOfficeRoom());
        profile.setOfficeHours(updatedProfile.getOfficeHours());
        profile.setVirtualRoomUrl(updatedProfile.getVirtualRoomUrl());
        profile.setBio(updatedProfile.getBio());
        profile.setAvatarUrl(updatedProfile.getAvatarUrl());

        profile.setEmailNotifications(updatedProfile.getEmailNotifications());
        profile.setAutoReminder24h(updatedProfile.getAutoReminder24h());
        profile.setAutoApproveFyp(updatedProfile.getAutoApproveFyp());
        if (updatedProfile.getBlockNonWorkingDays() != null) {
            profile.setBlockNonWorkingDays(updatedProfile.getBlockNonWorkingDays());
        }
        if (updatedProfile.getBlockedDays() != null) {
            profile.setBlockedDays(updatedProfile.getBlockedDays());
        }

        userRepository.save(user);
        lecturerProfileService.save(profile);

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/me/password")
    public ResponseEntity<String> changePassword(
            Authentication authentication,
            @RequestBody ChangePasswordRequest request) {

        User user =
                userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        // Check current password
        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            return ResponseEntity.badRequest()
                    .body("Current password is incorrect.");
        }

        // Check new password
        if (request.getNewPassword() == null ||
                request.getNewPassword().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("New password cannot be empty.");
        }

        // Update password with BCrypt encryption
        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully.");
    }
}