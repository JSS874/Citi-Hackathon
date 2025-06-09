package com.example.backend.repository;

import com.example.backend.model.CreditCard;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CreditCardRepository extends MongoRepository<CreditCard, String> {
    List<CreditCard> findByType(String type);
}
