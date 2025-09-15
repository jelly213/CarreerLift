package com.be.repository;

import com.be.model.GenerationRequest;
import com.be.model.GenerationType;
import com.be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GenerationRequestRepository extends JpaRepository<GenerationRequest, Long> {
    List<GenerationRequest> findByUser(User user);
    long countByUserAndType(User user, GenerationType type);
    long countByUser(User user);
}
