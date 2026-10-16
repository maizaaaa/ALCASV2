package com.alcas.backend.dto;

public class LecturerProfileResponse {

    private Integer userId;
    private String staffNumber;
    private String fullName;
    private String email;
    private Integer schoolId;
    private String phone;
    private String officeRoom;
    private String officeHours;
    private String virtualRoomUrl;
    private String bio;
    private String avatarUrl;
    private Boolean emailNotifications;
    private Boolean autoReminder24h;
    private Boolean autoApproveFyp;
    private Boolean blockNonWorkingDays;
    private String blockedDays;

    public LecturerProfileResponse() {}

    public LecturerProfileResponse(
            Integer userId,
            String staffNumber,
            String fullName,
            String email,
            Integer schoolId,
            String phone,
            String officeRoom,
            String officeHours,
            String virtualRoomUrl,
            String bio,
            String avatarUrl,
            Boolean emailNotifications,
            Boolean autoReminder24h,
            Boolean autoApproveFyp) {

        this.userId = userId;
        this.staffNumber = staffNumber;
        this.fullName = fullName;
        this.email = email;
        this.schoolId = schoolId;
        this.phone = phone;
        this.officeRoom = officeRoom;
        this.officeHours = officeHours;
        this.virtualRoomUrl = virtualRoomUrl;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.emailNotifications = emailNotifications;
        this.autoReminder24h = autoReminder24h;
        this.autoApproveFyp = autoApproveFyp;
        this.blockNonWorkingDays = true;
    }

    public LecturerProfileResponse(
            Integer userId,
            String staffNumber,
            String fullName,
            String email,
            Integer schoolId,
            String phone,
            String officeRoom,
            String officeHours,
            String virtualRoomUrl,
            String bio,
            String avatarUrl,
            Boolean emailNotifications,
            Boolean autoReminder24h,
            Boolean autoApproveFyp,
            Boolean blockNonWorkingDays) {

        this(userId, staffNumber, fullName, email, schoolId, phone, officeRoom, officeHours, virtualRoomUrl, bio, avatarUrl, emailNotifications, autoReminder24h, autoApproveFyp);
        this.blockNonWorkingDays = blockNonWorkingDays;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getStaffNumber() {
        return staffNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public String getPhone() {
        return phone;
    }

    public String getOfficeRoom() {
        return officeRoom;
    }

    public String getOfficeHours() {
        return officeHours;
    }

    public String getVirtualRoomUrl() {
        return virtualRoomUrl;
    }

    public String getBio() {
        return bio;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public Boolean getEmailNotifications() {
        return emailNotifications;
    }

    public Boolean getAutoReminder24h() {
        return autoReminder24h;
    }

    public Boolean getAutoApproveFyp() {
        return autoApproveFyp;
    }

    public Boolean getBlockNonWorkingDays() {
        return blockNonWorkingDays != null ? blockNonWorkingDays : true;
    }

    public void setBlockNonWorkingDays(Boolean blockNonWorkingDays) {
        this.blockNonWorkingDays = blockNonWorkingDays;
    }

    public String getBlockedDays() {
        return blockedDays != null ? blockedDays : "FRIDAY,SATURDAY";
    }

    public void setBlockedDays(String blockedDays) {
        this.blockedDays = blockedDays;
    }
}