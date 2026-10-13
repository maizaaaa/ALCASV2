package com.alcas.backend.repository;

import com.alcas.backend.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Integer> {
    boolean existsByMatricNumber(String matricNumber);
    Optional<StudentProfile> findByMatricNumber(String matricNumber);
}

