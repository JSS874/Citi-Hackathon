package com.example.backend.controller;

import com.example.backend.model.CreditCard;
import com.example.backend.repository.CreditCardRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public CreditCard addCard(@RequestBody CreditCard card) {
        return creditCardRepository.save(card);
    }
}
