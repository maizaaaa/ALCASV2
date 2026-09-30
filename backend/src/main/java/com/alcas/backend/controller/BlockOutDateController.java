package com.alcas.backend.controller;

import com.alcas.backend.entity.User;
import com.alcas.backend.dto.BlockOutDateResponse;
import com.alcas.backend.entity.BlockOutDate;
import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.service.BlockOutDateService;
import com.alcas.backend.repository.UserRepository;
import com.alcas.backend.repository.LecturerProfileRepository;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/block-out-dates")
public class BlockOutDateController {

    private final BlockOutDateService blockOutDateService;
    private final UserRepository userRepository;
    private final LecturerProfileRepository lecturerProfileRepository;

    public BlockOutDateController(
            BlockOutDateService blockOutDateService,
            UserRepository userRepository,
            LecturerProfileRepository lecturerProfileRepository) {

        this.blockOutDateService = blockOutDateService;
        this.userRepository = userRepository;
        this.lecturerProfileRepository = lecturerProfileRepository;
    }

    @GetMapping("/lecturer/{lecturerId}")
    public ResponseEntity<List<BlockOutDateResponse>> getBlockOutDates(
            @PathVariable Integer lecturerId) {

        List<BlockOutDateResponse> response =
                blockOutDateService
                        .findByLecturerId(lecturerId)
                        .stream()
                        .map(this::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<BlockOutDateResponse> createBlockOutDate(
            @RequestParam String blockDate,
            @RequestParam String reason,
            Authentication authentication) {

        User user =
                userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        LecturerProfile lecturer =
                lecturerProfileRepository.findById(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException("Lecturer profile not found"));

        BlockOutDate blockOutDate =
                new BlockOutDate();

        blockOutDate.setLecturer(lecturer);

        blockOutDate.setBlockDate(
                LocalDate.parse(blockDate)
        );

        blockOutDate.setReason(reason);

        BlockOutDate created =
                blockOutDateService
                        .createBlockOutDate(blockOutDate);

        return ResponseEntity.ok(
                toResponse(created)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlockOutDate(
            @PathVariable Integer id) {

        blockOutDateService.deleteBlockOutDate(id);

        return ResponseEntity.noContent().build();
    }

    private BlockOutDateResponse toResponse(
            BlockOutDate entity) {

        return new BlockOutDateResponse(
                entity.getId(),
                entity.getLecturer().getUserId(),
                entity.getBlockDate().toString(),
                entity.getReason()
        );
    }
}