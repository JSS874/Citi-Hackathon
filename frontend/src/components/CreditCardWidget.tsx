import React from 'react';
import './CreditCardWidget.css';

interface CreditCard {
  id: string;
  bank: string;
  name: string;
  type: string;
  annual_fee: string;
  apr: string;
  rewards: string;
  credit_score: {
    min: number;
    notes: string;
  };
  min_income: {
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
      <p><strong>Annual Fee:</strong> {card.annual_fee}</p>
      <p><strong>APR:</strong> {card.apr}</p>
      <p><strong>Rewards:</strong> {card.rewards}</p>
      <div className="details-section">
        <h4>Credit Score Requirement</h4>
        <p>Minimum: {card.credit_score.min}</p>
        <p><em>{card.credit_score.notes}</em></p>
      </div>
      <div className="details-section">
        <h4>Minimum Income</h4>
        <p>Recommended: ${card.min_income.min.toLocaleString()}</p>
        <p><em>{card.min_income.notes}</em></p>
      </div>
    </div>
  );
};

export default CreditCardWidget; 