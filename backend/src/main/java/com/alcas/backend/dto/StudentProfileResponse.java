package com.alcas.backend.dto;

public class StudentProfileResponse {

    private Integer userId;
    private String fullName;
    private String email;
    private String matricNumber;
    private String phone;
    private String profileImg;
    private String school;
    private String program;
    private Boolean emailNotifications;
    private Boolean autoReminder24h;

    public StudentProfileResponse() {
    }

    public StudentProfileResponse(
            Integer userId,
            String fullName,
            String email,
            String matricNumber,
            String phone,
            String profileImg,
            String school,
            String program,
            Boolean emailNotifications,
            Boolean autoReminder24h) {

        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.matricNumber = matricNumber;
        this.phone = phone;
        this.profileImg = profileImg;
        this.school = school;
        this.program = program;
        this.emailNotifications = emailNotifications;
        this.autoReminder24h = autoReminder24h;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatricNumber() {
        return matricNumber;
    }

    public void setMatricNumber(String matricNumber) {
        this.matricNumber = matricNumber;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfileImg() {
        return profileImg;
    }

    public void setProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public Boolean getEmailNotifications() {
        return emailNotifications;
    }

    public void setEmailNotifications(Boolean emailNotifications) {
        this.emailNotifications = emailNotifications;
    }

    public Boolean getAutoReminder24h() {
        return autoReminder24h;
    }

    public void setAutoReminder24h(Boolean autoReminder24h) {
        this.autoReminder24h = autoReminder24h;
    }
}