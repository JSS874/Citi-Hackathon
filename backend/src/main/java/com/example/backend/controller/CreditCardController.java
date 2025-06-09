package com.example.backend.controller;

import com.example.backend.model.CreditCard;
import com.example.backend.repository.CreditCardRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "*")
public class CreditCardController {

    private final CreditCardRepository creditCardRepository;

    public CreditCardController(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    @GetMapping
    public List<CreditCard> getAllCards() {
        return creditCardRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditCard> getCardById(@PathVariable String id) {
        Optional<CreditCard> card = creditCardRepository.findById(id);
        return card.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    public List<CreditCard> getCardsByType(@PathVariable String type) {
        return creditCardRepository.findByType(type);
    }

    @GetMapping("/bank/{bank}")
    public List<CreditCard> getCardsByBank(@PathVariable String bank) {
        return creditCardRepository.findByBank(bank);
    }

    @GetMapping("/credit-score/range")
    public List<CreditCard> getCardsByCreditScoreRange(
            @RequestParam int minScore,
            @RequestParam int maxScore) {
        return creditCardRepository.findByCreditScoreRange(minScore, maxScore);
    }

    @GetMapping("/annual-fee/{maxFee}")
    public List<CreditCard> getCardsByMaxAnnualFee(@PathVariable String maxFee) {
        return creditCardRepository.findByAnnualFeeLessThanEqual(maxFee);
    }

    @PostMapping
    public CreditCard createCard(@RequestBody CreditCard card) {
        return creditCardRepository.save(card);
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable String id) {
        Optional<CreditCard> card = creditCardRepository.findById(id);
        if (card.isPresent()) {
            creditCardRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public List<CreditCard> searchCards(
            @RequestParam(required = false) String bank,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String maxAnnualFee,
            @RequestParam(required = false) String maxApr,
            @RequestParam(required = false) Integer minCreditScore,
            @RequestParam(required = false) Integer minIncome,
            @RequestParam(required = false) Integer maxIncome) {
        
        List<CreditCard> filteredCards;
        
        if (minCreditScore != null) {
            filteredCards = creditCardRepository.findByCreditScoreRange(minCreditScore, 850);
        } else {
            filteredCards = creditCardRepository.findAll();
        }
        
        if (bank != null && !bank.isEmpty()) {
            filteredCards = filteredCards.stream()
                    .filter(card -> card.getBank().equalsIgnoreCase(bank))
                    .toList();
        }
        
        if (type != null && !type.isEmpty()) {
            filteredCards = filteredCards.stream()
                    .filter(card -> card.getType().equalsIgnoreCase(type))
                    .toList();
        }
        
        if (maxAnnualFee != null && !maxAnnualFee.isEmpty()) {
            String normalizedMaxFee = normalizeFeeString(maxAnnualFee);
            try {
                int maxFeeValue = Integer.parseInt(normalizedMaxFee);
                filteredCards = filteredCards.stream()
                        .filter(card -> {
                            String cardFee = normalizeFeeString(card.getAnnualFee());
                            if (cardFee == null) return false;
                            try {
                                int cardFeeValue = Integer.parseInt(cardFee);
                                return cardFeeValue <= maxFeeValue;
                            } catch (NumberFormatException e) {
                                return false;
                            }
                        })
                        .toList();
            } catch (NumberFormatException e) {
                // If maxAnnualFee is not a valid number, skip this filter
            }
        }
        
        if (maxApr != null && !maxApr.isEmpty()) {
            filteredCards = filteredCards.stream()
                    .filter(card -> card.getApr() != null && 
                            card.getApr().compareTo(maxApr) <= 0)
                    .toList();
        }
        
        if (minIncome != null) {
            filteredCards = filteredCards.stream()
                    .filter(card -> {
                        if (card.getMinIncome() == null || card.getMinIncome().getMin() == null) {
                            return false;
                        }
                        return card.getMinIncome().getMin() >= minIncome;
                    })
                    .toList();
        }
        
        return filteredCards;
    }

    private String normalizeFeeString(String fee) {
        if (fee == null) return null;
        // Remove $ and commas, then trim
        return fee.replace("$", "").replace(",", "").trim();
    }
}
