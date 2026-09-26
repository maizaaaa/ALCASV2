package com.alcas.backend.dto;

import com.alcas.backend.entity.User;

import java.time.LocalDateTime;

public class AdminUserResponse {

    private Integer id;
    private String name;
    private String email;
    private String role;
    private String status;
    private LocalDateTime lastLogin;

    public AdminUserResponse(User user) {
        this.id = user.getId();
        this.name = user.getFullName();
        this.email = user.getEmail();
        this.role = user.getRole().name();
        this.status = user.getStatus().name();
        this.lastLogin = user.getLastLogin();
    }

    public Integer getId() {
        return id;
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
}