package com.alcas.backend.repository;

import com.alcas.backend.entity.Broadcast;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {
}