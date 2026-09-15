package com.alcas.backend.service;

import com.alcas.backend.entity.Broadcast;
import com.alcas.backend.repository.BroadcastRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BroadcastService {

    private final BroadcastRepository broadcastRepository;

    public BroadcastService(BroadcastRepository broadcastRepository) {
        this.broadcastRepository = broadcastRepository;
    }

    public List<Broadcast> findAll() {
        return broadcastRepository.findAll();
    }

    public Optional<Broadcast> findById(Long id) {
        return broadcastRepository.findById(id);
    }

    public Broadcast save(Broadcast broadcast) {
        return broadcastRepository.save(broadcast);
    }

    public void deleteById(Long id) {
        broadcastRepository.deleteById(id);
    }
}