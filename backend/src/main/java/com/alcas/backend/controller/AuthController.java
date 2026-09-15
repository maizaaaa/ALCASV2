package com.alcas.backend.controller;

import com.alcas.backend.dto.LoginRequest;
import com.alcas.backend.dto.LoginResponse;
import com.alcas.backend.dto.RegisterRequest;
import com.alcas.backend.dto.VerifyCodeRequest;
import com.alcas.backend.dto.ForgotPasswordRequest;
import com.alcas.backend.service.AuthenticationService;
import org.springframework.web.bind.annotation.*;

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
    public String register(@RequestBody RegisterRequest request) {

        authenticationService.registerStudent(request);

        return "Registration successful. Please verify your account.";
    }

    @PostMapping("/verify")
    public String verifyAccount(
            @RequestBody VerifyCodeRequest request) {

        return authenticationService.verifyAccount(
                request.getEmail(),
                request.getCode()
        );
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        return authenticationService.requestPasswordReset(
                request.getEmail()
        );
    }
}