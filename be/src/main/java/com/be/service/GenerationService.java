package com.be.service;

import com.be.model.GenerationType;
import com.be.model.User;
import com.be.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class GenerationService {

    private final OpenAiService openAiService;
    private final UserRepository userRepository;
    private final SubscriptionService subscriptionService;

    public GenerationService(OpenAiService openAiService,
                             UserRepository userRepository,
                             SubscriptionService subscriptionService) {
        this.openAiService = openAiService;
        this.userRepository = userRepository;
        this.subscriptionService = subscriptionService;
    }

    public String generate(User user, GenerationType type, Map<String, String> inputData) {
        // ✅ Vérification Premium / crédits gratuits
        if (!subscriptionService.isPremium(user)) {
            if (user.getRemainingCredits() <= 0) {
                throw new RuntimeException("❌ Vous avez utilisé votre essai gratuit. Passez en Premium 🚀");
            }
            user.setRemainingCredits(user.getRemainingCredits() - 1);
            userRepository.save(user);
        }

        String prompt = buildPrompt(type, inputData);
        return openAiService.generateText(prompt);
    }

    private String buildPrompt(GenerationType type, Map<String, String> inputData) {
        return switch (type) {
            case LETTER -> """
                Rédige une lettre de motivation professionnelle et convaincante en français.
                L'entreprise : %s
                Poste visé : %s
                Points forts du candidat : %s
                Mets en avant la motivation, les compétences, et un ton positif.
                """.formatted(
                    inputData.getOrDefault("company", "N/A"),
                    inputData.getOrDefault("jobTitle", "N/A"),
                    inputData.getOrDefault("strengths", "N/A")
            );

            case LINKEDIN -> """
                Rédige un message LinkedIn court et professionnel pour contacter un recruteur.
                Nom du recruteur : %s
                Poste ou sujet : %s
                Message complémentaire : %s
                Le ton doit être poli, engageant et concis.
                """.formatted(
                    inputData.getOrDefault("recruiter", "N/A"),
                    inputData.getOrDefault("subject", "N/A"),
                    inputData.getOrDefault("extra", "N/A")
            );

            case CV_ADVICE -> """
                Analyse ce CV et donne 3 conseils pratiques pour l'améliorer.
                CV fourni :
                %s
                """.formatted(inputData.getOrDefault("content", "Aucun CV fourni"));

            case JOB_ADVICE -> """
                Donne des conseils pratiques pour aider ce profil à trouver un emploi ou un stage.
                Profil : %s
                Type recherché : %s
                Difficultés rencontrées : %s
                Sois concret, propose des stratégies et astuces adaptées.
                """.formatted(
                    inputData.getOrDefault("profile", "N/A"),
                    inputData.getOrDefault("targetJob", "N/A"),
                    inputData.getOrDefault("difficulties", "N/A")
            );
        };
    }
}
