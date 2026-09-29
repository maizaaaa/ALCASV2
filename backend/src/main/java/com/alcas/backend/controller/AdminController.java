package com.alcas.backend.controller;

import com.alcas.backend.entity.*;
import com.alcas.backend.repository.UserRepository;
import com.alcas.backend.repository.StudentProfileRepository;
import com.alcas.backend.repository.LecturerProfileRepository;
import com.alcas.backend.repository.SchoolRepository;
import com.alcas.backend.repository.ProgramRepository;
import com.alcas.backend.dto.AdminUserResponse;
import com.alcas.backend.dto.AdminCreateUserRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final LecturerProfileRepository lecturerProfileRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final ProgramRepository programRepository;
    private final SchoolRepository schoolRepository;

    public AdminController(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           StudentProfileRepository studentProfileRepository,
                           LecturerProfileRepository lecturerProfileRepository,
                           ProgramRepository programRepository,
                           SchoolRepository schoolRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.studentProfileRepository = studentProfileRepository;
        this.lecturerProfileRepository = lecturerProfileRepository;
        this.programRepository = programRepository;
        this.schoolRepository = schoolRepository;
    }

    @GetMapping("/test")
    public String testAdminAccess() {
        return "Admin endpoint is working";
    }

    @GetMapping("/users")
    public List<AdminUserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new AdminUserResponse(
                        user,
                        studentProfileRepository,
                        lecturerProfileRepository))
                .toList();
    }

    @PutMapping("/users/{id}/status")
    public AdminUserResponse updateUserStatus(
            @PathVariable Integer id,
            @RequestParam String status) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(User.Status.valueOf(status.toUpperCase()));

        User updatedUser = userRepository.save(user);

        return new AdminUserResponse(updatedUser,
                                    studentProfileRepository,
                                    lecturerProfileRepository);
    }

    @PutMapping("/users/{id}")
    public AdminUserResponse updateUser(
            @PathVariable Integer id,
            @RequestBody AdminCreateUserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getEmail().equalsIgnoreCase(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException("Email already exists");
        }

        user.setFullName(request.getName());
        user.setEmail(request.getEmail());

        User updatedUser = userRepository.save(user);

        // Update student profile
        if (updatedUser.getRole() == User.Role.STUDENT) {

            if (studentProfileRepository.findAll().stream()
                    .anyMatch(profile ->
                            profile.getMatricNumber() != null
                                    && profile.getMatricNumber()
                                    .equalsIgnoreCase(request.getUserId()))) {

                throw new RuntimeException("Matric number already exists");
            }

            StudentProfile profile = studentProfileRepository
                    .findById(updatedUser.getId())
                    .orElseThrow(() -> new RuntimeException("Student profile not found"));

            profile.setPhone(request.getPhone());

            School school = schoolRepository.findById(request.getSchoolId())
                    .orElseThrow(() -> new RuntimeException("School not found"));

            Program program = programRepository.findById(request.getProgramId())
                    .orElseThrow(() -> new RuntimeException("Program not found"));

            profile.setSchool(school);
            profile.setProgram(program);

            studentProfileRepository.save(profile);
        }

        // Update lecturer profile
        if (updatedUser.getRole() == User.Role.LECTURER) {

            if (lecturerProfileRepository.findAll().stream()
                    .anyMatch(profile ->
                            profile.getStaffNumber() != null
                                    && profile.getStaffNumber()
                                    .equalsIgnoreCase(request.getUserId()))) {

                throw new RuntimeException("Staff number already exists");
            }

            LecturerProfile profile = lecturerProfileRepository
                    .findById(updatedUser.getId())
                    .orElseThrow(() -> new RuntimeException("Lecturer profile not found"));

            profile.setPhone(request.getPhone());
            profile.setOfficeRoom(request.getOfficeRoom());

            School school = schoolRepository.findById(request.getSchoolId())
                    .orElseThrow(() -> new RuntimeException("School not found"));

            profile.setSchoolId(school.getId());

            lecturerProfileRepository.save(profile);
        }

        return new AdminUserResponse(
                updatedUser,
                studentProfileRepository,
                lecturerProfileRepository);
    }

    @Transactional
    @PostMapping("/users")
    public AdminUserResponse createUser(
            @RequestBody AdminCreateUserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFullName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));
        user.setStatus(User.Status.ACTIVE);

        User savedUser = userRepository.save(user);

        // Create student profile
        if (savedUser.getRole() == User.Role.STUDENT) {

            School school = schoolRepository.findById(request.getSchoolId())
                    .orElseThrow(() -> new RuntimeException("School not found"));

            Program program = programRepository.findById(request.getProgramId())
                    .orElseThrow(() -> new RuntimeException("Program not found"));

            StudentProfile profile = new StudentProfile();

            profile.setUser(savedUser);
            profile.setMatricNumber(request.getUserId());
            profile.setPhone(request.getPhone());
            profile.setSchool(school);
            profile.setProgram(program);

            studentProfileRepository.save(profile);
        }

        // Create lecturer profile
        if (savedUser.getRole() == User.Role.LECTURER) {

            LecturerProfile profile = new LecturerProfile();

            profile.setUser(savedUser);
            profile.setStaffNumber(request.getUserId());
            profile.setSchoolId(request.getSchoolId());
            profile.setPhone(request.getPhone());
            profile.setOfficeRoom(request.getOfficeRoom());

            lecturerProfileRepository.save(profile);
        }

        return new AdminUserResponse(savedUser,
                                    studentProfileRepository,
                                    lecturerProfileRepository);
    }
}