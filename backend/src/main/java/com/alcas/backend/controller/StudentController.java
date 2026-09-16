package com.alcas.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @GetMapping("/test")
    public String testStudentAccess() {

        return "Student endpoint is working";
    }
}