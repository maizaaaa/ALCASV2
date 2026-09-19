package com.alcas.backend.dto;

public class LecturerResponse {

    private Integer id;
    private String name;
    private String school;

    public LecturerResponse() {
    }

    public LecturerResponse(
            Integer id,
            String name,
            String school) {

        this.id = id;
        this.name = name;
        this.school = school;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }
}