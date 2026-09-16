package com.alcas.backend.config;

import com.alcas.backend.entity.User;
import com.alcas.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

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
}