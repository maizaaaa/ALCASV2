package com.alcas.backend.service;

import com.alcas.backend.entity.StudentProfile;
import com.alcas.backend.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentProfileService {

    private final StudentProfileRepository studentProfileRepository;

    public StudentProfileService(StudentProfileRepository studentProfileRepository) {
        this.studentProfileRepository = studentProfileRepository;
    }

    public Optional<StudentProfile> findById(Integer userId) {
        return studentProfileRepository.findById(userId);
    }

    public StudentProfile save(StudentProfile studentProfile) {
        return studentProfileRepository.save(studentProfile);
    }

    public void deleteById(Integer userId) {
        studentProfileRepository.deleteById(userId);
    }
}