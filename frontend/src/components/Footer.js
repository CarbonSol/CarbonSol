import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CarbonSol AI DEX</h3>
            <p className="text-gray-300">
              A decentralized exchange platform that combines carbon credit trading with 
              cryptocurrency on the Solana blockchain, powered by AI.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
              <li><Link to="/trade" className="text-gray-300 hover:text-white">Trade</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-white">Carbon Projects</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://docs.solana.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Solana Docs</a></li>
              <li><a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Phantom Wallet</a></li>
              <li><a href="https://github.com/yourusername/CarbonSol" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">GitHub</a></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
                Twitter
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-discord"></i>
                Discord
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CarbonSol AI DEX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 