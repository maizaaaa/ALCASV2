package com.alcas.backend.repository;

import com.alcas.backend.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program,Integer> {
}
