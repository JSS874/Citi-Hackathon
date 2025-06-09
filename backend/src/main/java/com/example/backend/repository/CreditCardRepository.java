package com.example.backend.repository;

import com.example.backend.model.CreditCard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface CreditCardRepository extends MongoRepository<CreditCard, String> {
    List<CreditCard> findByType(String type);
    List<CreditCard> findByBank(String bank);
    
    @Query("{ 'creditScore.min' : { $gte: ?0, $lte: ?1 } }")
    List<CreditCard> findByCreditScoreRange(int minScore, int maxScore);
    
    @Query("{ 'annualFee' : { $lte: ?0 } }")
    List<CreditCard> findByAnnualFeeLessThanEqual(String maxFee);
    
    @Query("{ 'apr' : { $lte: ?0 } }")
    List<CreditCard> findByAprLessThanEqual(String maxApr);
    
    @Query("{ 'minIncome.min' : { $gte: ?0, $lte: ?1 } }")
    List<CreditCard> findByIncomeRange(int minIncome, int maxIncome);
}
