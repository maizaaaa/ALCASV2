package com.alcas.backend.service;

import com.alcas.backend.entity.SystemSetting;
import com.alcas.backend.repository.SystemSettingRepository;
import org.springframework.stereotype.Service;

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

    public SystemSetting save(SystemSetting setting) {
        return systemSettingRepository.save(setting);
    }

    public void deleteById(String settingKey) {
        systemSettingRepository.deleteById(settingKey);
    }
}