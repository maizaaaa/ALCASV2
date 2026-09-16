package com.alcas.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/test")
    public String testAdminAccess() {

        return "Admin endpoint is working";
    }
}