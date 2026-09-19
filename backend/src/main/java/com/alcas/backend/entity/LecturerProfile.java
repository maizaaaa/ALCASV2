package com.alcas.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lecturer_profile")
public class LecturerProfile {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "school_id", nullable = false)
    private Integer schoolId;

    @Column(name = "staff_number", nullable = false, unique = true, length = 30)
    private String staffNumber;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(name = "office_room", nullable = false, length = 100)
    private String officeRoom;

    @Column(length = 20)
    private String phone;

    @Column(name = "office_hours", length = 150)
    private String officeHours;

    @Column(name = "virtual_room_url", length = 255)
    private String virtualRoomUrl;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "avatar_url", length = 255)
    private String avatarUrl;

    @Column(name = "email_notifications")
    private Boolean emailNotifications = true;

    @Column(name = "auto_reminder_24h")
    private Boolean autoReminder24h = true;

    @Column(name = "auto_approve_fyp")
    private Boolean autoApproveFyp = false;

    // Getters and Setters

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public String getStaffNumber() {
        return staffNumber;
    }

    public void setStaffNumber(String staffNumber) {
        this.staffNumber = staffNumber;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getOfficeRoom() {
        return officeRoom;
    }

    public void setOfficeRoom(String officeRoom) {
        this.officeRoom = officeRoom;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOfficeHours() {
        return officeHours;
    }

    public void setOfficeHours(String officeHours) {
        this.officeHours = officeHours;
    }

    public String getVirtualRoomUrl() {
        return virtualRoomUrl;
    }

    public void setVirtualRoomUrl(String virtualRoomUrl) {
        this.virtualRoomUrl = virtualRoomUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
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

    public Boolean getAutoApproveFyp() {
        return autoApproveFyp;
    }

    public void setAutoApproveFyp(Boolean autoApproveFyp) {
        this.autoApproveFyp = autoApproveFyp;
    }
}