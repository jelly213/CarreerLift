package com.be.controller;

import com.be.model.User;
import com.be.service.PaymentService;
import com.be.service.UserService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;

    @Value("${STRIPE_PRICE_MONTHLY}")
    private String monthlyPriceId;

    public PaymentController(PaymentService paymentService, UserService userService) {
        this.paymentService = paymentService;
        this.userService = userService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> createCheckoutSession(@RequestBody(required = false) Map<String, String> body,
                                                   Authentication auth) throws StripeException {
        String email = auth.getName(); // sujet du JWT
        System.out.println("Email de l'utilisateur authentifié: " + email);
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        // si tu ajoutes d’autres plans, récupère body.get("plan") et choisis le priceId en conséquence
        String priceId = monthlyPriceId;

        Session session = paymentService.createCheckoutSession(user, priceId);
        // tu peux renvoyer l’URL directement, plus simple côté FE
        return ResponseEntity.ok(Map.of("url", session.getUrl()));
    }
}
