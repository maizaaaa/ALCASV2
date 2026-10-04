package com.alcas.backend.dto;

public class ConsultationResponse {

    private String id;
    private Integer studentId;
    private String studentName;
    private String studentMatric;
    private Integer lecturerId;
    private String lecturerName;
    private String scheduledDate;
    private String scheduledTime;
    private String reason;
    private String reasonDetails;
    private String consultationMode;
    private String location;
    private String status;
    private String proposedDate;
    private String proposedTime;
    private String rescheduleReason;

    public ConsultationResponse() {
    }

    public ConsultationResponse(
            String id,
            Integer studentId,
            String studentName,
            String studentMatric,
            Integer lecturerId,
            String lecturerName,
            String scheduledDate,
            String scheduledTime,
            String reason,
            String reasonDetails,
            String consultationMode,
            String location,
            String status,
            String proposedDate,
            String proposedTime,
            String rescheduleReason) {

        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentMatric = studentMatric;
        this.lecturerId = lecturerId;
        this.lecturerName = lecturerName;
        this.scheduledDate = scheduledDate;
        this.scheduledTime = scheduledTime;
        this.reason = reason;
        this.reasonDetails = reasonDetails;
        this.consultationMode = consultationMode;
        this.location = location;
        this.status = status;
        this.proposedDate = proposedDate;
        this.proposedTime = proposedTime;
        this.rescheduleReason = rescheduleReason;
    }

    public ConsultationResponse(
            String id,
            Integer studentId,
            Integer lecturerId,
            String lecturerName,
            String scheduledDate,
            String scheduledTime,
            String reason,
            String reasonDetails,
            String consultationMode,
            String location,
            String status,
            String proposedDate,
            String proposedTime,
            String rescheduleReason) {

        this(
                id,
                studentId,
                null,
                null,
                lecturerId,
                lecturerName,
                scheduledDate,
                scheduledTime,
                reason,
                reasonDetails,
                consultationMode,
                location,
                status,
                proposedDate,
                proposedTime,
                rescheduleReason
        );
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(String scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public String getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(String scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getReasonDetails() {
        return reasonDetails;
    }

    public void setReasonDetails(String reasonDetails) {
        this.reasonDetails = reasonDetails;
    }

    public String getConsultationMode() {
        return consultationMode;
    }

    public void setConsultationMode(String consultationMode) {
        this.consultationMode = consultationMode;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProposedDate() {
        return proposedDate;
    }

    public void setProposedDate(String proposedDate) {
        this.proposedDate = proposedDate;
    }

    public String getProposedTime() {
        return proposedTime;
    }

    public void setProposedTime(String proposedTime) {
        this.proposedTime = proposedTime;
    }

    public String getRescheduleReason() {
        return rescheduleReason;
    }

    public void setRescheduleReason(String rescheduleReason) {
        this.rescheduleReason = rescheduleReason;
    }
}