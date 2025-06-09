package com.example.backend.controller;

import com.example.backend.model.CreditCard;
import com.example.backend.repository.CreditCardRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "*") // Allow frontend access — you can restrict this later
public class CreditCardController {

    private final CreditCardRepository creditCardRepository;

    public CreditCardController(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    // Get all credit cards
    @GetMapping
    public List<CreditCard> getAllCards() {
        return creditCardRepository.findAll();
    }

    // Get a specific credit card by ID
    @GetMapping("/{id}")
    public ResponseEntity<CreditCard> getCardById(@PathVariable String id) {
        Optional<CreditCard> card = creditCardRepository.findById(id);
        return card.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get cards by type (e.g., "Cash back", "Travel rewards")
    @GetMapping("/type/{type}")
    public List<CreditCard> getCardsByType(@PathVariable String type) {
        return creditCardRepository.findByType(type);
    }

    // Get cards by bank
    @GetMapping("/bank/{bank}")
    public List<CreditCard> getCardsByBank(@PathVariable String bank) {
        return creditCardRepository.findByBank(bank);
    }

    // Get cards by minimum credit score
    @GetMapping("/credit-score/{minScore}")
    public List<CreditCard> getCardsByMinCreditScore(@PathVariable int minScore) {
        return creditCardRepository.findByCreditScoreMinLessThanEqual(minScore);
    }

    // Get cards by maximum annual fee
    @GetMapping("/annual-fee/{maxFee}")
    public List<CreditCard> getCardsByMaxAnnualFee(@PathVariable String maxFee) {
        return creditCardRepository.findByAnnualFeeLessThanEqual(maxFee);
    }

    // Create a new credit card
    @PostMapping
    public CreditCard createCard(@RequestBody CreditCard card) {
        return creditCardRepository.save(card);
    }

    // Update an existing credit card
    @PutMapping("/{id}")
    public ResponseEntity<CreditCard> updateCard(@PathVariable String id, @RequestBody CreditCard cardDetails) {
        Optional<CreditCard> card = creditCardRepository.findById(id);
        if (card.isPresent()) {
            CreditCard updatedCard = card.get();
            updatedCard.setName(cardDetails.getName());
            updatedCard.setBank(cardDetails.getBank());
            updatedCard.setType(cardDetails.getType());
            updatedCard.setAnnualFee(cardDetails.getAnnualFee());
            updatedCard.setApr(cardDetails.getApr());
            updatedCard.setRewards(cardDetails.getRewards());
            updatedCard.setCreditScore(cardDetails.getCreditScore());
            updatedCard.setMinIncome(cardDetails.getMinIncome());
            
            return ResponseEntity.ok(creditCardRepository.save(updatedCard));
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a credit card
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable String id) {
        Optional<CreditCard> card = creditCardRepository.findById(id);
        if (card.isPresent()) {
            creditCardRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Search cards by multiple criteria
    @GetMapping("/search")
    public List<CreditCard> searchCards(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String bank,
            @RequestParam(required = false) Integer minCreditScore,
            @RequestParam(required = false) String maxAnnualFee) {
        
        // This is a simplified search - you might want to implement a more sophisticated search
        // using a custom repository method with multiple criteria
        List<CreditCard> allCards = creditCardRepository.findAll();
        
        return allCards.stream()
                .filter(card -> type == null || card.getType().equalsIgnoreCase(type))
                .filter(card -> bank == null || card.getBank().equalsIgnoreCase(bank))
                .filter(card -> minCreditScore == null || 
                        (card.getCreditScore() != null && 
                         card.getCreditScore().getMin() != null && 
                         card.getCreditScore().getMin() <= minCreditScore))
                .filter(card -> maxAnnualFee == null || 
                        (card.getAnnualFee() != null && 
                         card.getAnnualFee().compareTo(maxAnnualFee) <= 0))
                .toList();
    }
}
