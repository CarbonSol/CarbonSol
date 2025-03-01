# CarbonSol Frontend

This directory contains the frontend application for the CarbonSol platform.

## Overview

The CarbonSol frontend is a React-based web application that provides a user interface for interacting with the CarbonSol platform. It allows users to:

- Connect their Solana wallet
- Calculate their carbon footprint
- Trade carbon credits
- View and analyze carbon projects
- Track their impact

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── styles/          # CSS styles
│   ├── App.js           # Main application component
│   ├── index.js         # Application entry point
│   └── config.js        # Configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Create a `.env` file in the root directory with the following variables:

```
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### Running the Application

Start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at http://localhost:3000.

### Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## Features

### Wallet Integration

The application integrates with Solana wallets using the `@solana/wallet-adapter` libraries. Users can connect their wallet to access personalized features.

### Carbon Footprint Calculator

Users can calculate their carbon footprint using the AI-powered calculator. The calculator takes into account various factors such as transportation, energy usage, and lifestyle choices.

### Trading Interface

The trading interface allows users to buy and sell carbon credits (VCU tokens) using CST tokens. It provides market data, order book visualization, and trading history.

### Carbon Project Explorer

Users can browse and filter carbon projects, view project details, and purchase carbon credits directly from verified projects.

### Dashboard

The dashboard provides an overview of the user's portfolio, carbon footprint, and impact metrics.

## Technologies Used

- React
- React Router
- Solana Web3.js
- Chart.js
- Axios

## License

This project is licensed under the MIT License. See the LICENSE file in the root directory for details. 