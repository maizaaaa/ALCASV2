package com.alcas.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lecturer")
public class LecturerController {

    @GetMapping("/test")
    public String testLecturerAccess() {

        return "Lecturer endpoint is working";
    }
}