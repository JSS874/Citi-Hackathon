import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [minAnnualFee, setMinAnnualFee] = useState<string>('');
  const [minCreditScore, setMinCreditScore] = useState<string>('');
  const [minIncome, setMinIncome] = useState<string>('');
  const [maxApr, setMaxApr] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableBanks, setAvailableBanks] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

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
      
      // Extract unique banks and types with proper type casting
      const banks = [...new Set(data.map((card: CreditCard) => card.bank))] as string[];
      const types = [...new Set(data.map((card: CreditCard) => card.type))] as string[];
      setAvailableBanks(banks);
      setAvailableTypes(types);
      
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
      const queryParams = new URLSearchParams();

      // Add bank filter
      if (selectedBank) {
        queryParams.append('bank', selectedBank);
      }

      // Add type filter
      if (selectedType) {
        queryParams.append('type', selectedType);
      }

      // Add minimum credit score
      if (minCreditScore && !isNaN(Number(minCreditScore))) {
        queryParams.append('minCreditScore', minCreditScore);
      }

      // Add annual fee filter
      if (minAnnualFee && !isNaN(Number(minAnnualFee))) {
        const formattedFee = `$${Number(minAnnualFee).toLocaleString()}`;
        queryParams.append('maxAnnualFee', formattedFee);
      }

      // Add APR filter
      if (maxApr && !isNaN(Number(maxApr))) {
        queryParams.append('maxApr', `${maxApr}%`);
      }

      // Add minimum income
      if (minIncome && !isNaN(Number(minIncome))) {
        queryParams.append('minIncome', minIncome);
      }

      console.log('Search parameters:', Object.fromEntries(queryParams.entries()));

      const response = await fetch(`http://localhost:8080/api/cards/search?${queryParams}`);
      if (!response.ok) {
        alert('Failed to search cards');
        return;
      }
      const data = await response.json();
      console.log('Search results:', data);
      setCards(data);
      setError(null);
    } catch (err) {
      setError('Failed to search credit cards. Please try again later.');
      console.error('Error searching cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = () => {
    handleSearch();
  }

  // useEffect(() => {
  //   handleSearch();
  // }, [selectedBank, selectedType, minCreditScore, minAnnualFee, maxApr, minIncome]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Settings Button */}
      <button 
        className="settings-button"
        onClick={() => navigate('/settings')}
        aria-label="Go to settings"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        Settings
      </button>

      {/* Sidebar for search criteria */}
      <div className="sidebar">
        <h2 className="sidebar-title">Search Criteria</h2>
        
        {/* Bank Selection */}
        <div className="filter-group">
          <label>Bank</label>
          <select 
            value={selectedBank} 
            onChange={(e) => setSelectedBank(e.target.value)}
            className="filter-select"
          >
            <option value="">All Banks</option>
            {availableBanks.map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>

        {/* Card Type Selection */}
        <div className="filter-group">
          <label>Card Type</label>
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            {availableTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Credit Score Input */}
        <div className="filter-group">
          <label>Minimum Credit Score Required</label>
          <div className="credit-score-inputs">
            <div className="input-group">
              <input
                type="number"
                min="300"
                max="850"
                value={minCreditScore}
                onChange={(e) => setMinCreditScore(e.target.value)}
                placeholder="Enter minimum score (300-850)"
                className="credit-score-input"
              />
            </div>
          </div>
        </div>

        {/* Annual Fee Input */}
        <div className="filter-group">
          <label>Maximum Annual Fee</label>
          <div className="credit-score-inputs">
            <div className="input-group">
              <input
                type="number"
                min="0"
                value={minAnnualFee}
                onChange={(e) => setMinAnnualFee(e.target.value)}
                placeholder="Enter maximum annual fee"
                className="credit-score-input"
              />
            </div>
          </div>
        </div>

        {/* APR Input */}
        {false && <div className="filter-group">
          <label>Maximum APR (%)</label>
          <div className="credit-score-inputs">
            <div className="input-group">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={maxApr}
                onChange={(e) => setMaxApr(e.target.value)}
                placeholder="Enter maximum APR"
                className="credit-score-input"
              />
            </div>
          </div>
        </div>}

        {/* Minimum Income Input */}
        <div className="filter-group">
          <label>Minimum Annual Income</label>
          <div className="credit-score-inputs">
            <div className="input-group">
              <input
                type="number"
                min="0"
                value={minIncome}
                onChange={(e) => setMinIncome(e.target.value)}
                placeholder="Enter minimum annual income"
                className="credit-score-input"
              />
            </div>
          </div>
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