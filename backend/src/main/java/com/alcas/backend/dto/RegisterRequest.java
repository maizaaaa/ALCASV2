package com.alcas.backend.dto;

public class RegisterRequest {

    private String email;
    private String password;
    private String fullName;
    private String phone;
    private String matricNumber;
    private Integer schoolId;
    private Integer programId;

    public RegisterRequest() {
    }

    public RegisterRequest(
            String email,
            String password,
            String fullName,
            String phone,
            String matricNumber,
            Integer schoolId,
            Integer programId) {

        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.phone = phone;
        this.matricNumber = matricNumber;
        this.schoolId = schoolId;
        this.programId = programId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMatricNumber() {
        return matricNumber;
    }

    public void setMatricNumber(String matricNumber) {
        this.matricNumber = matricNumber;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public Integer getProgramId() {
        return programId;
    }

    public void setProgramId(Integer programId) {
        this.programId = programId;
    }
}