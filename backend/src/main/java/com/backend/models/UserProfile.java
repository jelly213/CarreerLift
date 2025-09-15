package com.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobTitle;
    private String skills;
    private String goals;

    @Lob
    private String resumeText; // version collée du CV

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
