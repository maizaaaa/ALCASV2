package com.alcas.backend.dto;

public class AttendanceResponse {

    private Long id;
    private String consultationId;
    private Integer studentId;
    private Integer lecturerId;
    private String attendanceDate;
    private String status;
    private String notes;
    private Integer markedBy;
    private String markedAt;

    public AttendanceResponse() {
    }

    public AttendanceResponse(
            Long id,
            String consultationId,
            Integer studentId,
            Integer lecturerId,
            String attendanceDate,
            String status,
            String notes,
            Integer markedBy,
            String markedAt) {

        this.id = id;
        this.consultationId = consultationId;
        this.studentId = studentId;
        this.lecturerId = lecturerId;
        this.attendanceDate = attendanceDate;
        this.status = status;
        this.notes = notes;
        this.markedBy = markedBy;
        this.markedAt = markedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConsultationId() {
        return consultationId;
    }

    public void setConsultationId(String consultationId) {
        this.consultationId = consultationId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(Integer lecturerId) {
        this.lecturerId = lecturerId;
    }

    public String getAttendanceDate() {
        return attendanceDate;
    }

    public void setAttendanceDate(String attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getMarkedBy() {
        return markedBy;
    }

    public void setMarkedBy(Integer markedBy) {
        this.markedBy = markedBy;
    }

    public String getMarkedAt() {
        return markedAt;
    }

    public void setMarkedAt(String markedAt) {
        this.markedAt = markedAt;
    }
}