package com.alcas.backend.controller;

import com.alcas.backend.dto.AvailabilityResponse;
import com.alcas.backend.entity.Consultation;
import com.alcas.backend.entity.BlockOutDate;
import com.alcas.backend.entity.LecturerSchedule;
import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.repository.UserRepository;
import com.alcas.backend.repository.ConsultationRepository;
import com.alcas.backend.repository.BlockOutDateRepository;
import com.alcas.backend.repository.LecturerProfileRepository;
import com.alcas.backend.dto.LecturerScheduleRequest;
import com.alcas.backend.dto.LecturerScheduleResponse;
import com.alcas.backend.service.LecturerScheduleService;
import com.alcas.backend.service.SystemSettingService;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/lecturer-availability")
public class LecturerAvailabilityController {

    private final LecturerScheduleService lecturerScheduleService;
    private final SystemSettingService systemSettingService;
    private final BlockOutDateRepository blockOutDateRepository;
    private final ConsultationRepository consultationRepository;
    private final LecturerProfileRepository lecturerProfileRepository;
    private final UserRepository userRepository;

    public LecturerAvailabilityController(
            LecturerScheduleService lecturerScheduleService,
            SystemSettingService systemSettingService,
            BlockOutDateRepository blockOutDateRepository,
            ConsultationRepository consultationRepository,
            LecturerProfileRepository lecturerProfileRepository,
            UserRepository userRepository)
    {

        this.lecturerScheduleService = lecturerScheduleService;
        this.systemSettingService = systemSettingService;
        this.blockOutDateRepository = blockOutDateRepository;
        this.consultationRepository = consultationRepository;
        this.lecturerProfileRepository = lecturerProfileRepository;
        this.userRepository = userRepository;
    }

    @PutMapping("/schedule/{id}")
    public ResponseEntity<LecturerScheduleResponse> updateSchedule(
            @PathVariable Long id,
            @RequestBody LecturerScheduleRequest request,
            Authentication authentication) {

        LecturerSchedule schedule =
                lecturerScheduleService.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Schedule not found"));

        Integer loggedInLecturerId =
                userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() ->
                                new RuntimeException("User not found"))
                        .getId();

        if (!schedule.getLecturer()
                .getUserId()
                .equals(loggedInLecturerId)) {

            return ResponseEntity.status(403).build();
        }

        schedule.setDayOfWeek(request.getDayOfWeek());

        schedule.setStartTime(
                java.time.LocalTime.parse(request.getStartTime())
        );

        schedule.setEndTime(
                java.time.LocalTime.parse(request.getEndTime())
        );

        schedule.setSlotType(request.getSlotType());

        schedule.setTitle(request.getTitle());

        LecturerSchedule updatedSchedule =
                lecturerScheduleService.save(schedule);

