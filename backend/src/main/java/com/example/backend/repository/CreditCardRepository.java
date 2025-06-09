package com.example.backend.repository;

import com.example.backend.model.CreditCard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface CreditCardRepository extends MongoRepository<CreditCard, String> {
    List<CreditCard> findByType(String type);
    List<CreditCard> findByBank(String bank);
    
    @Query("{ 'creditScore.min' : { $lte: ?0 } }")
    List<CreditCard> findByCreditScoreMinLessThanEqual(int minScore);
    
    @Query("{ 'annualFee' : { $lte: ?0 } }")
    List<CreditCard> findByAnnualFeeLessThanEqual(String maxFee);
}
