package com.be.controller;

import com.be.model.User;
import com.be.service.SubscriptionService;
import com.be.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final UserService userService;

    public SubscriptionController(SubscriptionService subscriptionService, UserService userService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
    }

    @GetMapping("/status")
    public ResponseEntity<?> getStatus(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email).orElseThrow();

        boolean isPremium = subscriptionService.isPremium(user);
        int remaining = user.getRemainingCredits();

        return ResponseEntity.ok(Map.of(
                "email", user.getEmail(),
                "premium", isPremium,
                "remaining", remaining
        ));
    }
}
