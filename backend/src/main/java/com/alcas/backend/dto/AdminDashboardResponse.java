package com.alcas.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class AdminDashboardResponse {

    private Stats stats;
    private List<BreakdownItem> todayBreakdown = new ArrayList<>();
    private List<RecentLogItem> recentLogs = new ArrayList<>();
    private List<RecentLogItem> todayLogs = new ArrayList<>();

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(Stats stats, List<BreakdownItem> todayBreakdown, List<RecentLogItem> recentLogs) {
        this.stats = stats;
        this.todayBreakdown = todayBreakdown;
        this.recentLogs = recentLogs;
    }

    public AdminDashboardResponse(Stats stats, List<BreakdownItem> todayBreakdown, List<RecentLogItem> recentLogs, List<RecentLogItem> todayLogs) {
        this.stats = stats;
        this.todayBreakdown = todayBreakdown;
        this.recentLogs = recentLogs;
        this.todayLogs = todayLogs;
    }

    public static class Stats {
        private int todayConsultations;
        private int pendingApprovals;
        private int weeklyNoShows;

        public Stats() {
        }

        public Stats(int todayConsultations, int pendingApprovals, int weeklyNoShows) {
            this.todayConsultations = todayConsultations;
            this.pendingApprovals = pendingApprovals;
            this.weeklyNoShows = weeklyNoShows;
        }

        public int getTodayConsultations() {
            return todayConsultations;
        }

        public void setTodayConsultations(int todayConsultations) {
            this.todayConsultations = todayConsultations;
        }

        public int getPendingApprovals() {
            return pendingApprovals;
        }

        public void setPendingApprovals(int pendingApprovals) {
            this.pendingApprovals = pendingApprovals;
        }

        public int getWeeklyNoShows() {
            return weeklyNoShows;
        }

        public void setWeeklyNoShows(int weeklyNoShows) {
            this.weeklyNoShows = weeklyNoShows;
        }
    }

    public static class BreakdownItem {
        private String label;
        private int count;
        private int percentage;
        private String colorClass;

        public BreakdownItem() {
        }

        public BreakdownItem(String label, int count, int percentage, String colorClass) {
            this.label = label;
            this.count = count;
            this.percentage = percentage;
            this.colorClass = colorClass;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }

        public int getPercentage() {
            return percentage;
        }

        public void setPercentage(int percentage) {
            this.percentage = percentage;
        }

        public String getColorClass() {
            return colorClass;
        }

        public void setColorClass(String colorClass) {
            this.colorClass = colorClass;
        }
    }

    public static class RecentLogItem {
        private String id;
        private String student;
        private String lecturer;
        private String status;
        private String time;
        private String topic;
        private String room;
        private String notes;
        private String date;
        private String matric;
        private String mode;

        public RecentLogItem() {
        }

        public RecentLogItem(String id, String student, String lecturer, String status, String time, String topic, String room, String notes) {
            this(id, student, lecturer, status, time, topic, room, notes, null, null, null);
        }

        public RecentLogItem(String id, String student, String lecturer, String status, String time, String topic, String room, String notes, String date, String matric, String mode) {
            this.id = id;
            this.student = student;
            this.lecturer = lecturer;
            this.status = status;
            this.time = time;
            this.topic = topic;
            this.room = room;
            this.notes = notes;
            this.date = date;
            this.matric = matric;
            this.mode = mode;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getStudent() {
            return student;
        }

        public void setStudent(String student) {
            this.student = student;
        }

        public String getLecturer() {
            return lecturer;
        }

        public void setLecturer(String lecturer) {
            this.lecturer = lecturer;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public String getTopic() {
            return topic;
        }

        public void setTopic(String topic) {
            this.topic = topic;
        }

        public String getRoom() {
            return room;
        }

        public void setRoom(String room) {
            this.room = room;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getMatric() {
            return matric;
        }

        public void setMatric(String matric) {
            this.matric = matric;
        }

        public String getMode() {
            return mode;
        }

        public void setMode(String mode) {
            this.mode = mode;
        }
    }

    public Stats getStats() {
        return stats;
    }

    public void setStats(Stats stats) {
        this.stats = stats;
    }

    public List<BreakdownItem> getTodayBreakdown() {
        return todayBreakdown;
    }

    public void setTodayBreakdown(List<BreakdownItem> todayBreakdown) {
        this.todayBreakdown = todayBreakdown;
    }

    public List<RecentLogItem> getRecentLogs() {
        return recentLogs;
    }

    public void setRecentLogs(List<RecentLogItem> recentLogs) {
        this.recentLogs = recentLogs;
    }

    public List<RecentLogItem> getTodayLogs() {
        return todayLogs;
    }

    public void setTodayLogs(List<RecentLogItem> todayLogs) {
        this.todayLogs = todayLogs;
    }
}
