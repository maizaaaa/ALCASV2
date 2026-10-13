package com.alcas.backend.service;

import com.alcas.backend.entity.SystemSetting;
import com.alcas.backend.repository.SystemSettingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SystemSettingService {

    private final SystemSettingRepository systemSettingRepository;

    public SystemSettingService(SystemSettingRepository systemSettingRepository) {
        this.systemSettingRepository = systemSettingRepository;
    }

    public List<SystemSetting> findAll() {
        return systemSettingRepository.findAll();
    }

    public Optional<SystemSetting> findById(String settingKey) {
        return systemSettingRepository.findById(settingKey);
    }

    public String getSettingValue(String key, String defaultValue) {
        return findById(key)
                .map(SystemSetting::getSettingValue)
                .filter(v -> !v.trim().isEmpty())
                .orElse(defaultValue);
    }

    public SystemSetting save(SystemSetting setting) {
        setting.setUpdatedAt(LocalDateTime.now());
        return systemSettingRepository.save(setting);
    }

    public List<SystemSetting> saveAll(List<SystemSetting> settings) {
        LocalDateTime now = LocalDateTime.now();
        for (SystemSetting setting : settings) {
            setting.setUpdatedAt(now);
        }
        return systemSettingRepository.saveAll(settings);
    }

    public void deleteById(String settingKey) {
        systemSettingRepository.deleteById(settingKey);
    }
}