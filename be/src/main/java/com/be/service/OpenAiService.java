package com.be.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;

@Service
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    public String generateText(String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", "gpt-4o-mini",
                "messages", new Object[] {
                        Map.of("role", "user", "content", prompt)
                },
                "max_tokens", 500
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, entity, Map.class);

        if (response.getBody() != null) {
            return ((Map<String, String>) ((Map<String, Object>) ((java.util.List<?>) response.getBody().get("choices")).get(0)).get("message")).get("content");
        }
        return "Erreur lors de la génération.";
    }
}
