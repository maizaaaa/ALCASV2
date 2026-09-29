package com.alcas.backend.controller;

import com.alcas.backend.entity.User;
import com.alcas.backend.repository.UserRepository;
import com.alcas.backend.dto.AdminUserResponse;
import com.alcas.backend.dto.AdminCreateUserRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    @PutMapping("/users/{id}/status")
    public AdminUserResponse updateUserStatus(
            @PathVariable Integer id,
            @RequestParam String status) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(User.Status.valueOf(status.toUpperCase()));

        User updatedUser = userRepository.save(user);

        return new AdminUserResponse(updatedUser);
    }

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

        return new AdminUserResponse(savedUser);
    }
}