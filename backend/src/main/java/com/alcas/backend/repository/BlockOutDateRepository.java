package com.alcas.backend.repository;

import com.alcas.backend.entity.BlockOutDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BlockOutDateRepository
        extends JpaRepository<BlockOutDate, Integer> {

    List<BlockOutDate> findByLecturerUserId(Integer lecturerId);

    boolean existsByLecturerUserIdAndBlockDate(
            Integer lecturerId,
            LocalDate blockDate
    );
}