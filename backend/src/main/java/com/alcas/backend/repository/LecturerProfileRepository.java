package com.alcas.backend.repository;

import com.alcas.backend.entity.LecturerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LecturerProfileRepository
        extends JpaRepository<LecturerProfile, Integer> {

    List<LecturerProfile> findBySchoolId(Integer schoolId);
}