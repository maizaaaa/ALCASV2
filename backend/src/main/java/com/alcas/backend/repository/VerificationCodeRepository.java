package com.alcas.backend.repository;

import com.alcas.backend.entity.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Integer> {

    Optional<VerificationCode> findByUserIdAndCodeAndPurpose(
            Integer userId,
            String code,
            VerificationCode.Purpose purpose
    );

    java.util.List<VerificationCode> findByUserIdAndPurpose(
            Integer userId,
            VerificationCode.Purpose purpose
    );
}