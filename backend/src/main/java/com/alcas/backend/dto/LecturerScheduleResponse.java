package com.alcas.backend.dto;

import com.alcas.backend.entity.LecturerSchedule;

public class LecturerScheduleResponse {

    private Long id;
    private Integer lecturerId;
    private String dayOfWeek;
    private String startTime;
    private String endTime;
    private String slotType;
    private String title;

    public LecturerScheduleResponse(LecturerSchedule schedule) {

        this.id = schedule.getId();

        this.lecturerId = schedule.getLecturer()
                .getUserId();

        this.dayOfWeek = schedule.getDayOfWeek();

        this.startTime = schedule.getStartTime()
                .toString();

        this.endTime = schedule.getEndTime()
                .toString();

        this.slotType = schedule.getSlotType();

        this.title = schedule.getTitle();
    }

    public Long getId() {
        return id;
    }

    public Integer getLecturerId() {
        return lecturerId;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public String getSlotType() {
        return slotType;
    }

    public String getTitle() {
        return title;
    }
}