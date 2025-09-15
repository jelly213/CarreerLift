package com.be.service;

import com.be.model.Subscription;
import com.be.model.User;
import com.be.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public Subscription createFreeSubscription(User user) {
        Subscription sub = new Subscription(user, false);
        return subscriptionRepository.save(sub);
    }

    public Subscription activatePremium(User user, int durationDays) {
        Subscription sub = subscriptionRepository.findByUser(user).orElse(new Subscription(user, true));
        sub.setPremium(true);
        sub.setStartDate(LocalDateTime.now());
        sub.setEndDate(LocalDateTime.now().plusDays(durationDays));
        return subscriptionRepository.save(sub);
    }

    public boolean isPremium(User user) {
        return subscriptionRepository.findByUser(user)
                .map(s -> s.isPremium() && (s.getEndDate() == null || s.getEndDate().isAfter(LocalDateTime.now())))
                .orElse(false);
    }
}
