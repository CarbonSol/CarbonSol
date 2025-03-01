import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { connected } = useWallet();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/assets/logo.svg" alt="CarbonSol Logo" />
          <span>CarbonSol</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? 'times' : 'bars'} />
        </div>
        
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/')}`} 
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          
          {connected && (
            <>
              <li className="nav-item">
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${isActive('/dashboard')}`} 
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              </li>
              
              <li className="nav-item">
                <Link 
                  to="/trade" 
                  className={`nav-link ${isActive('/trade')}`} 
                  onClick={closeMenu}
                >
                  Trade
                </Link>
              </li>
              
              <li className="nav-item">
                <Link 
                  to="/carbon-footprint" 
                  className={`nav-link ${isActive('/carbon-footprint')}`} 
                  onClick={closeMenu}
                >
                  Carbon Footprint
                </Link>
              </li>
              
              <li className="nav-item">
                <Link 
                  to="/carbon-projects" 
                  className={`nav-link ${isActive('/carbon-projects')}`} 
                  onClick={closeMenu}
                >
                  Projects
                </Link>
              </li>
            </>
          )}
          
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about')}`} 
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          
          <li className="wallet-button">
            <WalletMultiButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 