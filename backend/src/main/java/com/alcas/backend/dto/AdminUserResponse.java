package com.alcas.backend.dto;

import com.alcas.backend.entity.User;
import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.entity.StudentProfile;
import com.alcas.backend.repository.StudentProfileRepository;
import com.alcas.backend.repository.LecturerProfileRepository;

import java.time.LocalDateTime;

public class AdminUserResponse {

    private Integer id;
    private String userId;
    private String name;
    private String email;
    private String role;
    private String status;
    private LocalDateTime lastLogin;
    private String officeRoom;
    private Integer schoolId;
    private Integer programId;
    private String phone;
    private LocalDateTime createdAt;

    public AdminUserResponse(User user,
                             StudentProfileRepository studentProfileRepository,
                             LecturerProfileRepository lecturerProfileRepository) {

        this.id = user.getId();
        this.name = user.getFullName();
        this.email = user.getEmail();
        this.role = user.getRole().name();
        this.status = user.getStatus().name();
        this.lastLogin = user.getLastLogin();
        this.createdAt = user.getCreatedAt();

        if (user.getRole() == User.Role.STUDENT) {
            StudentProfile profile = studentProfileRepository
                    .findById(user.getId())
                    .orElse(null);

            this.userId = profile != null
                    ? profile.getMatricNumber()
                    : null;

            this.schoolId = profile != null && profile.getSchool() != null
                    ? profile.getSchool().getId()
                    : null;

            this.programId = profile != null && profile.getProgram() != null
                    ? profile.getProgram().getId()
                    : null;
            this.phone = profile != null
                    ? profile.getPhone()
                    : null;
        } else if (user.getRole() == User.Role.LECTURER) {
        LecturerProfile profile = lecturerProfileRepository
                .findById(user.getId())
                .orElse(null);

        this.userId = profile != null
                ? profile.getStaffNumber()
                : null;

        this.officeRoom = profile != null
                ? profile.getOfficeRoom()
                : null;

        this.phone = profile != null
                ? profile.getPhone()
                : null;

        this.schoolId = profile != null
                ? profile.getSchoolId()
                : null;
    } else {
            this.userId = null;
        }
    }

    public Integer getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public String getOfficeRoom() {
        return officeRoom;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public Integer getProgramId() {
        return programId;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}