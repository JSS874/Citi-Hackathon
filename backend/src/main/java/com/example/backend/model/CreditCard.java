package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "creditcards")
public class CreditCard {

    @Id
    private String id;

    private String name;
    private String bank;
    private String type;
    
    @JsonProperty("annual_fee")
    private String annualFee;
    
    private String apr;
    private String rewards;
    
    @JsonProperty("credit_score")
    private CreditScore creditScore;
    
    @JsonProperty("min_income")
    private MinIncome minIncome;

    public CreditCard() {
    }

    public CreditCard(String name, String bank, String type, String annualFee, String apr,
            String rewards, CreditScore creditScore, MinIncome minIncome) {
        this.name = name;
        this.bank = bank;
        this.type = type;
        this.annualFee = annualFee;
        this.apr = apr;
        this.rewards = rewards;
        this.creditScore = creditScore;
        this.minIncome = minIncome;
    }

    // Nested classes for credit score and minimum income
    public static class CreditScore {
        private Integer min;
        private String notes;

        public CreditScore() {
        }

        public CreditScore(Integer min, String notes) {
            this.min = min;
            this.notes = notes;
        }

        public Integer getMin() {
            return min;
        }

        public void setMin(Integer min) {
            this.min = min;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }
    }

    public static class MinIncome {
        private Integer min;
        private String notes;

        public MinIncome() {
        }

        public MinIncome(Integer min, String notes) {
            this.min = min;
            this.notes = notes;
        }

        public Integer getMin() {
            return min;
        }

        public void setMin(Integer min) {
            this.min = min;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAnnualFee() {
        return annualFee;
    }

    public void setAnnualFee(String annualFee) {
        this.annualFee = annualFee;
    }

    public String getApr() {
        return apr;
    }

    public void setApr(String apr) {
        this.apr = apr;
    }

    public String getRewards() {
        return rewards;
    }

    public void setRewards(String rewards) {
        this.rewards = rewards;
    }

    public CreditScore getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(CreditScore creditScore) {
        this.creditScore = creditScore;
    }

    public MinIncome getMinIncome() {
        return minIncome;
    }

    public void setMinIncome(MinIncome minIncome) {
        this.minIncome = minIncome;
    }
}
