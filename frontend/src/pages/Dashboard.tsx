import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import CreditCardWidget from '../components/CreditCardWidget';

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

const Dashboard: React.FC = () => {
  const [salaryRange, setSalaryRange] = useState({ min: 20000, max: 200000 });
  const [creditScoreRange, setCreditScoreRange] = useState({ min: 300, max: 850 });
  const [incomeRange, setIncomeRange] = useState({ min: 20000, max: 200000 });
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [travelPreference, setTravelPreference] = useState(false);
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/cards');
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }
      const data = await response.json();
      setCards(data);
      setError(null);
    } catch (err) {
      setError('Failed to load credit cards. Please try again later.');
      console.error('Error fetching cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        minCreditScore: creditScoreRange.min.toString(),
        maxAnnualFee: salaryRange.max.toString(),
        type: travelPreference ? 'Travel rewards' : '',
      });

      const response = await fetch(`http://localhost:8080/api/cards/search?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to search cards');
      }
      const data = await response.json();
      setCards(data);
      setError(null);
    } catch (err) {
      setError('Failed to search credit cards. Please try again later.');
      console.error('Error searching cards:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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