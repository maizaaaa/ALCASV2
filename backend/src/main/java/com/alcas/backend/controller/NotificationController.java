package com.alcas.backend.controller;

import com.alcas.backend.dto.NotificationResponse;
import com.alcas.backend.entity.Notification;
import com.alcas.backend.entity.User;
import com.alcas.backend.repository.NotificationRepository;
import com.alcas.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationController(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<NotificationResponse> getMyNotifications(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return Collections.emptyList();
        }
        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null) {
            return Collections.emptyList();
        }

        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(n -> new NotificationResponse(
                        n.getId(),
                        n.getTitle(),
                        n.getMessage(),
                        n.getType(),
                        n.getIsRead(),
                        n.getConsultation() != null ? n.getConsultation().getId() : null,
                        n.getCreatedAt()
                ))
                .toList();
    }

    @PutMapping("/{id}/read")
    @Transactional
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification != null) {
            notification.setIsRead(true);
            notificationRepository.save(notification);
        }
        return ResponseEntity.ok(Map.of("success", true));
    }
}
