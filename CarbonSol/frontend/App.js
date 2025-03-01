import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import CarbonFootprint from './pages/CarbonFootprint';
import CarbonProjects from './pages/CarbonProjects';
import MyWallet from './pages/MyWallet';
import About from './pages/About';

// Import styles
import './styles/App.css';
import '@solana/wallet-adapter-react-ui/styles.css';

const App = () => {
  // Configure wallet adapters
  const wallets = [new PhantomWalletAdapter()];

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/trade" element={<Trade />} />
                <Route path="/carbon-footprint" element={<CarbonFootprint />} />
                <Route path="/carbon-projects" element={<CarbonProjects />} />
                <Route path="/wallet" element={<MyWallet />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WalletModalProvider>
    </WalletProvider>
  );
};

export default App; 