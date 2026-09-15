package com.alcas.backend.service;

import com.alcas.backend.entity.School;
import com.alcas.backend.repository.SchoolRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SchoolService {

    private final SchoolRepository schoolRepository;

    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    public List<School> findAll() {
        return schoolRepository.findAll();
    }

    public Optional<School> findById(Integer id) {
        return schoolRepository.findById(id);
    }

    public School save(School school) {
        return schoolRepository.save(school);
    }

    public void deleteById(Integer id) {
        schoolRepository.deleteById(id);
    }
}