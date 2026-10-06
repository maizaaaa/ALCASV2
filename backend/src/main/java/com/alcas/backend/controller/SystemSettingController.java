package com.alcas.backend.controller;

import com.alcas.backend.entity.SystemSetting;
import com.alcas.backend.service.SystemSettingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/system-settings")
@CrossOrigin(origins = "http://localhost:4200")
public class SystemSettingController {

    private final SystemSettingService systemSettingService;

    public SystemSettingController(SystemSettingService systemSettingService) {
        this.systemSettingService = systemSettingService;
    }

    // Get all system settings
    @GetMapping
    public ResponseEntity<List<SystemSetting>> getAllSettings() {
        return ResponseEntity.ok(systemSettingService.findAll());
    }

    // Get one setting by key
    @GetMapping("/{settingKey}")
    public ResponseEntity<SystemSetting> getSetting(
            @PathVariable String settingKey) {

        return systemSettingService.findById(settingKey)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create or update a setting
    @PutMapping("/{settingKey}")
    public ResponseEntity<SystemSetting> updateSetting(
            @PathVariable String settingKey,
            @RequestBody SystemSetting setting) {

        setting.setSettingKey(settingKey);

        SystemSetting savedSetting =
                systemSettingService.save(setting);

        return ResponseEntity.ok(savedSetting);
    }
}