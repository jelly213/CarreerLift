package com.be.controller;

import com.be.dto.LoginRequest;
import com.be.dto.RegisterRequest;
import com.be.model.User;
import com.be.repository.UserRepository;
import com.be.security.JwtUtil;
import com.be.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    // 🔹 IPs exclues, chargées depuis application.properties
    @Value("${app.excluded-ips}")
    private String excludedIpsConfig;

    private Set<String> getExcludedIps() {
        return new HashSet<>(Arrays.asList(excludedIpsConfig.split(",")));
    }

    // ✅ Limite du nombre de comptes gratuits par IP
    private static final int MAX_ACCOUNTS_PER_IP = 3;

    public AuthController(UserService userService,
                          PasswordEncoder passwordEncoder,
                          UserRepository userRepository,
                          JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpServletRequest httpRequest) {
        String clientIp = httpRequest.getRemoteAddr();

        // ✅ Vérifier si l’IP est exclue
        if (!getExcludedIps().contains(clientIp)) {
            long count = userRepository.countBySignupIp(clientIp);
            if (count >= 2) {
                return ResponseEntity.status(403).body(Map.of("message", "⚠️ Limite d'inscriptions atteinte depuis cette IP"));
            }
        }

        // 🔐 Créer et enregistrer le nouvel utilisateur
        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setPremium(false);
        newUser.setRemainingCredits(1); // ✅ 1 essai gratuit
        newUser.setSignupIp(clientIp);

        userRepository.save(newUser);

        return ResponseEntity.ok(Map.of("message", "✅ Compte créé avec succès"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(403).body(Map.of("message", "❌ Email ou mot de passe invalide"));
        }

        // ✅ Générer le JWT via JwtUtil
        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "email", user.getEmail(),
                "premium", user.isPremium(),
                "remaining", user.getRemainingCredits()
        ));
    }
}
