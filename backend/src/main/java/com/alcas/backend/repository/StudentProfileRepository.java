package com.alcas.backend.repository;

import com.alcas.backend.entity.StudentProfile;
import org. springframework.data.jpa.repository.JpaRepository;

public interface StudentProfileRepository extends JpaRepository<StudentProfile,Integer> {
}
