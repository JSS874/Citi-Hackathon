package com.example.backend.config;

import com.example.backend.model.CreditCard;
import com.example.backend.repository.CreditCardRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;

@Component
public class CreditCardDataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(CreditCardDataInitializer.class);

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Starting credit card data initialization...");
        
        // Only initialize if the database is empty
        long count = creditCardRepository.count();
        logger.info("Current number of credit cards in database: {}", count);
        
        if (count == 0) {
            try {
                logger.info("Database is empty, loading credit card data...");
                ObjectMapper mapper = new ObjectMapper();
                ClassPathResource resource = new ClassPathResource("creditCardData.json");
                logger.info("Reading credit card data from: {}", resource.getURL());
                
                List<CreditCard> creditCards = mapper.readValue(
                    resource.getInputStream(),
                    new TypeReference<List<CreditCard>>() {}
                );
                
                logger.info("Successfully parsed {} credit cards from JSON", creditCards.size());
                
                creditCardRepository.saveAll(creditCards);
                logger.info("Successfully saved {} credit cards to the database", creditCards.size());
            } catch (IOException e) {
                logger.error("Error loading credit card data: {}", e.getMessage(), e);
                throw e;
            }
        } else {
            logger.info("Database already contains credit cards, skipping initialization");
        }
    }
} 