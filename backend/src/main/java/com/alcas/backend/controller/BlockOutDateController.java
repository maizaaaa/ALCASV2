package com.alcas.backend.controller;

import com.alcas.backend.dto.BlockOutDateResponse;
import com.alcas.backend.entity.BlockOutDate;
import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.service.BlockOutDateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/block-out-dates")
public class BlockOutDateController {

    private final BlockOutDateService blockOutDateService;

    public BlockOutDateController(
            BlockOutDateService blockOutDateService) {

        this.blockOutDateService = blockOutDateService;
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
            @RequestParam Integer lecturerId,
            @RequestParam String blockDate,
            @RequestParam String reason) {

        LecturerProfile lecturer =
                new LecturerProfile();

        lecturer.setUserId(lecturerId);

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
            @PathVariable Integer id,
            @RequestParam Integer lecturerId) {

        blockOutDateService.deleteBlockOutDate(
                id,
                lecturerId
        );

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