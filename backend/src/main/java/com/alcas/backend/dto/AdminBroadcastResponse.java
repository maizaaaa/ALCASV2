package com.alcas.backend.dto;

import com.alcas.backend.entity.Broadcast;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class AdminBroadcastResponse {

    private String id;
    private String date;
    private String subject;
    private String message;
    private String audience;
    private List<String> channels;
    private String status;
    private LocalDateTime createdAt;

    public AdminBroadcastResponse() {
    }

    public AdminBroadcastResponse(String id, String date, String subject, String message, String audience, List<String> channels, String status, LocalDateTime createdAt) {
        this.id = id;
        this.date = date;
        this.subject = subject;
        this.message = message;
        this.audience = audience;
        this.channels = channels;
        this.status = status;
        this.createdAt = createdAt;
    }

    public static AdminBroadcastResponse fromEntity(Broadcast broadcast) {
        if (broadcast == null) {
            return null;
        }

        String idStr = broadcast.getId() != null ? "BC-" + String.format("%03d", broadcast.getId()) : "BC-000";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");
        String dateStr = broadcast.getCreatedAt() != null ? broadcast.getCreatedAt().format(formatter) : "Just Now";

        List<String> channelsList = new ArrayList<>();
        if (Boolean.TRUE.equals(broadcast.getSendInApp())) {
            channelsList.add("In-App");
        }
        if (Boolean.TRUE.equals(broadcast.getSendEmail())) {
            channelsList.add("Email");
        }
        if (channelsList.isEmpty()) {
            channelsList.add("In-App");
        }

        String aud = broadcast.getTargetAudience() != null ? broadcast.getTargetAudience() : "ALL";
        String stat = broadcast.getStatus() != null ? broadcast.getStatus() : "SENT";

        return new AdminBroadcastResponse(
                idStr,
                dateStr,
                broadcast.getSubject(),
                broadcast.getMessage(),
                aud,
                channelsList,
                stat,
                broadcast.getCreatedAt()
        );
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }

    public List<String> getChannels() {
        return channels;
    }

    public void setChannels(List<String> channels) {
        this.channels = channels;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
