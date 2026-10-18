package com.alcas.backend.service;

import com.alcas.backend.entity.VerificationCode;
import com.alcas.backend.dto.LoginResponse;
import com.alcas.backend.dto.RegisterRequest;
import com.alcas.backend.entity.Program;
import com.alcas.backend.entity.School;
import com.alcas.backend.entity.StudentProfile;
import com.alcas.backend.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtService jwtService;
    private final StudentProfileService studentProfileService;
    private final SchoolService schoolService;
    private final ProgramService programService;
    private final VerificationCodeService verificationCodeService;
    private final EmailService emailService;

    @Value("${app.frontend.url:http://localhost:4200}")
    private String frontendUrl;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            UserService userService,
            JwtService jwtService,
            StudentProfileService studentProfileService,
            SchoolService schoolService,
            ProgramService programService,
            VerificationCodeService verificationCodeService,
            EmailService emailService) {

        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.jwtService = jwtService;
        this.studentProfileService = studentProfileService;
        this.schoolService = schoolService;
        this.programService = programService;
        this.verificationCodeService = verificationCodeService;
        this.emailService = emailService;
    }

    public LoginResponse login(String email, String password) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                password
                        )
                );

        User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setLastLogin(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userService.save(user);

        System.out.println(
                "LOGIN USER = " + user.getEmail()
                        + " | ID = " + user.getId()
                        + " | ROLE = " + user.getRole()
        );

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new LoginResponse(
                token,
                user.getRole().name(),
                "Login successful"
        );
    }

    public void registerStudent(RegisterRequest request) {

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (userService.existsByEmail(request.getEmail().trim())) {
            throw new RuntimeException("Email already registered");
        }

        if (request.getMatricNumber() != null && !request.getMatricNumber().isBlank()
                && studentProfileService.existsByMatricNumber(request.getMatricNumber().trim())) {
            throw new RuntimeException("Matric number already registered");
        }

        if (request.getSchoolId() == null) {
            throw new RuntimeException("School is required");
        }

        if (request.getProgramId() == null) {
            throw new RuntimeException("Program is required");
        }

        School school = schoolService.findById(request.getSchoolId())
                .orElseThrow(() ->
                        new RuntimeException("School not found"));

        Program program = programService.findById(request.getProgramId())
                .orElseThrow(() ->
                        new RuntimeException("Program not found"));

        User user = new User();

        user.setEmail(request.getEmail().trim());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setFullName(request.getFullName() != null ? request.getFullName().trim() : "Student");
        user.setRole(User.Role.STUDENT);
        user.setStatus(User.Status.ACTIVE);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        User savedUser = userService.save(user);

        StudentProfile studentProfile = new StudentProfile();

        studentProfile.setUser(savedUser);
        studentProfile.setMatricNumber(request.getMatricNumber() != null ? request.getMatricNumber().trim() : null);
        studentProfile.setPhone(request.getPhone() != null ? request.getPhone().trim() : "");
        studentProfile.setSchool(school);
        studentProfile.setProgram(program);
        studentProfile.setCreatedAt(LocalDateTime.now());
        studentProfile.setUpdatedAt(LocalDateTime.now());

        studentProfileService.save(studentProfile);

        String code = String.format(
                "%06d",
                new java.util.Random().nextInt(1_000_000)
        );

        VerificationCode verificationCode = new VerificationCode();

        verificationCode.setUser(savedUser);
        verificationCode.setCode(code);
        verificationCode.setPurpose(
                VerificationCode.Purpose.ACCOUNT_ACTIVATION
        );
        verificationCode.setExpiresAt(
                LocalDateTime.now().plusMinutes(10)
        );
        verificationCode.setIsUsed(false);
        verificationCode.setCreatedAt(LocalDateTime.now());

        verificationCodeService.save(verificationCode);

        // Send university account activation email
        emailService.sendAccountActivationEmail(savedUser.getEmail(), savedUser.getFullName(), code);
    }

    public String verifyAccount(String email, String code) {

        User user = userService.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (user.getStatus() == User.Status.ACTIVE) {
            throw new RuntimeException("Account is already verified");
        }

        VerificationCode verificationCode =
                verificationCodeService
                        .findByUserIdAndCodeAndPurpose(
                                user.getId(),
                                code,
                                VerificationCode.Purpose.ACCOUNT_ACTIVATION
                        )
                        .orElseThrow(() ->
                                new RuntimeException("Invalid verification code"));

        if (verificationCode.getIsUsed()) {
            throw new RuntimeException("Verification code has already been used");
        }

        if (verificationCode.getExpiresAt()
                .isBefore(LocalDateTime.now())) {

            throw new RuntimeException("Verification code has expired");
        }

        user.setStatus(User.Status.ACTIVE);
        user.setUpdatedAt(LocalDateTime.now());

        userService.save(user);

        verificationCode.setIsUsed(true);

        verificationCodeService.save(verificationCode);

        return "Account verified successfully";
    }

    public String requestPasswordReset(String rawEmail) {

        if (rawEmail == null || rawEmail.trim().isBlank()) {
            throw new RuntimeException("University email is required");
        }

        String email = rawEmail.trim().toLowerCase();

        User user = userService.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("No account found registered with university email: " + email));

        // Invalidate any previous unused reset codes for this user
        List<VerificationCode> existingCodes = verificationCodeService.findByUserIdAndPurpose(
                user.getId(),
                VerificationCode.Purpose.PASSWORD_RESET
        );
        for (VerificationCode oldCode : existingCodes) {
            if (!Boolean.TRUE.equals(oldCode.getIsUsed())) {
                oldCode.setIsUsed(true);
                verificationCodeService.save(oldCode);
            }
        }

        String code = String.format(
                "%06d",
                new java.util.Random().nextInt(1_000_000)
        );

        VerificationCode verificationCode = new VerificationCode();

        verificationCode.setUser(user);
        verificationCode.setCode(code);
        verificationCode.setPurpose(
                VerificationCode.Purpose.PASSWORD_RESET
        );
        verificationCode.setExpiresAt(
                LocalDateTime.now().plusMinutes(10)
        );
        verificationCode.setIsUsed(false);
        verificationCode.setCreatedAt(LocalDateTime.now());

        verificationCodeService.save(verificationCode);

        // Build reset link for frontend
        String encodedEmail = URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8);
        String resetLink = frontendUrl + "/reset-password?email=" + encodedEmail + "&code=" + code;

        // Send official UUM ALCAS password reset email
        emailService.sendPasswordResetEmail(user.getEmail(), user.getFullName(), resetLink, code);

        return "Password reset link has been dispatched to " + user.getEmail();
    }

    public String resetPassword(
            String rawEmail,
            String code,
            String newPassword) {

        if (rawEmail == null || rawEmail.trim().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (code == null || code.trim().isBlank()) {
            throw new RuntimeException("Verification code is required");
        }

        if (newPassword == null || newPassword.length() < 6) {
            throw new RuntimeException("New password must be at least 6 characters long");
        }

        String email = rawEmail.trim().toLowerCase();

        User user = userService.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found with email: " + email));

        VerificationCode verificationCode =
                verificationCodeService
                        .findByUserIdAndCodeAndPurpose(
                                user.getId(),
                                code.trim(),
                                VerificationCode.Purpose.PASSWORD_RESET
                        )
                        .orElseThrow(() ->
                                new RuntimeException("Invalid password reset code or link"));

        if (Boolean.TRUE.equals(verificationCode.getIsUsed())) {
            throw new RuntimeException(
                    "This password reset link/code has already been used");
        }

        if (verificationCode.getExpiresAt()
                .isBefore(LocalDateTime.now())) {

            throw new RuntimeException(
                    "Password reset link has expired. Please request a new one.");
        }

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        user.setUpdatedAt(LocalDateTime.now());

        userService.save(user);

        verificationCode.setIsUsed(true);

        verificationCodeService.save(verificationCode);

        return "Password reset successfully. You may now log in with your new password.";
    }

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}