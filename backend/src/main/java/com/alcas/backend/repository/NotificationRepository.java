package com.alcas.backend.repository;

import com.alcas.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(Integer userId);

    @Query("SELECT COUNT(n) > 0 FROM Notification n WHERE n.consultation.id = :consultationId AND n.type = :type")
    boolean existsByConsultationIdAndType(@Param("consultationId") String consultationId, @Param("type") String type);
}
