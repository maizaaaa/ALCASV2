package com.alcas.backend.controller;

import com.alcas.backend.entity.User;
import com.alcas.backend.repository.UserRepository;
import com.alcas.backend.dto.AdminUserResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/test")
    public String testAdminAccess() {
        return "Admin endpoint is working";
    }

    @GetMapping("/users")
    public List<AdminUserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(AdminUserResponse::new)
                .toList();
    }
}