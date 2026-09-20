package com.alcas.backend.controller;

import com.alcas.backend.dto.AvailabilityResponse;
import com.alcas.backend.entity.LecturerSchedule;
import com.alcas.backend.service.LecturerScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/lecturer-availability")
public class LecturerAvailabilityController {

    private final LecturerScheduleService lecturerScheduleService;

    public LecturerAvailabilityController(
            LecturerScheduleService lecturerScheduleService) {
        this.lecturerScheduleService = lecturerScheduleService;
    }

    @GetMapping
    public ResponseEntity<AvailabilityResponse> getAvailability(
            @RequestParam Integer lecturerId,
            @RequestParam String date) {

        LocalDate selectedDate = LocalDate.parse(date);

        DayOfWeek dayOfWeek = selectedDate.getDayOfWeek();

        String dayName = dayOfWeek.getDisplayName(
                TextStyle.FULL,
                Locale.ENGLISH
        );

        List<LecturerSchedule> schedules =
                lecturerScheduleService.findByLecturerIdAndDay(
                        lecturerId,
                        dayName
                );

        List<String> availableSlots = schedules.stream()
                .filter(schedule ->
                        "AVAILABLE".equalsIgnoreCase(
                                schedule.getSlotType()
                        )
                )
                .flatMap(schedule ->
                        generateSlots(
                                schedule.getStartTime(),
                                schedule.getEndTime()
                        ).stream()
                )
                .toList();

        AvailabilityResponse response =
                new AvailabilityResponse(
                        lecturerId,
                        selectedDate.format(
                                DateTimeFormatter.ISO_LOCAL_DATE
                        ),
                        dayName,
                        availableSlots
                );

        return ResponseEntity.ok(response);
    }

    private List<String> generateSlots(
            java.time.LocalTime startTime,
            java.time.LocalTime endTime) {

        java.util.List<String> slots =
                new java.util.ArrayList<>();

        java.time.LocalTime currentTime = startTime;

        while (currentTime.plusMinutes(30).compareTo(endTime) <= 0) {

            slots.add(
                    currentTime.format(
                            java.time.format.DateTimeFormatter
                                    .ofPattern("hh:mm a")
                    )
            );

            currentTime = currentTime.plusMinutes(30);
        }

        return slots;
    }
}