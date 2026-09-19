package com.alcas.backend.service;

import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.repository.LecturerProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class LecturerProfileService {

    private final LecturerProfileRepository lecturerProfileRepository;

    public LecturerProfileService(LecturerProfileRepository lecturerProfileRepository) {
        this.lecturerProfileRepository = lecturerProfileRepository;
    }

    public Optional<LecturerProfile> findById(Integer userId) {
        return lecturerProfileRepository.findById(userId);
    }

    public List<LecturerProfile> findBySchoolId(Integer schoolId) {
        return lecturerProfileRepository.findBySchoolId(schoolId);
    }

    public LecturerProfile save(LecturerProfile lecturerProfile) {
        return lecturerProfileRepository.save(lecturerProfile);
    }

    public void deleteById(Integer userId) {
        lecturerProfileRepository.deleteById(userId);
    }
}