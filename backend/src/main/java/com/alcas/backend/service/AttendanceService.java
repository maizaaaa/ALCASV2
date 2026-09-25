package com.alcas.backend.service;

import com.alcas.backend.entity.Attendance;
import com.alcas.backend.entity.Consultation;
import com.alcas.backend.entity.LecturerProfile;
import com.alcas.backend.entity.StudentProfile;
import com.alcas.backend.entity.User;
import com.alcas.backend.exception.UnauthorizedException;
import com.alcas.backend.repository.AttendanceRepository;
import com.alcas.backend.repository.ConsultationRepository;
import com.alcas.backend.repository.LecturerProfileRepository;
import com.alcas.backend.repository.StudentProfileRepository;
import com.alcas.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final ConsultationRepository consultationRepository;
    private final LecturerProfileRepository lecturerProfileRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;

    public AttendanceService(AttendanceRepository attendanceRepository,
                             ConsultationRepository consultationRepository,
                             LecturerProfileRepository lecturerProfileRepository,
                             StudentProfileRepository studentProfileRepository,
                             UserRepository userRepository) {

        this.attendanceRepository = attendanceRepository;
        this.consultationRepository = consultationRepository;
        this.lecturerProfileRepository = lecturerProfileRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Attendance markAttendance (
            String consultationId,
            Integer lecturerId,
            Attendance.Status status,
            String notes
    ) {
        Consultation consultation =
                consultationRepository.findById(consultationId)
                        .orElseThrow(() ->
                                new RuntimeException("Consultation not found"));

        if (!consultation.getLecturer()
                .getUserId()
                .equals(lecturerId)) {
            throw new UnauthorizedException("You are not allowed to mark attendance for this consultation");
        }

        if (attendanceRepository.existsByConsultationId(consultationId)) {
            throw new RuntimeException("Attendance has already been marked for this consultation");
        }

        if (consultation.getStatus() != Consultation.Status.CONFIRMED) {
            throw new RuntimeException("Attendance can only be marked for a confirmed consultation");
        }

        LecturerProfile lecturer =
                lecturerProfileRepository.findById(lecturerId)
                        .orElseThrow(() ->
                                new RuntimeException("Lecturer profile not found."));

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User markedBy =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("Authenticated user not found."));

        if (!markedBy.getId().equals(lecturerId)){
            throw new UnauthorizedException("You are not allowed to mark attendance for another lecturer");
        }

        StudentProfile student =
                studentProfileRepository.findById(
                        consultation.getStudent()
                                .getUserId()
                )
                        .orElseThrow(() ->
                                new RuntimeException("Student profile not found"));

        Attendance attendance = new Attendance();

        attendance.setConsultation(consultation);
        attendance.setLecturer(lecturer);
        attendance.setStudent(student);
        attendance.setAttendanceDate(consultation.getScheduledDate());
        attendance.setStatus(status);
        attendance.setNotes(notes);
        attendance.setMarkedBy(markedBy);
        attendance.setMarkedAt(LocalDateTime.now());

        if(status == Attendance.Status.PRESENT){
            consultation.setStatus(Consultation.Status.COMPLETED);
        } else if (status == Attendance.Status.NO_SHOW) {
            consultation.setStatus(Consultation.Status.NO_SHOW);
        } else if (status == Attendance.Status.EXCUSED) {
            consultation.setStatus(Consultation.Status.COMPLETED);
        }

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> findAll() {
        return attendanceRepository.findAll();
    }

    public Optional<Attendance> findById(Long id) {
        return attendanceRepository.findById(id);
    }

    public List<Attendance> findByLecturerId (Integer lecturerId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User authenticatedUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("Authenticated user not found."));

        if (!authenticatedUser.getId().equals(lecturerId)) {
            throw new UnauthorizedException(
                    "You are not allowed to view another lecturer's attendance"
            );
        }
        return attendanceRepository
                .findByLecturerUserIdOrderByAttendanceDateDesc(lecturerId);
    }

    public List <Attendance> findByStudentId (Integer studentId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User authenticatedUser =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("Authentication user not found."));

        if (!authenticatedUser.getId().equals(studentId)) {
            throw new UnauthorizedException("You are not allowed to view another student's attendance");
        }

        return attendanceRepository
                .findByStudentUserIdOrderByAttendanceDateDesc(studentId);
    }

    public Attendance save(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public void deleteById(Long id) {
        attendanceRepository.deleteById(id);
    }
}