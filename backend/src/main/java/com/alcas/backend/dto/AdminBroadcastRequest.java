package com.alcas.backend.dto;

public class AdminBroadcastRequest {

    private String targetAudience;
    private Boolean sendInApp;
    private Boolean sendEmail;
    private String subject;
    private String message;

    public AdminBroadcastRequest() {
    }

    public AdminBroadcastRequest(String targetAudience, Boolean sendInApp, Boolean sendEmail, String subject, String message) {
        this.targetAudience = targetAudience;
        this.sendInApp = sendInApp;
        this.sendEmail = sendEmail;
        this.subject = subject;
        this.message = message;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public Boolean getSendInApp() {
        return sendInApp;
    }

    public void setSendInApp(Boolean sendInApp) {
        this.sendInApp = sendInApp;
    }

    public Boolean getSendEmail() {
        return sendEmail;
    }

    public void setSendEmail(Boolean sendEmail) {
        this.sendEmail = sendEmail;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
