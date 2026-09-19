package com.alcas.backend.repository;

import com.alcas.backend.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgramRepository extends JpaRepository<Program,Integer> {

    List<Program> findBySchoolId(Integer schoolId);
}
