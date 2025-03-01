import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import CarbonProjects from './pages/CarbonProjects';
import CarbonFootprint from './pages/CarbonFootprint';
import MyWallet from './pages/MyWallet';
import About from './pages/About';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/projects" element={<CarbonProjects />} />
          <Route path="/footprint" element={<CarbonFootprint />} />
          <Route path="/wallet" element={<MyWallet />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 