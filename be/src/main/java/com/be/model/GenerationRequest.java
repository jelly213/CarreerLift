package com.be.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "generation_requests")
public class GenerationRequest {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Ici on dit à JPA de stocker la valeur STRING de ton enum
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GenerationType type; // <- Ton enum métier (LETTER, LINKEDIN, etc.)

    @Column(columnDefinition = "TEXT")
    private String inputData;

    @Column(columnDefinition = "TEXT")
    private String outputData;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public GenerationRequest() {}

    public GenerationRequest(User user, GenerationType type, String inputData, String outputData) {
        this.user = user;
        this.type = type;
        this.inputData = inputData;
        this.outputData = outputData;
        this.createdAt = LocalDateTime.now();
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public GenerationType getType() { return type; }
    public void setType(GenerationType type) { this.type = type; }

    public String getInputData() { return inputData; }
    public void setInputData(String inputData) { this.inputData = inputData; }

    public String getOutputData() { return outputData; }
    public void setOutputData(String outputData) { this.outputData = outputData; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