        return ResponseEntity.ok(
                new LecturerScheduleResponse(updatedSchedule)
        );
    }

    @PostMapping("/schedule")
    public ResponseEntity<LecturerScheduleResponse> createSchedule(
            @RequestBody LecturerScheduleRequest request,
            Authentication authentication) {

        Integer loggedInLecturerId =
                userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() ->
                                new RuntimeException("User not found"))
                        .getId();

        LecturerProfile lecturer =
                lecturerProfileRepository.findById(loggedInLecturerId)
                        .orElseThrow(() ->
                                new RuntimeException("Lecturer profile not found"));

        LecturerSchedule schedule = new LecturerSchedule();

        schedule.setLecturer(lecturer);
        schedule.setDayOfWeek(request.getDayOfWeek());

        schedule.setStartTime(
                java.time.LocalTime.parse(request.getStartTime())
        );

        schedule.setEndTime(
                java.time.LocalTime.parse(request.getEndTime())
        );

        schedule.setSlotType(request.getSlotType());
        schedule.setTitle(request.getTitle());

        LecturerSchedule savedSchedule =
                lecturerScheduleService.save(schedule);

        return ResponseEntity.ok(
                new LecturerScheduleResponse(savedSchedule)
        );
    }

    @GetMapping("/schedule/me")
    public ResponseEntity<List<LecturerScheduleResponse>> getMySchedule(
            Authentication authentication) {

        Integer loggedInLecturerId =
                userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() ->
                                new RuntimeException("User not found"))
                        .getId();

        List<LecturerScheduleResponse> schedules =
                lecturerScheduleService
                        .findAll()
                        .stream()
                        .filter(schedule ->
                                schedule.getLecturer()
                                        .getUserId()
                                        .equals(loggedInLecturerId))
                        .map(LecturerScheduleResponse::new)
                        .toList();

        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/schedule/{lecturerId}")
    public ResponseEntity<List<LecturerScheduleResponse>> getLecturerSchedule(
            @PathVariable Integer lecturerId) {

        List<LecturerScheduleResponse> schedules =
                lecturerScheduleService.findAll()
                        .stream()
                        .filter(schedule ->
                                schedule.getLecturer()
                                        .getUserId()
                                        .equals(lecturerId))
                        .map(LecturerScheduleResponse::new)
                        .toList();

        return ResponseEntity.ok(schedules);
    }

    @GetMapping
    public ResponseEntity<AvailabilityResponse> getAvailability(
            @RequestParam Integer lecturerId,
            @RequestParam String date) {

        LocalDate selectedDate =
                LocalDate.parse(date);

        DayOfWeek dayOfWeek =
                selectedDate.getDayOfWeek();

        String dayName =
                dayOfWeek.getDisplayName(
                        TextStyle.FULL,
                        Locale.ENGLISH
                );

        String workingDaysValue =
                systemSettingService
                        .findById("WORKING_DAYS")
                        .map(setting -> setting.getSettingValue())
                        .orElse("MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY");

        if (workingDaysValue == null || workingDaysValue.trim().isEmpty()) {
            workingDaysValue = "MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY";
        }

        List<String> workingDays =
                java.util.Arrays.stream(workingDaysValue.split(","))
                        .map(String::trim)
                        .map(String::toUpperCase)
                        .filter(day -> !day.isEmpty())
                        .toList();

        if (!workingDays.contains(dayName.toUpperCase())) {

            AvailabilityResponse response =
                    new AvailabilityResponse(
                            lecturerId,
                            selectedDate.format(
                                    DateTimeFormatter.ISO_LOCAL_DATE
                            ),
                            dayName,
                            List.of()
                    );

            return ResponseEntity.ok(response);
        }

        boolean isBlocked =
                blockOutDateRepository
                        .existsByLecturerUserIdAndBlockDate(
                                lecturerId,
                                selectedDate
                        );

        if (isBlocked) {

            AvailabilityResponse response =
                    new AvailabilityResponse(
                            lecturerId,
                            selectedDate.format(
                                    DateTimeFormatter.ISO_LOCAL_DATE
                            ),
                            dayName,
                            List.of()
                    );

            return ResponseEntity.ok(response);
        }

        List<LecturerSchedule> schedules =
                lecturerScheduleService
                        .findByLecturerIdAndDay(
                                lecturerId,
                                dayName
                        );

        List<Consultation> consultations =
                consultationRepository
                        .findByLecturerUserIdAndScheduledDateAndStatusIn(
                                lecturerId,
                                selectedDate,
                                List.of(
                                        Consultation.Status.PENDING,
                                        Consultation.Status.CONFIRMED
                                )
                        );

        List<java.time.LocalTime> bookedTimes =
                consultations.stream()
                        .map(Consultation::getScheduledTime)
                        .toList();

        List<LecturerSchedule> availableSchedules =
                schedules.stream()
                        .filter(schedule ->
                                "AVAILABLE".equalsIgnoreCase(
                                        schedule.getSlotType()
                                )
                        )
                        .toList();

        List<LecturerSchedule> unavailableSchedules =
                schedules.stream()
                        .filter(schedule ->
                                "CLASS".equalsIgnoreCase(
                                        schedule.getSlotType()
                                )
                                        ||
                                        "BUSY".equalsIgnoreCase(
                                                schedule.getSlotType()
                                        )
                        )
                        .toList();

        List<String> availableSlots =
                availableSchedules.stream()
                        .flatMap(schedule ->
                                generateSlots(
                                        schedule.getStartTime(),
                                        schedule.getEndTime()
                                ).stream()
                        )
                        .filter(slot -> {

                            java.time.LocalTime slotTime =
                                    java.time.LocalTime.parse(
                                            slot,
                                            java.time.format.DateTimeFormatter
                                                    .ofPattern("hh:mm a")
                                    );

                            java.time.LocalTime slotEnd =
                                    slotTime.plusMinutes(30);

                            boolean overlapsUnavailable =
                                    unavailableSchedules.stream()
                                            .anyMatch(schedule ->
                                                    slotTime.isBefore(
                                                            schedule.getEndTime()
                                                    )
                                                            &&
                                                            slotEnd.isAfter(
                                                                    schedule.getStartTime()
                                                            )
                                            );

                            boolean alreadyBooked =
                                    bookedTimes.contains(slotTime);

                            return !overlapsUnavailable
                                    && !alreadyBooked;
                        })
                        .distinct()
                        .sorted(
                                Comparator.comparing(
                                        slot -> java.time.LocalTime.parse(
                                                slot,
                                                java.time.format.DateTimeFormatter
                                                        .ofPattern("hh:mm a")
                                        )
                                )
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

        java.time.LocalTime currentTime =
                startTime;

        while (
                currentTime.plusMinutes(30)
                        .compareTo(endTime) <= 0
        ) {

            slots.add(
                    currentTime.format(
                            java.time.format.DateTimeFormatter
                                    .ofPattern("hh:mm a")
                    )
            );

            currentTime =
                    currentTime.plusMinutes(30);
        }

        return slots;
    }

    @DeleteMapping("/schedule/{id}")
    public ResponseEntity<Void> deleteSchedule(
            @PathVariable Long id,
            Authentication authentication) {

        LecturerSchedule schedule =
                lecturerScheduleService.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Schedule not found"));

        Integer loggedInLecturerId =
                userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() ->
                                new RuntimeException("User not found"))
                        .getId();

        if (!schedule.getLecturer()
                .getUserId()
                .equals(loggedInLecturerId)) {

            return ResponseEntity.status(403).build();
        }

        lecturerScheduleService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}