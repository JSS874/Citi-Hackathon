import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [salaryRange, setSalaryRange] = useState({ min: 20000, max: 200000 });
  const [creditScoreRange, setCreditScoreRange] = useState({ min: 300, max: 850 });
  const [incomeRange, setIncomeRange] = useState({ min: 20000, max: 200000 });
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [travelPreference, setTravelPreference] = useState(false);

  const handleSearch = () => {
    console.log('Search criteria:', { salaryRange, creditScoreRange, incomeRange, advancedSearch, travelPreference });
    // Add logic to fetch and display results based on criteria
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
        <p>Credit card widgets will be displayed here.</p>
        {/* Placeholder for teammate's work */}
      </div>
    </div>
  );
};

export default Dashboard;