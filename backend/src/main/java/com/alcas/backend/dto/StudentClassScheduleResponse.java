package com.alcas.backend.dto;

public class StudentClassScheduleResponse {

    private Long id;
    private String dayOfWeek;
    private String timeSlot;
    private String category;

    public StudentClassScheduleResponse(
            Long id,
            String dayOfWeek,
            String timeSlot,
            String category) {

        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.timeSlot = timeSlot;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}