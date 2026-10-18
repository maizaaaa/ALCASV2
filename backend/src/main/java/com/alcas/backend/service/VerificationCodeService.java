package com.alcas.backend.service;

import com.alcas.backend.entity.VerificationCode;
import com.alcas.backend.repository.VerificationCodeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VerificationCodeService {

    private final VerificationCodeRepository verificationCodeRepository;

    public VerificationCodeService(
            VerificationCodeRepository verificationCodeRepository) {
        this.verificationCodeRepository = verificationCodeRepository;
    }

    public List<VerificationCode> findAll() {
        return verificationCodeRepository.findAll();
    }

    public Optional<VerificationCode> findById(Integer id) {
        return verificationCodeRepository.findById(id);
    }

    public VerificationCode save(VerificationCode verificationCode) {
        return verificationCodeRepository.save(verificationCode);
    }

    public void deleteById(Integer id) {
        verificationCodeRepository.deleteById(id);
    }

    public Optional<VerificationCode> findByUserIdAndCodeAndPurpose(
            Integer userId,
            String code,
            VerificationCode.Purpose purpose) {

        return verificationCodeRepository
                .findByUserIdAndCodeAndPurpose(userId, code, purpose);
    }

    public List<VerificationCode> findByUserIdAndPurpose(
            Integer userId,
            VerificationCode.Purpose purpose) {

        return verificationCodeRepository
                .findByUserIdAndPurpose(userId, purpose);
    }
}