package com.alcas.backend.dto;

public class BlockOutDateResponse {

    private Integer id;
    private Integer lecturerId;
    private String blockDate;
    private String reason;

    public BlockOutDateResponse() {
    }

    public BlockOutDateResponse(
            Integer id,
            Integer lecturerId,
            String blockDate,
            String reason) {

        this.id = id;
        this.lecturerId = lecturerId;
        this.blockDate = blockDate;
        this.reason = reason;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(Integer lecturerId) {
        this.lecturerId = lecturerId;
    }

    public String getBlockDate() {
        return blockDate;
    }

    public void setBlockDate(String blockDate) {
        this.blockDate = blockDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}