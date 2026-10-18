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
            String[][] schoolsAndPrograms = {
                {
                    "Tunku Puteri Intan Shafinaz School of Accountancy (TISSA)",
                    "Bachelor in Accounting with Honours",
                    "Bachelor in Accounting (Information System) with Honours"
                },
                {
                    "School of Business Management (SBM)",
                    "Bachelor of Business Administration with Honours",
                    "Bachelor of Entrepreneurship with Honours",
                    "Bachelor of Human Resource Management with Honours",
                    "Bachelor of Marketing with Honours"
                },
                {
                    "School of Economics, Finance and Banking (SEFB)",
                    "Bachelor of Science in Economics with Honours",
                    "Bachelor of Science in Agribusiness Management with Honours",
                    "Bachelor of Finance with Honours",
                    "Bachelor of Banking with Honours",
                    "Bachelor of Risk Management and Insurance with Honours"
                },
                {
                    "Islamic Business School (IBS)",
                    "Bachelor of Islamic Finance & Banking",
                    "Bachelor of Muamalat Administration",
                    "Bachelor of Halal Management"
                },
                {
                    "School of Technology Management and Logistics (STML)",
                    "Bachelor Technology Management with Honours",
                    "Bachelor Operations Management with Honours",
                    "Bachelor of Business Administration (Logistics & Transportation) with Honours"
                },
                {
                    "UUM National Golf Academy (UUMNGA)",
                    "Bachelor of Business Administration (Golf Management) with Honours"
                },
                {
                    "School of Creative Industry Management and Performing Arts (SCIMPA)",
                    "Bachelor in Creative Industry Management"
                },
                {
                    "School of Multimedia Technology and Communication (SMMTC)",
                    "Bachelor of Communication with Honours",
                    "Bachelor of Media Technology with Honours",
                    "Bachelor of Science (Multimedia) with Honours"
                },
                {
                    "School of Applied Psychology, Sosial Work and Policy (SAPSP)",
                    "Bachelor of Counselling with Honours",
                    "Bachelor of Social Work Management with Honours"
                },
                {
                    "School of Quantitative Science (SQS)",
                    "Bachelor of Science in Decision Mathematics and Data Analytics with Honours",
                    "Bachelor of Science with Honours (Business Mathematics)",
                    "Bachelor of Science with Honours (Industrial Statistics)"
                },
                {
                    "School of Education (SOE)",
                    "Bachelor of Education with Honours (Accountancy)",
                    "Bachelor of Education with Honours (Business Administation)",
                    "Bachelor of Education with Honours (Guidance & Counseling)",
                    "Bachelor of Education with Honours (Information Technology)",
                    "Bachelor of Education with Honours (Moral Education)"
                },
                {
                    "School of Computing (SOC)",
                    "Bachelor of Science with Honours (Information Technology)",
                    "Bachelor of Computer Science with Honours"
                },
                {
                    "School of Languages, Civilisation and Philosophy (SLCP)",
                    "Bachelor of Arts (Honours) Liguistics and Information Technology",
                    "Bachelor of Arts in Contemporary Literature and Creative Industry Management (Honours)",
                    "Bachelor of Applied Liguistics and Business Administration (Honours)"
                },
                {
                    "School of Law (SOL)",
                    "Bachelor of Law with Honours",
                    "Bacholor of Philosophy, Law and Business with Honours"
                },
                {
                    "School of International Studies (SOIS)",
                    "Bachelor of International Affairs Management with Honours",
                    "Bachelor of International Business Management with Honours"
                },
                {
                    "School of Government (SOG)",
                    "Bachelor of Public Management with Honours",
                    "Bachelor of Development Management with Honours"
                },
                {
                    "School of Tourism, Hospitality and Event Management (STHEM)",
                    "Bachelor in Event Management (Honours)",
                    "Bachelor in Tourism Management (Honours)",
                    "Bachelor in Hospitality Management (Honours)"
                }
            };

            for (String[] entry : schoolsAndPrograms) {
                String schoolName = entry[0];
                School school = schoolRepository.findAll().stream()
                        .filter(s -> s.getName() != null && (s.getName().equalsIgnoreCase(schoolName)
                                || (schoolName.contains("(") && s.getName().toLowerCase().contains(schoolName.substring(0, schoolName.indexOf("(")).trim().toLowerCase()))))
                        .findFirst()
                        .orElse(null);

                if (school == null) {
                    school = new School();
                    school.setName(schoolName);
                    school = schoolRepository.save(school);
                } else if (!school.getName().equals(schoolName)) {
                    school.setName(schoolName);
                    school = schoolRepository.save(school);
                }

                for (int i = 1; i < entry.length; i++) {
                    String progName = entry[i];
                    boolean pExists = programRepository.findBySchoolId(school.getId()).stream()
                            .anyMatch(p -> p.getName() != null && p.getName().equalsIgnoreCase(progName));
                    if (!pExists) {
                        Program p = new Program();
                        p.setSchool(school);
                        p.setName(progName);
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