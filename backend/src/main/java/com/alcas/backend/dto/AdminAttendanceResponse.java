package com.alcas.backend.dto;

public class AdminAttendanceResponse {

    private Long id;
    private String consultationId;
    private Integer studentId;
    private String studentName;
    private String studentMatric;
    private Integer lecturerId;
    private String lecturerName;
    private String attendanceDate;
    private String status;
    private String notes;
    private Integer markedBy;
    private String markedByName;
    private String markedAt;
    private Boolean warningIssued = false;

    public AdminAttendanceResponse() {
    }

    public AdminAttendanceResponse(
            Long id,
            String consultationId,
            Integer studentId,
            String studentName,
            String studentMatric,
            Integer lecturerId,
            String lecturerName,
            String attendanceDate,
            String status,
            String notes,
            Integer markedBy,
            String markedByName,
            String markedAt) {
        this.id = id;
        this.consultationId = consultationId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentMatric = studentMatric;
        this.lecturerId = lecturerId;
        this.lecturerName = lecturerName;
        this.attendanceDate = attendanceDate;
        this.status = status;
        this.notes = notes;
        this.markedBy = markedBy;
        this.markedByName = markedByName;
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

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentMatric() {
        return studentMatric;
    }

    public void setStudentMatric(String studentMatric) {
        this.studentMatric = studentMatric;
    }

    public Integer getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(Integer lecturerId) {
        this.lecturerId = lecturerId;
    }

    public String getLecturerName() {
        return lecturerName;
    }

    public void setLecturerName(String lecturerName) {
        this.lecturerName = lecturerName;
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

    public String getMarkedByName() {
        return markedByName;
    }

    public void setMarkedByName(String markedByName) {
        this.markedByName = markedByName;
    }

    public String getMarkedAt() {
        return markedAt;
    }

    public void setMarkedAt(String markedAt) {
        this.markedAt = markedAt;
    }

    public Boolean getWarningIssued() {
        return warningIssued != null && warningIssued;
    }

    public void setWarningIssued(Boolean warningIssued) {
        this.warningIssued = warningIssued;
    }
}
