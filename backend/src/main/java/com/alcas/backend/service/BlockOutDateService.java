package com.alcas.backend.service;

import com.alcas.backend.entity.BlockOutDate;
import com.alcas.backend.repository.BlockOutDateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlockOutDateService {

    private final BlockOutDateRepository blockOutDateRepository;

    public BlockOutDateService(
            BlockOutDateRepository blockOutDateRepository) {

        this.blockOutDateRepository = blockOutDateRepository;
    }

    public List<BlockOutDate> findByLecturerId(
            Integer lecturerId) {

        return blockOutDateRepository
                .findByLecturerUserId(lecturerId);
    }

    public BlockOutDate createBlockOutDate(
            BlockOutDate blockOutDate) {

        Integer lecturerId =
                blockOutDate.getLecturer().getUserId();

        LocalDate blockDate =
                blockOutDate.getBlockDate();

        boolean alreadyBlocked =
                blockOutDateRepository
                        .existsByLecturerUserIdAndBlockDate(
                                lecturerId,
                                blockDate
                        );

        if (alreadyBlocked) {
            throw new RuntimeException(
                    "This date is already blocked."
            );
        }

        LocalDateTime now = LocalDateTime.now();

        blockOutDate.setCreatedAt(now);
        blockOutDate.setUpdatedAt(now);

        return blockOutDateRepository.save(blockOutDate);
    }

    public void deleteBlockOutDate(
            Integer blockOutDateId,
            Integer lecturerId) {

        BlockOutDate blockOutDate =
                blockOutDateRepository
                        .findById(blockOutDateId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Block-out date not found."
                                ));

        if (!blockOutDate.getLecturer()
                .getUserId()
                .equals(lecturerId)) {

            throw new RuntimeException(
                    "You are not allowed to delete this block-out date."
            );
        }

        blockOutDateRepository.delete(blockOutDate);
    }
}