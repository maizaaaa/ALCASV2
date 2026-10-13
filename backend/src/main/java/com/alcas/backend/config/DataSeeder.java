package com.alcas.backend.config;

import com.alcas.backend.entity.User;
import com.alcas.backend.entity.School;
import com.alcas.backend.repository.UserRepository;
import com.alcas.backend.repository.SchoolRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

import com.alcas.backend.entity.Program;
import com.alcas.backend.repository.ProgramRepository;
import com.alcas.backend.entity.Broadcast;
import com.alcas.backend.repository.BroadcastRepository;
import com.alcas.backend.entity.SystemSetting;
import com.alcas.backend.repository.SystemSettingRepository;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            // Test Lecturer
            if (!userRepository.existsByEmail(
                    "lecturer.test@example.com")) {

                User lecturer = new User();

                lecturer.setEmail(
                        "lecturer.test@example.com");

                lecturer.setPassword(
                        passwordEncoder.encode(
                                "Lecturer123!"
                        )
                );

                lecturer.setFullName(
                        "Lecturer Test"
                );

                lecturer.setRole(
                        User.Role.LECTURER
                );

                lecturer.setStatus(
                        User.Status.ACTIVE
                );

                lecturer.setCreatedAt(
                        LocalDateTime.now()
                );

                lecturer.setUpdatedAt(
                        LocalDateTime.now()
                );

                userRepository.save(lecturer);
            }

            // Test Admin
            if (!userRepository.existsByEmail(
                    "admin.test@example.com")) {

                User admin = new User();

                admin.setEmail(
                        "admin.test@example.com");

                admin.setPassword(
                        passwordEncoder.encode(
                                "Admin123!"
                        )
                );

                admin.setFullName(
                        "Admin Test"
                );

                admin.setRole(
                        User.Role.ADMIN
                );

                admin.setStatus(
                        User.Status.ACTIVE
                );

                admin.setCreatedAt(
                        LocalDateTime.now()
                );

                admin.setUpdatedAt(
                        LocalDateTime.now()
                );

                userRepository.save(admin);
            }
        };
    }

    @Bean
    CommandLineRunner seedSchools(SchoolRepository schoolRepository, ProgramRepository programRepository) {
        return args -> {
            String[] defaultSchools = {
                "School of Computing (SOC)",
                "School of Technology Management and Logistics (STML)",
                "School of Business Management (SBM)",
                "School of Quantitative Sciences (SQS)"
            };
            for (String schoolName : defaultSchools) {
                boolean exists = schoolRepository.findAll().stream()
                        .anyMatch(s -> s.getName() != null && (s.getName().equalsIgnoreCase(schoolName)
                                || s.getName().toLowerCase().contains(schoolName.toLowerCase().substring(0, 15))));
                if (!exists) {
                    School s = new School();
                    s.setName(schoolName);
                    schoolRepository.save(s);
                }
            }

            for (School school : schoolRepository.findAll()) {
                String sName = school.getName().toLowerCase();
                String[] progs = {};
                if (sName.contains("computing")) {
                    progs = new String[] {
                        "Bachelor of Science with Hons (Information Technology)",
                        "Bachelor of Computer Science (BCS)",
                        "Bachelor of Software Engineering (BSE)"
                    };
                } else if (sName.contains("logistics") || sName.contains("technology management")) {
                    progs = new String[] {
                        "Bachelor of Technology Management (BTM)",
                        "Bachelor of Logistics and Transportation (BLT)"
                    };
                } else if (sName.contains("business")) {
                    progs = new String[] {
                        "Bachelor of Business Administration (BBA)",
                        "Bachelor of Marketing (BM)"
                    };
                } else if (sName.contains("quantitative")) {
                    progs = new String[] {
                        "Bachelor of Science in Decision Science (BDS)",
                        "Bachelor of Science in Industrial Statistics (BIS)"
                    };
                }

                for (String pName : progs) {
                    boolean pExists = programRepository.findBySchoolId(school.getId()).stream()
                            .anyMatch(p -> p.getName() != null && p.getName().equalsIgnoreCase(pName));
                    if (!pExists) {
                        Program p = new Program();
                        p.setSchool(school);
                        p.setName(pName);
                        programRepository.save(p);
                    }
                }
            }
        };
    }

    @Bean
    CommandLineRunner seedBroadcasts(BroadcastRepository broadcastRepository, UserRepository userRepository) {
        return args -> {
            if (broadcastRepository.count() == 0) {
                User admin = userRepository.findFirstByRole(User.Role.ADMIN).orElse(null);
                if (admin != null) {
                    Broadcast b1 = new Broadcast();
                    b1.setSubject("System Maintenance Tonight");
                    b1.setMessage("Scheduled maintenance will take place tonight from 11:00 PM to 02:00 AM.");
                    b1.setTargetAudience("ALL");
                    b1.setSendInApp(true);
                    b1.setSendEmail(true);
                    b1.setStatus("SENT");
                    b1.setCreatedBy(admin);
                    b1.setCreatedAt(LocalDateTime.now().minusDays(5));
                    broadcastRepository.save(b1);

                    Broadcast b2 = new Broadcast();
                    b2.setSubject("Reminder: Update Consultation Hours");
                    b2.setMessage("All faculty members are kindly requested to update their weekly availability slots.");
                    b2.setTargetAudience("LECTURERS");
                    b2.setSendInApp(true);
                    b2.setSendEmail(false);
                    b2.setStatus("SENT");
                    b2.setCreatedBy(admin);
                    b2.setCreatedAt(LocalDateTime.now().minusDays(10));
                    broadcastRepository.save(b2);

                    Broadcast b3 = new Broadcast();
                    b3.setSubject("Welcome to Semester A232");
                    b3.setMessage("Welcome to the new academic semester! Please check consultation slots early.");
                    b3.setTargetAudience("STUDENTS");
                    b3.setSendInApp(false);
                    b3.setSendEmail(true);
                    b3.setStatus("SENT");
                    b3.setCreatedBy(admin);
                    b3.setCreatedAt(LocalDateTime.now().minusDays(20));
                    broadcastRepository.save(b3);
                }
            }
        };
    }

    @Bean
    CommandLineRunner seedSystemSettings(SystemSettingRepository systemSettingRepository) {
        return args -> {
            if (!systemSettingRepository.existsById("SEMESTER_NAME")) {
                SystemSetting s = new SystemSetting();
                s.setSettingKey("SEMESTER_NAME");
                s.setSettingValue("Semester 1 2026/2027");
                s.setDescription("Active academic semester name");
                s.setUpdatedAt(LocalDateTime.now());
                systemSettingRepository.save(s);
            }

            if (!systemSettingRepository.existsById("SEMESTER_START_DATE")) {
                SystemSetting s = new SystemSetting();
                s.setSettingKey("SEMESTER_START_DATE");
                s.setSettingValue("2026-09-01");
                s.setDescription("Academic semester start date");
                s.setUpdatedAt(LocalDateTime.now());
                systemSettingRepository.save(s);
            }

            if (!systemSettingRepository.existsById("SEMESTER_END_DATE")) {
                SystemSetting s = new SystemSetting();
                s.setSettingKey("SEMESTER_END_DATE");
                s.setSettingValue("2027-01-31");
                s.setDescription("Academic semester end date");
                s.setUpdatedAt(LocalDateTime.now());
                systemSettingRepository.save(s);
            }

            if (!systemSettingRepository.existsById("WORKING_DAYS")) {
                SystemSetting s = new SystemSetting();
                s.setSettingKey("WORKING_DAYS");
                s.setSettingValue("MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY");
                s.setDescription("Institution working days");
                s.setUpdatedAt(LocalDateTime.now());
                systemSettingRepository.save(s);
            }

            if (!systemSettingRepository.existsById("GLOBAL_BLOCK_OUT_DATES")) {
                SystemSetting s = new SystemSetting();
                s.setSettingKey("GLOBAL_BLOCK_OUT_DATES");
                s.setSettingValue("[{\"date\":\"2026-10-25\",\"reason\":\"Deepavali Holiday\"},{\"date\":\"2026-12-25\",\"reason\":\"Christmas Day\"},{\"date\":\"2027-01-01\",\"reason\":\"New Year's Day\"}]");
                s.setDescription("Global block-out dates for holidays and breaks");
                s.setUpdatedAt(LocalDateTime.now());
                systemSettingRepository.save(s);
            }
        };
    }
}