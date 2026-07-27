package com.alcas.backend.repository;

import com.alcas.backend.entity.BusyBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BusyBlockRepository extends JpaRepository<BusyBlock, Long> {
    List<BusyBlock> findByLecturerId(Long lecturerId);
    Optional<BusyBlock> findByLecturerIdAndDate(Long lecturerId, LocalDate date);
    List<BusyBlock> findByLecturerIdAndDateBetween(Long lecturerId, LocalDate start, LocalDate end);
}
