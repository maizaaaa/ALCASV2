package com.alcas.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public String getCurrentUser(Authentication authentication) {

        return "Authenticated as: " + authentication.getName();
    }
}