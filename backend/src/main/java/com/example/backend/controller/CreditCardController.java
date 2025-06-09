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

    @GetMapping("/reward-type/{rewardType}")
    public List<CreditCard> getCardsByRewardType(@PathVariable String rewardType) {
        return creditCardRepository.findByRewardType(rewardType);
    }

    @PostMapping
    public ResponseEntity<CreditCard> addCard(@RequestBody CreditCard card) {
        try {
            CreditCard savedCard = creditCardRepository.save(card);
            return ResponseEntity.ok(savedCard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CreditCard> updateCard(@PathVariable String id, @RequestBody CreditCard card) {
        if (!creditCardRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        card.setId(id);
        try {
            CreditCard updatedCard = creditCardRepository.save(card);
            return ResponseEntity.ok(updatedCard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable String id) {
        if (!creditCardRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        creditCardRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
