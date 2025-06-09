import React from 'react';
import './CreditCardWidget.css';

interface CreditCard {
  id: string;
  bank: string;
  name: string;
  type: string;
  annualFee: string;
  apr: string;
  rewards: string;
  creditScore: {
    min: number;
    notes: string;
  };
  minIncome: {
    min: number;
    notes: string;
  };
}

interface CreditCardWidgetProps {
  card: CreditCard;
}

const CreditCardWidget: React.FC<CreditCardWidgetProps> = ({ card }) => {
  return (
    <div className="credit-card-widget">
      <h3>{card.name}</h3>
      <p><strong>Bank:</strong> {card.bank}</p>
      <p><strong>Type:</strong> {card.type}</p>
      <p><strong>Annual Fee:</strong> {card.annualFee}</p>
      <p><strong>APR:</strong> {card.apr}</p>
      <p><strong>Rewards:</strong> {card.rewards}</p>
      <div className="details-section">
        <h4>Credit Score Requirement</h4>
        <p>Minimum: {card.creditScore.min}</p>
        <p><em>{card.creditScore.notes}</em></p>
      </div>
      <div className="details-section">
        <h4>Minimum Income</h4>
        <p>Recommended: ${card.minIncome?.min?.toLocaleString() || 'N/A'}</p>
        <p><em>{card.minIncome?.notes || 'N/A'}</em></p>
      </div>
    </div>
  );
};

export default CreditCardWidget; 