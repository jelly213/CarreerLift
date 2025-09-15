package com.be.controller;

import com.be.model.GenerationType;
import com.be.model.User;
import com.be.service.GenerationService;
import com.be.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/generate")
public class GenerationController {

    private final GenerationService generationService;
    private final UserService userService;

    public GenerationController(GenerationService generationService, UserService userService) {
        this.generationService = generationService;
        this.userService = userService;
    }

    @PostMapping("/{type}")
    public ResponseEntity<?> generate(
            @PathVariable GenerationType type,
            @RequestBody Map<String, String> input,   // ✅ accepte un objet JSON
            Authentication authentication
    ) {
        User user = userService.findByEmail(authentication.getName()).orElseThrow();
        String output = generationService.generate(user, type, input);

        return ResponseEntity.ok(Map.of("output", output));
    }
}
