package com.alcas.backend.dto;

import java.time.LocalDateTime;

public record NotificationResponse(
        Long id,
        String title,
        String message,
        String type,
        Boolean isRead,
        String consultationId,
        LocalDateTime createdAt
) {}
