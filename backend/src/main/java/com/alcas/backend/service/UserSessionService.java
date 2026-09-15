package com.alcas.backend.service;

import com.alcas.backend.entity.UserSession;
import com.alcas.backend.repository.UserSessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserSessionService {

    private final UserSessionRepository userSessionRepository;

    public UserSessionService(UserSessionRepository userSessionRepository) {
        this.userSessionRepository = userSessionRepository;
    }

    public List<UserSession> findAll() {
        return userSessionRepository.findAll();
    }

    public Optional<UserSession> findById(Integer id) {
        return userSessionRepository.findById(id);
    }

    public UserSession save(UserSession userSession) {
        return userSessionRepository.save(userSession);
    }

    public void deleteById(Integer id) {
        userSessionRepository.deleteById(id);
    }
}