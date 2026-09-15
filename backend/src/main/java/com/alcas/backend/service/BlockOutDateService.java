package com.alcas.backend.service;

import com.alcas.backend.entity.BlockOutDate;
import com.alcas.backend.repository.BlockOutDateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlockOutDateService {

    private final BlockOutDateRepository blockOutDateRepository;

    public BlockOutDateService(BlockOutDateRepository blockOutDateRepository) {
        this.blockOutDateRepository = blockOutDateRepository;
    }

    public List<BlockOutDate> findAll() {
        return blockOutDateRepository.findAll();
    }

    public Optional<BlockOutDate> findById(Integer id) {
        return blockOutDateRepository.findById(id);
    }

    public BlockOutDate save(BlockOutDate blockOutDate) {
        return blockOutDateRepository.save(blockOutDate);
    }

    public void deleteById(Integer id) {
        blockOutDateRepository.deleteById(id);
    }
}