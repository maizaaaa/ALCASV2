package com.alcas.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class AdminAnalyticsReportResponse {

    private Integer totalConsultations;
    private Integer completedCount;
    private Integer noShowCount;
    private Integer cancelledCount;
    private Integer pendingCount;
    private String completionRate;
    private String mostActiveLecturer;
    private String peakDay;
    private String schoolName;
    private Integer schoolId;
    private String startDate;
    private String endDate;

    private List<WeeklyTrendItem> weeklyTrend = new ArrayList<>();
    private StatusDistribution statusDistribution;
    private List<ConsultationRecordItem> consultations = new ArrayList<>();

    public AdminAnalyticsReportResponse() {
    }

    public static class WeeklyTrendItem {
        private String week;
        private int count;
        private String height;

        public WeeklyTrendItem() {}

        public WeeklyTrendItem(String week, int count, String height) {
            this.week = week;
            this.count = count;
            this.height = height;
        }

        public String getWeek() {
            return week;
        }

        public void setWeek(String week) {
            this.week = week;
        }

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }

        public String getHeight() {
            return height;
        }

        public void setHeight(String height) {
            this.height = height;
        }
    }

    public static class StatusDistribution {
        private int completedCount;
        private double completedPercentage;
        private int noShowCount;
        private double noShowPercentage;
        private int cancelledCount;
        private double cancelledPercentage;
        private int pendingCount;
        private double pendingPercentage;

        public StatusDistribution() {}

        public StatusDistribution(int completedCount, double completedPercentage,
                                  int noShowCount, double noShowPercentage,
                                  int cancelledCount, double cancelledPercentage,
                                  int pendingCount, double pendingPercentage) {
            this.completedCount = completedCount;
            this.completedPercentage = completedPercentage;
            this.noShowCount = noShowCount;
            this.noShowPercentage = noShowPercentage;
            this.cancelledCount = cancelledCount;
            this.cancelledPercentage = cancelledPercentage;
            this.pendingCount = pendingCount;
            this.pendingPercentage = pendingPercentage;
        }

        public int getCompletedCount() {
            return completedCount;
        }

        public void setCompletedCount(int completedCount) {
            this.completedCount = completedCount;
        }

        public double getCompletedPercentage() {
            return completedPercentage;
        }

        public void setCompletedPercentage(double completedPercentage) {
            this.completedPercentage = completedPercentage;
        }

        public int getNoShowCount() {
            return noShowCount;
        }

        public void setNoShowCount(int noShowCount) {
            this.noShowCount = noShowCount;
        }

        public double getNoShowPercentage() {
            return noShowPercentage;
        }

        public void setNoShowPercentage(double noShowPercentage) {
            this.noShowPercentage = noShowPercentage;
        }

        public int getCancelledCount() {
            return cancelledCount;
        }

        public void setCancelledCount(int cancelledCount) {
            this.cancelledCount = cancelledCount;
        }

        public double getCancelledPercentage() {
            return cancelledPercentage;
        }

        public void setCancelledPercentage(double cancelledPercentage) {
            this.cancelledPercentage = cancelledPercentage;
        }

        public int getPendingCount() {
            return pendingCount;
        }

        public void setPendingCount(int pendingCount) {
            this.pendingCount = pendingCount;
        }

        public double getPendingPercentage() {
            return pendingPercentage;
        }

        public void setPendingPercentage(double pendingPercentage) {
            this.pendingPercentage = pendingPercentage;
        }
    }

    public static class ConsultationRecordItem {
        private String id;
        private String scheduledDate;
        private String scheduledTime;
        private String studentName;
        private String studentMatric;
        private String lecturerName;
        private String schoolName;
        private String reason;
        private String consultationMode;
        private String status;

        public ConsultationRecordItem() {}

        public ConsultationRecordItem(String id, String scheduledDate, String scheduledTime,
                                      String studentName, String studentMatric,
                                      String lecturerName, String schoolName,
                                      String reason, String consultationMode, String status) {
            this.id = id;
            this.scheduledDate = scheduledDate;
            this.scheduledTime = scheduledTime;
            this.studentName = studentName;
            this.studentMatric = studentMatric;
            this.lecturerName = lecturerName;
            this.schoolName = schoolName;
            this.reason = reason;
            this.consultationMode = consultationMode;
            this.status = status;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getScheduledDate() {
            return scheduledDate;
        }

        public void setScheduledDate(String scheduledDate) {
            this.scheduledDate = scheduledDate;
        }

        public String getScheduledTime() {
            return scheduledTime;
        }

        public void setScheduledTime(String scheduledTime) {
            this.scheduledTime = scheduledTime;
        }

        public String getStudentName() {
            return studentName;
        }

        public void setStudentName(String studentName) {
            this.studentName = studentName;
        }

        public String getStudentMatric() {
            return studentMatric;
        }

        public void setStudentMatric(String studentMatric) {
            this.studentMatric = studentMatric;
        }

        public String getLecturerName() {
            return lecturerName;
        }

        public void setLecturerName(String lecturerName) {
            this.lecturerName = lecturerName;
        }

        public String getSchoolName() {
            return schoolName;
        }

        public void setSchoolName(String schoolName) {
            this.schoolName = schoolName;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

        public String getConsultationMode() {
            return consultationMode;
        }

        public void setConsultationMode(String consultationMode) {
            this.consultationMode = consultationMode;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }

    public Integer getTotalConsultations() {
        return totalConsultations;
    }

    public void setTotalConsultations(Integer totalConsultations) {
        this.totalConsultations = totalConsultations;
    }

    public Integer getCompletedCount() {
        return completedCount;
    }

    public void setCompletedCount(Integer completedCount) {
        this.completedCount = completedCount;
    }

    public Integer getNoShowCount() {
        return noShowCount;
    }

    public void setNoShowCount(Integer noShowCount) {
        this.noShowCount = noShowCount;
    }

    public Integer getCancelledCount() {
        return cancelledCount;
    }

    public void setCancelledCount(Integer cancelledCount) {
        this.cancelledCount = cancelledCount;
    }

    public Integer getPendingCount() {
        return pendingCount;
    }

    public void setPendingCount(Integer pendingCount) {
        this.pendingCount = pendingCount;
    }

    public String getCompletionRate() {
        return completionRate;
    }

    public void setCompletionRate(String completionRate) {
        this.completionRate = completionRate;
    }

    public String getMostActiveLecturer() {
        return mostActiveLecturer;
    }

    public void setMostActiveLecturer(String mostActiveLecturer) {
        this.mostActiveLecturer = mostActiveLecturer;
    }

    public String getPeakDay() {
        return peakDay;
    }

    public void setPeakDay(String peakDay) {
        this.peakDay = peakDay;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public List<WeeklyTrendItem> getWeeklyTrend() {
        return weeklyTrend;
    }

    public void setWeeklyTrend(List<WeeklyTrendItem> weeklyTrend) {
        this.weeklyTrend = weeklyTrend;
    }

    public StatusDistribution getStatusDistribution() {
        return statusDistribution;
    }

    public void setStatusDistribution(StatusDistribution statusDistribution) {
        this.statusDistribution = statusDistribution;
    }

    public List<ConsultationRecordItem> getConsultations() {
        return consultations;
    }

    public void setConsultations(List<ConsultationRecordItem> consultations) {
        this.consultations = consultations;
    }
}
