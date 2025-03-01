import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/">
            <img src="/assets/logo.svg" alt="CarbonSol Logo" className="logo" />
            <span>CarbonSol</span>
          </Link>
          <p className="tagline">
            Combining carbon credits with blockchain technology
          </p>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h3>Platform</h3>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/trade">Trade</Link></li>
              <li><Link to="/carbon-footprint">Carbon Footprint</Link></li>
              <li><Link to="/carbon-projects">Carbon Projects</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="https://docs.carbonsol.io" target="_blank" rel="noopener noreferrer">Documentation</a></li>
              <li><a href="https://blog.carbonsol.io" target="_blank" rel="noopener noreferrer">Blog</a></li>
              <li><a href="https://carbonsol.io/faq" target="_blank" rel="noopener noreferrer">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="https://carbonsol.io/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
              <li><a href="https://carbonsol.io/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://carbonsol.io/disclaimer" target="_blank" rel="noopener noreferrer">Disclaimer</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Connect</h3>
            <ul className="social-links">
              <li>
                <a href="https://twitter.com/CarbonSol" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://discord.gg/carbonsol" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-discord"></i>
                </a>
              </li>
              <li>
                <a href="https://github.com/CarbonSol" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://t.me/CarbonSol" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-telegram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} CarbonSol. All rights reserved.</p>
        <p>Built on <a href="https://solana.com" target="_blank" rel="noopener noreferrer">Solana</a></p>
      </div>
    </footer>
  );
};

export default Footer; 