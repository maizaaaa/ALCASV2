package com.alcas.backend.dto;

import java.util.List;

public class AvailabilityResponse {

    private Integer lecturerId;
    private String date;
    private String dayOfWeek;
    private List<String> availableSlots;

    public AvailabilityResponse() {
    }

    public AvailabilityResponse(
            Integer lecturerId,
            String date,
            String dayOfWeek,
            List<String> availableSlots) {

        this.lecturerId = lecturerId;
        this.date = date;
        this.dayOfWeek = dayOfWeek;
        this.availableSlots = availableSlots;
    }

    public Integer getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(Integer lecturerId) {
        this.lecturerId = lecturerId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public List<String> getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(List<String> availableSlots) {
        this.availableSlots = availableSlots;
    }
}