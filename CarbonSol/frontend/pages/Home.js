import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Home = () => {
  const { connected } = useWallet();
  
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>CarbonSol AI DEX</h1>
          <p className="hero-subtitle">
            A decentralized exchange platform that combines carbon credit trading with cryptocurrency on the Solana blockchain, powered by AI.
          </p>
          
          {!connected ? (
            <div className="hero-cta">
              <WalletMultiButton className="cta-button" />
              <p className="connect-text">Connect your wallet to get started</p>
            </div>
          ) : (
            <div className="hero-cta">
              <Link to="/dashboard" className="cta-button primary">
                Go to Dashboard
              </Link>
              <Link to="/trade" className="cta-button secondary">
                Start Trading
              </Link>
            </div>
          )}
        </div>
        
        <div className="hero-image">
          <img src="/assets/hero-image.svg" alt="CarbonSol Platform" />
        </div>
      </section>
      
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <h3>Carbon Credit Trading</h3>
            <p>Trade verified carbon credits on a transparent and efficient platform.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-brain"></i>
            </div>
            <h3>AI-Powered Analysis</h3>
            <p>Leverage AI for price predictions and carbon project verification.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-calculator"></i>
            </div>
            <h3>Carbon Footprint Calculator</h3>
            <p>Calculate and offset your carbon footprint with ease.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-bolt"></i>
            </div>
            <h3>Fast & Low-Cost</h3>
            <p>Built on Solana for high-speed, low-fee transactions.</p>
          </div>
        </div>
      </section>
      
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Connect Wallet</h3>
            <p>Connect your Solana wallet to access the platform.</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Calculate Footprint</h3>
            <p>Use our AI tool to calculate your carbon footprint.</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Purchase Credits</h3>
            <p>Buy verified carbon credits to offset your emissions.</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Impact</h3>
            <p>Monitor your positive environmental impact over time.</p>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make a Difference?</h2>
          <p>Join CarbonSol today and be part of the solution to climate change.</p>
          
          {!connected ? (
            <WalletMultiButton className="cta-button large" />
          ) : (
            <Link to="/carbon-footprint" className="cta-button large primary">
              Calculate Your Footprint
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home; 