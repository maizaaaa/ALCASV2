package com.alcas.backend.controller;

import com.alcas.backend.dto.LoginRequest;
import com.alcas.backend.dto.LoginResponse;
import com.alcas.backend.dto.RegisterRequest;
import com.alcas.backend.dto.VerifyCodeRequest;
import com.alcas.backend.dto.ForgotPasswordRequest;
import com.alcas.backend.dto.ResetPasswordRequest;
import com.alcas.backend.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return authenticationService.login(
                request.getEmail(),
                request.getPassword()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {

        authenticationService.registerStudent(request);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Registration successful. Please verify your account."
        ));
    }

    @PostMapping("/verify")
    public String verifyAccount(
            @RequestBody VerifyCodeRequest request) {

        return authenticationService.verifyAccount(
                request.getEmail(),
                request.getCode()
        );
    }

    @PostMapping(value = "/forgot-password", produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        String message = authenticationService.requestPasswordReset(
                request.getEmail()
        );

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", message
        ));
    }

    @PostMapping(value = "/reset-password", produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        String message = authenticationService.resetPassword(
                request.getEmail(),
                request.getCode(),
                request.getNewPassword()
        );

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", message
        ));
    }
}