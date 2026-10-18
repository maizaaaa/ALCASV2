package com.alcas.backend.dto;

public class LecturerNoShowRequest {

    private String appointmentId;
    private String studentRemark;

    public LecturerNoShowRequest() {
    }

    public LecturerNoShowRequest(String appointmentId, String studentRemark) {
        this.appointmentId = appointmentId;
        this.studentRemark = studentRemark;
    }

    public String getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getStudentRemark() {
        return studentRemark;
    }

    public void setStudentRemark(String studentRemark) {
        this.studentRemark = studentRemark;
    }
}
