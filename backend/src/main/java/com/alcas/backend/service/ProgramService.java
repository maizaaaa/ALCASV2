package com.alcas.backend.service;

import com.alcas.backend.entity.Program;
import com.alcas.backend.repository.ProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService {

    private final ProgramRepository programRepository;

    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public List<Program> findAll() {
        return programRepository.findAll();
    }

    public Optional<Program> findById(Integer id) {
        return programRepository.findById(id);
    }

    public Program save(Program program) {
        return programRepository.save(program);
    }

    public void deleteById(Integer id) {
        programRepository.deleteById(id);
    }
}