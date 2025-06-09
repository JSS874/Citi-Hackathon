package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "creditcards")
public class CreditCard {

    @Id
    private String id;

    private String name;
    private String bank;
    private String rewardType;
    private int minIncome;

    public CreditCard() {}

    public CreditCard(String name, String bank, String rewardType, int minIncome) {
        this.name = name;
        this.bank = bank;
        this.rewardType = rewardType;
        this.minIncome = minIncome;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBank() {
        return bank;
    }

    public String getRewardType() {
        return rewardType;
    }

    public int getMinIncome() {
        return minIncome;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public void setRewardType(String rewardType) {
        this.rewardType = rewardType;
    }

    public void setMinIncome(int minIncome) {
        this.minIncome = minIncome;
    }
}
