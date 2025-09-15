package com.be.model;

import jakarta.persistence.*;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private boolean premium = false;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate; // Si abonnement expiré

    // Constructors
    public Subscription() {}

    public Subscription(User user, boolean premium) {
        this.user = user;
        this.premium = premium;
        this.startDate = LocalDateTime.now();
    }
}
