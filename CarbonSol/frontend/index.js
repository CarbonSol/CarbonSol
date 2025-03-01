import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';

// Polyfills for browser compatibility
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

// Font Awesome for icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faExchangeAlt, 
  faBrain, 
  faCalculator, 
  faBolt, 
  faTimes, 
  faBars,
  faChartLine,
  faLeaf,
  faWallet,
  faUser,
  faInfoCircle,
  faSearch,
  faFilter,
  faSort,
  faPlus,
  faMinus,
  faCheck,
  faTrash,
  faEdit,
  faDownload,
  faUpload,
  faSync
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(
  faExchangeAlt, 
  faBrain, 
  faCalculator, 
  faBolt, 
  faTimes, 
  faBars,
  faChartLine,
  faLeaf,
  faWallet,
  faUser,
  faInfoCircle,
  faSearch,
  faFilter,
  faSort,
  faPlus,
  faMinus,
  faCheck,
  faTrash,
  faEdit,
  faDownload,
  faUpload,
  faSync
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 