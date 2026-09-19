package com.alcas.backend.controller;

import com.alcas.backend.dto.ProgramResponse;
import com.alcas.backend.entity.Program;
import com.alcas.backend.service.ProgramService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public ResponseEntity<List<ProgramResponse>> getAllPrograms() {

        List<Program> programs =
                programService.findAll();

        List<ProgramResponse> response =
                programs.stream()
                        .map(program ->
                                new ProgramResponse(
                                        program.getId(),
                                        program.getName()
                                )
                        )
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/school/{schoolId}")
    public ResponseEntity<List<ProgramResponse>> getProgramsBySchool(
            @PathVariable Integer schoolId) {

        List<Program> programs =
                programService.findBySchoolId(schoolId);

        List<ProgramResponse> response =
                programs.stream()
                        .map(program ->
                                new ProgramResponse(
                                        program.getId(),
                                        program.getName()
                                )
                        )
                        .toList();

        return ResponseEntity.ok(response);
    }
}