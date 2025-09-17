package com.be.controller;

import com.be.service.UserService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stripe")
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    private final UserService userService;

    public StripeWebhookController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handle(@RequestHeader("Stripe-Signature") String sigHeader,
                                         @RequestBody String payload) {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(400).body("Signature invalide");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            EventDataObjectDeserializer data = event.getDataObjectDeserializer();
            if (data.getObject().isPresent() && data.getObject().get() instanceof Session s) {
                String userId = s.getMetadata().get("userId");
                if (userId != null) {
                    userService.activatePremium(Long.parseLong(userId));
                }
            }
        }

        // (Optionnel) gérer customer.subscription.deleted -> désactiver le premium
        return ResponseEntity.ok("ok");
    }
}
