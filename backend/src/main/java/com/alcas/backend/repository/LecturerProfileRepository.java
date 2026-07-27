package com.alcas.backend.repository;

import com.alcas.backend.entity.LecturerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LecturerProfileRepository extends JpaRepository<LecturerProfile, Long> {
    Optional<LecturerProfile> findByUserId(Long userId);
    List<LecturerProfile> findByUserFullNameContainingIgnoreCase(String fullName);
    List<LecturerProfile> findBySchoolId(Long schoolId);
}
