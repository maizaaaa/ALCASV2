package com.alcas.backend.controller;

import com.alcas.backend.entity.Consultation;
import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.entity.StudentProfile;
import com.alcas.backend.dto.ConsultationResponse;
import com.alcas.backend.repository.LecturerProfileRepository;
import com.alcas.backend.repository.StudentProfileRepository;
import com.alcas.backend.service.ConsultationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    private final ConsultationService consultationService;
    private final StudentProfileRepository studentProfileRepository;
    private final LecturerProfileRepository lecturerProfileRepository;

    public ConsultationController(
            ConsultationService consultationService,
            StudentProfileRepository studentProfileRepository,
            LecturerProfileRepository lecturerProfileRepository) {

        this.consultationService = consultationService;
        this.studentProfileRepository = studentProfileRepository;
        this.lecturerProfileRepository = lecturerProfileRepository;
    }

    @PostMapping
    public ResponseEntity<ConsultationResponse> createConsultation(
            @RequestParam Integer studentId,
            @RequestParam Integer lecturerId,
            @RequestParam String date,
            @RequestParam String time,
            @RequestParam String reason,
            @RequestParam(required = false) String reasonDetails) {

        StudentProfile student =
                studentProfileRepository.findById(studentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found"
                                ));

        LecturerProfile lecturer =
                lecturerProfileRepository.findById(lecturerId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Lecturer profile not found"
                                ));

        Consultation consultation = new Consultation();

        consultation.setStudent(student);
        consultation.setLecturer(lecturer);
        consultation.setScheduledDate(
                LocalDate.parse(date)
        );
        consultation.setScheduledTime(
                LocalTime.parse(time)
        );
        consultation.setReason(reason);
        consultation.setReasonDetails(reasonDetails);
        consultation.setConsultationMode("IN_PERSON");

        Consultation created =
                consultationService.createConsultation(
                        consultation
                );

        ConsultationResponse response =
                new ConsultationResponse(
                        created.getId(),
                        created.getStudent().getUserId(),
                        created.getLecturer().getUserId(),
                        created.getLecturer().getUser().getFullName(),
                        created.getScheduledDate().toString(),
                        created.getScheduledTime().toString(),
                        created.getReason(),
                        created.getReasonDetails(),
                        created.getConsultationMode(),
                        created.getLocation(),
                        created.getStatus().name(),
                        created.getProposedDate() != null
                            ? created.getProposedDate().toString()
                                : null,
                        created.getProposedTime() != null
                            ? created.getProposedTime().toString()
                                : null,
                        created.getRescheduleReason()
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ConsultationResponse>> getStudentConsultations(
            @PathVariable Integer studentId) {

        List<Consultation> consultations =
                consultationService.findByStudentId(studentId);

        List<ConsultationResponse> response =
                consultations.stream()
                        .map(consultation ->
                                new ConsultationResponse(
                                        consultation.getId(),
                                        consultation.getStudent().getUserId(),
                                        consultation.getLecturer().getUserId(),
                                        consultation.getLecturer().getUser().getFullName(),
                                        consultation.getScheduledDate().toString(),
                                        consultation.getScheduledTime().toString(),
                                        consultation.getReason(),
                                        consultation.getReasonDetails(),
                                        consultation.getConsultationMode(),
                                        consultation.getLocation(),
                                        consultation.getStatus().name(),
                                        consultation.getProposedDate() != null
                                                ? consultation.getProposedDate().toString()
                                                : null,

                                        consultation.getProposedTime() != null
                                                ? consultation.getProposedTime().toString()
                                                : null,

                                        consultation.getRescheduleReason()
                                )
                        )
                        .toList();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{consultationId}/cancel")
    public ResponseEntity<ConsultationResponse> cancelConsultation(
            @PathVariable String consultationId,
            @RequestParam Integer studentId,
            @RequestParam String cancelReason) {

        Consultation cancelled =
                consultationService.cancelConsultation(
                        consultationId,
                        studentId,
                        cancelReason
                );

        ConsultationResponse response =
                new ConsultationResponse(
                        cancelled.getId(),
                        cancelled.getStudent().getUserId(),
                        cancelled.getLecturer().getUserId(),
                        cancelled.getLecturer().getUser().getFullName(),
                        cancelled.getScheduledDate().toString(),
                        cancelled.getScheduledTime().toString(),
                        cancelled.getReason(),
                        cancelled.getReasonDetails(),
                        cancelled.getConsultationMode(),
                        cancelled.getLocation(),
                        cancelled.getStatus().name(),
                        cancelled.getProposedDate() != null
                                ? cancelled.getProposedDate().toString()
                                : null,
                        cancelled.getProposedTime() != null
                                ? cancelled.getProposedTime().toString()
                                : null,
                        cancelled.getRescheduleReason()
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/lecturer/{lecturerId}")
    public ResponseEntity<List<ConsultationResponse>> getLecturerConsultations(
            @PathVariable Integer lecturerId) {

        List<Consultation> consultations =
                consultationService.findByLecturerId(lecturerId);

        List<ConsultationResponse> response =
                consultations.stream()
                        .map(consultation ->
                                new ConsultationResponse(
                                        consultation.getId(),
                                        consultation.getStudent().getUserId(),
                                        consultation.getLecturer().getUserId(),
                                        consultation.getLecturer().getUser().getFullName(),
                                        consultation.getScheduledDate().toString(),
                                        consultation.getScheduledTime().toString(),
                                        consultation.getReason(),
                                        consultation.getReasonDetails(),
                                        consultation.getConsultationMode(),
                                        consultation.getLocation(),
                                        consultation.getStatus().name(),
                                        consultation.getProposedDate() != null
                                                ? consultation.getProposedDate().toString()
                                                : null,

                                        consultation.getProposedTime() != null
                                                ? consultation.getProposedTime().toString()
                                                : null,

                                        consultation.getRescheduleReason()
                                )
                        )
                        .toList();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{consultationId}/approve")
    public ResponseEntity<ConsultationResponse> approveConsultation(
            @PathVariable String consultationId,
            @RequestParam Integer lecturerId) {

        Consultation approved =
                consultationService.approveConsultation(
                        consultationId,
                        lecturerId
                );

        ConsultationResponse response =
                new ConsultationResponse(
                        approved.getId(),
                        approved.getStudent().getUserId(),
                        approved.getLecturer().getUserId(),
                        approved.getLecturer().getUser().getFullName(),
                        approved.getScheduledDate().toString(),
                        approved.getScheduledTime().toString(),
                        approved.getReason(),
                        approved.getReasonDetails(),
                        approved.getConsultationMode(),
                        approved.getLocation(),
                        approved.getStatus().name(),
                        approved.getProposedDate() != null
                            ? approved.getProposedDate().toString()
                                : null,
                        approved.getProposedTime() != null
                            ? approved.getProposedTime().toString()
                                : null,
                        approved.getRescheduleReason()
                );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{consultationId}/reject")
    public ResponseEntity<ConsultationResponse> rejectConsultation(
            @PathVariable String consultationId,
            @RequestParam Integer lecturerId,
            @RequestParam String rejectReason) {

        Consultation rejected =
                consultationService.rejectConsultation(
                        consultationId,
                        lecturerId,
                        rejectReason
                );

        ConsultationResponse response =
                new ConsultationResponse(
                        rejected.getId(),
                        rejected.getStudent().getUserId(),
                        rejected.getLecturer().getUserId(),
                        rejected.getLecturer().getUser().getFullName(),
                        rejected.getScheduledDate().toString(),
                        rejected.getScheduledTime().toString(),
                        rejected.getReason(),
                        rejected.getReasonDetails(),
                        rejected.getConsultationMode(),
                        rejected.getLocation(),
                        rejected.getStatus().name(),
                        rejected.getProposedDate() != null
                            ? rejected.getProposedDate().toString()
                                :null,
                        rejected.getProposedTime() != null
                            ? rejected.getProposedTime().toString()
                                :null,
                        rejected.getRescheduleReason()
                );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{consultationId}/reschedule")
    public ResponseEntity<ConsultationResponse> requestReschedule(
            @PathVariable String consultationId,
            @RequestParam Integer lecturerId,
            @RequestParam String proposedDate,
            @RequestParam String proposedTime,
            @RequestParam String rescheduleReason) {

        Consultation rescheduled =
                consultationService.requestReschedule(
                        consultationId,
                        lecturerId,
                        LocalDate.parse(proposedDate),
                        LocalTime.parse(proposedTime),
                        rescheduleReason
                );

        ConsultationResponse response =
                new ConsultationResponse(
                        rescheduled.getId(),
                        rescheduled.getStudent().getUserId(),
                        rescheduled.getLecturer().getUserId(),
                        rescheduled.getLecturer().getUser().getFullName(),
                        rescheduled.getScheduledDate().toString(),
                        rescheduled.getScheduledTime().toString(),
                        rescheduled.getReason(),
                        rescheduled.getReasonDetails(),
                        rescheduled.getConsultationMode(),
                        rescheduled.getLocation(),
                        rescheduled.getStatus().name(),
                        rescheduled.getProposedDate() != null
                            ? rescheduled.getProposedDate().toString()
                                :null,
                        rescheduled.getProposedTime() != null
                            ? rescheduled.getProposedTime().toString()
                                : null,
                        rescheduled.getRescheduleReason()
                );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{consultationId}/reschedule/accept")
    public ResponseEntity<ConsultationResponse> acceptReschedule(
            @PathVariable String consultationId,
            @RequestParam Integer studentId) {

        Consultation accepted =
                consultationService.acceptReschedule(
                        consultationId,
                        studentId
                );

        ConsultationResponse response =
                new ConsultationResponse(
                        accepted.getId(),
                        accepted.getStudent().getUserId(),
                        accepted.getLecturer().getUserId(),
                        accepted.getLecturer().getUser().getFullName(),
                        accepted.getScheduledDate().toString(),
                        accepted.getScheduledTime().toString(),
                        accepted.getReason(),
                        accepted.getReasonDetails(),
                        accepted.getConsultationMode(),
                        accepted.getLocation(),
                        accepted.getStatus().name(),
                        accepted.getProposedDate() != null
                                ? accepted.getProposedDate().toString()
                                : null,
                        accepted.getProposedTime() != null
                                ? accepted.getProposedTime().toString()
                                : null,
                        accepted.getRescheduleReason()
                );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{consultationId}/reschedule/reject")
    public ResponseEntity<ConsultationResponse> rejectReschedule(
            @PathVariable String consultationId,
            @RequestParam Integer studentId) {

        Consultation rejected =
                consultationService.rejectReschedule(
                        consultationId,
                        studentId
                );

        ConsultationResponse response =
                new ConsultationResponse(
                        rejected.getId(),
                        rejected.getStudent().getUserId(),
                        rejected.getLecturer().getUserId(),
                        rejected.getLecturer().getUser().getFullName(),
                        rejected.getScheduledDate().toString(),
                        rejected.getScheduledTime().toString(),
                        rejected.getReason(),
                        rejected.getReasonDetails(),
                        rejected.getConsultationMode(),
                        rejected.getLocation(),
                        rejected.getStatus().name(),
                        rejected.getProposedDate() != null
                                ? rejected.getProposedDate().toString()
                                : null,
                        rejected.getProposedTime() != null
                                ? rejected.getProposedTime().toString()
                                : null,
                        rejected.getRescheduleReason()
                );

        return ResponseEntity.ok(response);
    }
}