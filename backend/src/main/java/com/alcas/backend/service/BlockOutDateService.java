package com.alcas.backend.service;

import com.alcas.backend.entity.BlockOutDate;
import com.alcas.backend.entity.User;
import com.alcas.backend.exception.UnauthorizedException;
import com.alcas.backend.repository.UserRepository;
import com.alcas.backend.repository.BlockOutDateRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlockOutDateService {

    private final BlockOutDateRepository blockOutDateRepository;
    private final UserRepository userRepository;

    public BlockOutDateService(
            BlockOutDateRepository blockOutDateRepository,
            UserRepository userRepository) {

        this.blockOutDateRepository = blockOutDateRepository;
        this.userRepository = userRepository;
    }

    public List<BlockOutDate> findByLecturerId(
            Integer lecturerId) {

        return blockOutDateRepository
                .findByLecturerUserId(lecturerId);
    }

    public BlockOutDate createBlockOutDate(
            BlockOutDate blockOutDate) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User authenticatedUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Authenticated user not found."
                                ));

        Integer lecturerId =
                blockOutDate.getLecturer().getUserId();

        if (!authenticatedUser.getId().equals(lecturerId)) {
            throw new UnauthorizedException(
                    "You are not allowed to create a block-out date for another lecturer"
            );
        }

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
            Integer blockOutDateId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User authenticatedUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Authenticated user not found."
                                ));

        BlockOutDate blockOutDate =
                blockOutDateRepository
                        .findById(blockOutDateId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Block-out date not found."
                                ));

        Integer loggedInLecturerId =
                authenticatedUser.getId();

        if (!blockOutDate.getLecturer()
                .getUserId()
                .equals(loggedInLecturerId)) {

            throw new UnauthorizedException(
                    "You are not allowed to delete this block-out date."
            );
        }

        blockOutDateRepository.delete(blockOutDate);
    }
}