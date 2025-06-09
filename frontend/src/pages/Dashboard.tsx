import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import CreditCardWidget from '../components/CreditCardWidget';

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

const mockCardData: CreditCard[] = [
    {
        "id": "1",
        "bank": "Chase",
        "name": "Chase Sapphire Preferred",
        "type": "Travel rewards",
        "annual_fee": "$95",
        "apr": "Variable (~19%-29%)",
        "rewards": "2X points on travel and dining",
        "credit_score": {
            "min": 700,
            "notes": "Good to excellent (≈700+; mid 700s preferred)"
        },
        "min_income": {
            "min": 30000,
            "notes": "Reported ~$30K+ annual income needed"
        }
    },
    {
        "id": "2",
        "bank": "American Express",
        "name": "Blue Cash Everyday Card",
        "type": "Cash back",
        "annual_fee": "$0",
        "apr": "0% intro APR for 15 months, then variable",
        "rewards": "3% cash back at U.S. supermarkets (on up to $6,000 per year), 2% at U.S. gas stations",
        "credit_score": {
            "min": 680,
            "notes": "Good to excellent credit recommended"
        },
        "min_income": {
            "min": 25000,
            "notes": "No official minimum, but ~$25K+ income is typical for approval"
        }
    }
];

const Dashboard: React.FC = () => {
  const [salaryRange, setSalaryRange] = useState({ min: 20000, max: 200000 });
  const [creditScoreRange, setCreditScoreRange] = useState({ min: 300, max: 850 });
  const [incomeRange, setIncomeRange] = useState({ min: 20000, max: 200000 });
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [travelPreference, setTravelPreference] = useState(false);
  const [cards, setCards] = useState<CreditCard[]>([]);

  useEffect(() => {
    // Initially load all cards
    setCards(mockCardData);
  }, []);

  const handleSearch = () => {
    // In a real app, you'd fetch from an API.
    // For now, we'll filter the mock data based on search criteria.
    const filteredCards = mockCardData.filter(card => {
        const meetsIncome = card.min_income.min >= incomeRange.min && card.min_income.min <= incomeRange.max;
        const meetsCreditScore = card.credit_score.min >= creditScoreRange.min && card.credit_score.min <= creditScoreRange.max;
        const meetsTravel = !travelPreference || (travelPreference && card.type.toLowerCase().includes('travel'));
        
        // Salary range is not in the card data, so we're omitting it from the filter for now.
        // You could add it if it becomes available in the data model.
        return meetsIncome && meetsCreditScore && meetsTravel;
    });

    setCards(filteredCards);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar for search criteria */}
      <div className="sidebar">
        <h2 className="sidebar-title">Search Criteria</h2>
        <div className="slider-group">
          <label>Salary Range: ${salaryRange.min} - ${salaryRange.max}</label>
          <div className="slider-range">
            <input
              type="range"
              min="20000"
              max="200000"
              step="1000"
              value={salaryRange.min}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= salaryRange.max) {
                  setSalaryRange({ ...salaryRange, min: value });
                }
              }}
            />
            <input
              type="range"
              min="20000"
              max="200000"
              step="1000"
              value={salaryRange.max}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= salaryRange.min) {
                  setSalaryRange({ ...salaryRange, max: value });
                }
              }}
            />
          </div>
        </div>

        <div className="slider-group">
          <label>Credit Score Range: {creditScoreRange.min} - {creditScoreRange.max}</label>
          <div className="slider-range">
            <input
              type="range"
              min="300"
              max="850"
              step="10"
              value={creditScoreRange.min}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= creditScoreRange.max) {
                  setCreditScoreRange({ ...creditScoreRange, min: value });
                }
              }}
            />
            <input
              type="range"
              min="300"
              max="850"
              step="10"
              value={creditScoreRange.max}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= creditScoreRange.min) {
                  setCreditScoreRange({ ...creditScoreRange, max: value });
                }
              }}
            />
          </div>
        </div>

        <div className="slider-group">
          <label>Income Range: ${incomeRange.min} - ${incomeRange.max}</label>
          <div className="slider-range">
            <input
              type="range"
              min="20000"
              max="200000"
              step="1000"
              value={incomeRange.min}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= incomeRange.max) {
                  setIncomeRange({ ...incomeRange, min: value });
                }
              }}
            />
            <input
              type="range"
              min="20000"
              max="200000"
              step="1000"
              value={incomeRange.max}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= incomeRange.min) {
                  setIncomeRange({ ...incomeRange, max: value });
                }
              }}
            />
          </div>
        </div>

        <div className="advanced-search">
          <label>
            <input
              type="checkbox"
              checked={advancedSearch}
              onChange={(e) => setAdvancedSearch(e.target.checked)}
            />
            Enable Advanced Search
          </label>
          {advancedSearch && (
            <div className="travel-preference">
              <label>
                <input
                  type="checkbox"
                  checked={travelPreference}
                  onChange={(e) => setTravelPreference(e.target.checked)}
                />
                Do you travel frequently?
              </label>
            </div>
          )}
        </div>

        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Main content area for credit card widgets */}
      <div className="main-content">
        <h2 className="main-title">Credit Cards</h2>
        <div className="card-list">
          {cards.length > 0 ? (
            cards.map(card => <CreditCardWidget key={card.id} card={card} />)
          ) : (
            <p>No cards match your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;