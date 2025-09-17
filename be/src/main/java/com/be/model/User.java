package com.be.model;

import jakarta.persistence.*;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")  // ✅ évite le mot réservé
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    private String email;
    @Setter
    @Getter
    private String password;

    @Setter
    @Getter
    private boolean premium = false; // ✅ utilisateur gratuit par défaut
    @Setter
    @Getter
    private int remainingCredits = 1; // ✅ un essai gratuit
    @Setter
    @Getter
    private String signupIp;          // ✅ IP d’inscription


    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.premium = false;
        this.remainingCredits = 1;
    }

    public Long getId() {
        return id;
    }
}
