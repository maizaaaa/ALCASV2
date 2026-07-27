package com.alcas.backend.repository;

import com.alcas.backend.entity.Announcement;
import com.alcas.backend.entity.TargetRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByTargetRoleInOrderByCreatedAtDesc(Collection<TargetRole> targetRoles);
}
