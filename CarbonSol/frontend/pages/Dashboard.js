import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWalletBalance from '../hooks/useWalletBalance';
import { formatCurrency, formatNumber, formatCarbonAmount } from '../utils/formatters';
import { TOKENS } from '../config';

// Mock data for demonstration
const mockData = {
  carbonFootprint: 12.5,
  offsetCredits: 8.2,
  offsetPercentage: 0.656,
  recentTransactions: [
    { id: 1, type: 'buy', amount: 2.5, token: 'VCU', date: new Date(Date.now() - 86400000 * 2), price: 15.75 },
    { id: 2, type: 'retire', amount: 1.0, token: 'VCU', date: new Date(Date.now() - 86400000), project: 'Amazon Rainforest Conservation' },
    { id: 3, type: 'buy', amount: 100, token: 'CST', date: new Date(), price: 0.85 }
  ],
  carbonProjects: [
    { id: 1, name: 'Amazon Rainforest Conservation', type: 'Forestry', credits: 5.2, date: new Date(Date.now() - 86400000 * 10) },
    { id: 2, name: 'Solar Energy Farm India', type: 'Renewable Energy', credits: 3.0, date: new Date(Date.now() - 86400000 * 5) }
  ],
  priceHistory: [
    { date: new Date(Date.now() - 86400000 * 30), price: 14.2 },
    { date: new Date(Date.now() - 86400000 * 25), price: 14.5 },
    { date: new Date(Date.now() - 86400000 * 20), price: 15.1 },
    { date: new Date(Date.now() - 86400000 * 15), price: 14.8 },
    { date: new Date(Date.now() - 86400000 * 10), price: 15.3 },
    { date: new Date(Date.now() - 86400000 * 5), price: 15.6 },
    { date: new Date(), price: 15.75 }
  ]
};

const Dashboard = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();
  const { balances, loading, error, refreshBalances } = useWalletBalance();
  const [dashboardData, setDashboardData] = useState(mockData);
  
  // Redirect to home if wallet is not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
    }
  }, [connected, navigate]);
  
  // In a real app, we would fetch the dashboard data from an API
  useEffect(() => {
    // This would be an API call in a real application
    // For now, we're using mock data
    setDashboardData(mockData);
  }, []);
  
  if (!connected) {
    return null; // Will redirect to home
  }
  
  return (
    <div className="dashboard-container">
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome to your CarbonSol dashboard. Track your carbon footprint, offsets, and portfolio.
        </p>
      </section>
      
      <section className="dashboard-overview">
        <div className="overview-card">
          <div className="overview-icon">
            <FontAwesomeIcon icon="wallet" />
          </div>
          <div className="overview-content">
            <h3>Your Balance</h3>
            <div className="balance-grid">
              <div className="balance-item">
                <span className="token-name">SOL</span>
                <span className="token-amount">{loading ? 'Loading...' : formatNumber(balances.sol, 4)}</span>
              </div>
              <div className="balance-item">
                <span className="token-name">{TOKENS.CST.symbol}</span>
                <span className="token-amount">{loading ? 'Loading...' : formatNumber(balances.cst, 2)}</span>
              </div>
              <div className="balance-item">
                <span className="token-name">{TOKENS.VCU.symbol}</span>
                <span className="token-amount">{loading ? 'Loading...' : formatNumber(balances.vcu, 2)}</span>
              </div>
            </div>
            <button className="refresh-button" onClick={refreshBalances} disabled={loading}>
              <FontAwesomeIcon icon="sync" spin={loading} /> Refresh
            </button>
          </div>
        </div>
        
        <div className="overview-card">
          <div className="overview-icon">
            <FontAwesomeIcon icon="leaf" />
          </div>
          <div className="overview-content">
            <h3>Carbon Impact</h3>
            <div className="impact-stats">
              <div className="impact-stat">
                <span className="stat-label">Your Footprint</span>
                <span className="stat-value">{formatCarbonAmount(dashboardData.carbonFootprint)}</span>
              </div>
              <div className="impact-stat">
                <span className="stat-label">Offset Credits</span>
                <span className="stat-value">{formatCarbonAmount(dashboardData.offsetCredits)}</span>
              </div>
              <div className="impact-stat">
                <span className="stat-label">Offset Percentage</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${dashboardData.offsetPercentage * 100}%` }}
                  ></div>
                </div>
                <span className="stat-percentage">{Math.round(dashboardData.offsetPercentage * 100)}%</span>
              </div>
            </div>
            <button className="cta-button primary" onClick={() => navigate('/carbon-footprint')}>
              Calculate Footprint
            </button>
          </div>
        </div>
      </section>
      
      <section className="dashboard-details">
        <div className="dashboard-card transactions-card">
          <h3>Recent Transactions</h3>
          {dashboardData.recentTransactions.length > 0 ? (
            <div className="transactions-list">
              {dashboardData.recentTransactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">
                    <FontAwesomeIcon 
                      icon={transaction.type === 'buy' ? 'exchange-alt' : 'leaf'} 
                      className={transaction.type}
                    />
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-title">
                      {transaction.type === 'buy' 
                        ? `Bought ${formatNumber(transaction.amount)} ${transaction.token}` 
                        : `Retired ${formatNumber(transaction.amount)} ${transaction.token}`}
                    </div>
                    <div className="transaction-subtitle">
                      {transaction.type === 'buy' 
                        ? `Price: ${formatCurrency(transaction.price)} per token` 
                        : `Project: ${transaction.project}`}
                    </div>
                    <div className="transaction-date">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No transactions yet</p>
            </div>
          )}
          <button className="view-all-button" onClick={() => navigate('/transactions')}>
            View All Transactions
          </button>
        </div>
        
        <div className="dashboard-card projects-card">
          <h3>Your Carbon Projects</h3>
          {dashboardData.carbonProjects.length > 0 ? (
            <div className="projects-list">
              {dashboardData.carbonProjects.map(project => (
                <div key={project.id} className="project-item">
                  <div className="project-icon">
                    <FontAwesomeIcon 
                      icon={project.type === 'Forestry' ? 'tree' : 'solar-panel'} 
                    />
                  </div>
                  <div className="project-details">
                    <div className="project-title">{project.name}</div>
                    <div className="project-subtitle">
                      Type: {project.type} | Credits: {formatCarbonAmount(project.credits)}
                    </div>
                    <div className="project-date">
                      Purchased: {new Date(project.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No carbon projects yet</p>
            </div>
          )}
          <button className="view-all-button" onClick={() => navigate('/carbon-projects')}>
            Explore Carbon Projects
          </button>
        </div>
      </section>
      
      <section className="dashboard-actions">
        <div className="action-card">
          <FontAwesomeIcon icon="exchange-alt" className="action-icon" />
          <h3>Trade Carbon Credits</h3>
          <p>Buy or sell carbon credits on our decentralized exchange.</p>
          <button className="cta-button primary" onClick={() => navigate('/trade')}>
            Trade Now
          </button>
        </div>
        
        <div className="action-card">
          <FontAwesomeIcon icon="leaf" className="action-icon" />
          <h3>Offset Your Footprint</h3>
          <p>Retire carbon credits to offset your carbon footprint.</p>
          <button className="cta-button primary" onClick={() => navigate('/offset')}>
            Offset Now
          </button>
        </div>
        
        <div className="action-card">
          <FontAwesomeIcon icon="chart-line" className="action-icon" />
          <h3>View Analytics</h3>
          <p>Analyze your carbon impact and trading history.</p>
          <button className="cta-button primary" onClick={() => navigate('/analytics')}>
            View Analytics
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 